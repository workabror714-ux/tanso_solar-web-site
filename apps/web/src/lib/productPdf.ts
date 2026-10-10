// Client-side PDF export for a single product page.
//
// Generates a branded, printable "product sheet" PDF so a site visitor can
// download the full product info (price, status, description, specs,
// contacts) and show it to someone else (e.g. their manager) without being
// online. Everything runs in the browser — no server round-trip.
//
// Cyrillic note: jsPDF's built-in fonts only cover Latin (WinAnsi), so
// Russian/Uzbek Cyrillic text would render as blank boxes with the default
// font. We embed a real Unicode font (Roboto, which has full Cyrillic
// coverage) from /fonts so titles, descriptions and specs all render
// correctly regardless of language.
import type { Product, Category } from '../types';

const SITE_URL = 'https://www.tanso-solar.uz';
const PHONE_DISPLAY = '+998 90 345 55 05';

const TEAL = [16, 94, 90] as const; // matches --teal-dark in the site's design tokens
const AMBER = [191, 120, 33] as const; // matches --amber
const INK = [30, 32, 30] as const;
const MUTED = [110, 114, 110] as const;
const BORDER = [214, 210, 200] as const;

type Lang = 'ru' | 'uz';

export interface GenerateProductPdfInput {
  product: Product;
  category: Category | null | undefined;
  language: Lang;
  getLoc: (obj: any, field: string) => string;
  formatPrice: (price: number | null | undefined) => string;
}

// ─── description parsing (text-only mirror of RichDescription in ProductDetailPage.tsx) ───
type DescBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'para'; text: string }
  | { kind: 'item'; title: string; body?: string };

function parseDescription(raw: string): DescBlock[] {
  if (!raw?.trim()) return [];

  const normalized = raw
    .trim()
    .replace(/([\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}])/gu, '\n$1')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const isEmojiLine = (l: string) => /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]/u.test(l);
  const isAllCapsLine = (l: string) => /^[A-Z0-9\s']{4,}$/.test(l) && l.length < 120;

  const blocks: DescBlock[] = [];

  for (const line of normalized) {
    const numM = line.match(/^(\d+)[.)]\s+(.+)/);
    if (numM) {
      blocks.push({ kind: 'item', title: numM[2] });
      continue;
    }

    if (
      blocks.length > 0 &&
      blocks[blocks.length - 1].kind === 'item' &&
      !(blocks[blocks.length - 1] as any).body &&
      !isEmojiLine(line) &&
      !isAllCapsLine(line)
    ) {
      (blocks[blocks.length - 1] as any).body = line;
      continue;
    }

    const emojM = line.match(/^([\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}])\s*(.+)/u);
    if (emojM) {
      const rest = emojM[2];
      const splitM = rest.match(/^([^a-z]+?)\s+([a-z].*)$/s);
      blocks.push({
        kind: 'item',
        title: splitM ? splitM[1].trim() : rest.slice(0, 55).trim(),
        body: splitM ? splitM[2].trim() : rest.slice(55).trim() || undefined,
      });
      continue;
    }

    if (isAllCapsLine(line)) {
      blocks.push({ kind: 'heading', text: line });
      continue;
    }

    blocks.push({ kind: 'para', text: line });
  }

  return blocks;
}

async function fetchFontBase64(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed: ${url}`);
  const buf = await res.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

// Fetches the product image and returns a data URL + its pixel aspect ratio.
// Returns null (rather than throwing) on any failure so a missing/blocked
// image never breaks PDF generation -- the sheet is still useful without it.
async function fetchImageAsDataUrl(url: string): Promise<{ dataUrl: string; ratio: number } | null> {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) return null;
    const blob = await res.blob();
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    const ratio: number = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 1);
      img.onerror = reject;
      img.src = dataUrl;
    });
    return { dataUrl, ratio: Number.isFinite(ratio) && ratio > 0 ? ratio : 1 };
  } catch {
    return null;
  }
}

function transliterateFileName(slug: string): string {
  return (slug || 'mahsulot').toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

export async function generateProductPdf({
  product,
  category,
  language,
  getLoc,
  formatPrice,
}: GenerateProductPdfInput): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 16;
  const contentW = pageW - marginX * 2;
  const footerY = pageH - 12;

  // ── Embed Roboto (Cyrillic + Latin) so RU/UZ text renders correctly ──
  const [regularB64, boldB64] = await Promise.all([
    fetchFontBase64('/fonts/Roboto-Regular.ttf'),
    fetchFontBase64('/fonts/Roboto-Bold.ttf'),
  ]);
  doc.addFileToVFS('Roboto-Regular.ttf', regularB64);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.addFileToVFS('Roboto-Bold.ttf', boldB64);
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
  doc.setFont('Roboto', 'normal');

  const L = {
    about: language === 'ru' ? 'О продукте' : 'Mahsulot haqida',
    specs: language === 'ru' ? 'Технические характеристики' : 'Texnik xususiyatlar',
    price: language === 'ru' ? 'Официальная цена' : 'Rasmiy narx',
    status: language === 'ru' ? 'Статус' : 'Holati',
    inStock: language === 'ru' ? 'В наличии' : 'Mavjud',
    onOrder: language === 'ru' ? 'Под заказ' : 'Buyurtma berish',
    category: language === 'ru' ? 'Категория' : 'Kategoriya',
    contact: language === 'ru' ? 'Контакты' : 'Aloqa',
    generated: language === 'ru' ? 'Сформировано' : 'Yaratilgan',
    rep: language === 'ru'
      ? 'TANSO Solar — единственный официальный представитель в Узбекистане.'
      : "TANSO Solar — O'zbekistondagi yagona rasmiy vakil.",
    page: language === 'ru' ? 'Страница' : 'Sahifa',
  };

  let y = 0;
  let pageNum = 1;

  const drawFooter = () => {
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.line(marginX, footerY, pageW - marginX, footerY);
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(`TANSO Solar  ·  ${PHONE_DISPLAY}  ·  ${SITE_URL}`, marginX, footerY + 5);
    doc.text(`${L.page} ${pageNum}`, pageW - marginX, footerY + 5, { align: 'right' });
  };

  const newPage = () => {
    drawFooter();
    doc.addPage();
    pageNum += 1;
    y = 18;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > footerY - 4) newPage();
  };

  // ── Header band ──
  const headerH = 26;
  doc.setFillColor(...TEAL);
  doc.rect(0, 0, pageW, headerH, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(16);
  doc.text('TANSO SOLAR', marginX, 16);
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(9);
  doc.text(
    language === 'ru' ? 'Солнечные водонагреватели в Узбекистане' : "O'zbekistonda quyosh suv isitgichlari",
    marginX,
    22,
  );
  doc.setFontSize(8);
  const today = new Date().toLocaleDateString(language === 'ru' ? 'ru-RU' : 'uz-UZ');
  doc.text(`${L.generated}: ${today}`, pageW - marginX, 16, { align: 'right' });

  y = headerH + 12;

  // ── Category badge + title ──
  const title = getLoc(product, 'title') || '';
  if (category) {
    doc.setFillColor(...AMBER);
    const catText = (getLoc(category, 'name') || '').toUpperCase();
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(8);
    const catW = doc.getTextWidth(catText) + 6;
    doc.roundedRect(marginX, y - 4, catW, 6, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(catText, marginX + 3, y);
    y += 9;
  }

  doc.setTextColor(...INK);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(18);
  const titleLines = doc.splitTextToSize(title, contentW);
  doc.text(titleLines, marginX, y);
  y += titleLines.length * 7.5 + 2;

  const shortDesc = getLoc(product, 'shortDesc') || '';
  if (shortDesc) {
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    const sdLines = doc.splitTextToSize(shortDesc, contentW);
    doc.text(sdLines, marginX, y);
    y += sdLines.length * 5 + 4;
  }

  y += 2;

  // ── Image (left) + price/status card (right) ──
  const imgUrl = product.images?.[0];
  const imgBoxSize = 55;
  const rightColX = marginX + imgBoxSize + 8;
  const rightColW = contentW - imgBoxSize - 8;
  const rowTop = y;

  let imageResult: { dataUrl: string; ratio: number } | null = null;
  if (imgUrl) {
    imageResult = await fetchImageAsDataUrl(imgUrl);
  }

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, rowTop, imgBoxSize, imgBoxSize, 2, 2, 'S');
  if (imageResult) {
    const { dataUrl, ratio } = imageResult;
    let w = imgBoxSize - 6;
    let h = w / ratio;
    if (h > imgBoxSize - 6) {
      h = imgBoxSize - 6;
      w = h * ratio;
    }
    const ix = marginX + (imgBoxSize - w) / 2;
    const iy = rowTop + (imgBoxSize - h) / 2;
    const fmt = dataUrl.includes('image/png') ? 'PNG' : 'JPEG';
    try {
      doc.addImage(dataUrl, fmt, ix, iy, w, h);
    } catch {
      /* ignore image embed failures -- rest of the PDF still renders */
    }
  }

  // Price / status card
  doc.setFillColor(248, 247, 244);
  doc.roundedRect(rightColX, rowTop, rightColW, imgBoxSize, 2, 2, 'F');
  doc.setDrawColor(...BORDER);
  doc.roundedRect(rightColX, rowTop, rightColW, imgBoxSize, 2, 2, 'S');

  const padCard = 6;
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(L.price.toUpperCase(), rightColX + padCard, rowTop + 10);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...AMBER);
  doc.text(formatPrice(product.priceUZS), rightColX + padCard, rowTop + 19);

  doc.setFont('Roboto', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(L.status.toUpperCase(), rightColX + padCard, rowTop + 29);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...TEAL);
  doc.text(product.inStock ? L.inStock : L.onOrder, rightColX + padCard, rowTop + 36);

  if (category) {
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(L.category.toUpperCase(), rightColX + padCard, rowTop + 46);
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    const catLines = doc.splitTextToSize(getLoc(category, 'name') || '', rightColW - padCard * 2);
    doc.text(catLines[0] || '', rightColX + padCard, rowTop + 51);
  }

  y = rowTop + imgBoxSize + 12;

  // ── Section: О продукте / Mahsulot haqida ──
  const descBlocks = parseDescription(getLoc(product, 'fullDesc') || '');
  if (descBlocks.length) {
    ensureSpace(14);
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...TEAL);
    doc.text(L.about, marginX, y);
    y += 7;

    for (const block of descBlocks) {
      if (block.kind === 'heading') {
        ensureSpace(10);
        y += 2;
        doc.setFont('Roboto', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...TEAL);
        doc.text(block.text, marginX, y);
        y += 5.5;
      } else if (block.kind === 'para') {
        doc.setFont('Roboto', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...INK);
        const lines = doc.splitTextToSize(block.text, contentW);
        for (const line of lines) {
          ensureSpace(5.5);
          doc.text(line, marginX, y);
          y += 5.2;
        }
        y += 1;
      } else if (block.kind === 'item') {
        doc.setFont('Roboto', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...INK);
        const titleLines2 = doc.splitTextToSize(block.title, contentW - 5);
        for (let i = 0; i < titleLines2.length; i++) {
          ensureSpace(5.5);
          doc.text(titleLines2[i], marginX + (i === 0 ? 0 : 5), y);
          y += 5.2;
        }
        if (block.body) {
          doc.setFont('Roboto', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(...MUTED);
          const bodyLines = doc.splitTextToSize(block.body, contentW - 5);
          for (const line of bodyLines) {
            ensureSpace(5);
            doc.text(line, marginX + 5, y);
            y += 4.8;
          }
        }
        y += 1.5;
      }
    }
    y += 4;
  }

  // ── Section: Технические характеристики ──
  if (product.specs?.length) {
    ensureSpace(14);
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...TEAL);
    doc.text(L.specs, marginX, y);
    y += 7;

    const labelW = contentW * 0.45;
    const valueW = contentW - labelW;

    product.specs.forEach((spec, idx) => {
      const keyText = getLoc(spec, 'key') || '';
      const valText = getLoc(spec, 'value') || '';
      doc.setFontSize(9.5);
      doc.setFont('Roboto', 'normal');
      const keyLines = doc.splitTextToSize(keyText, labelW - 4);
      doc.setFont('Roboto', 'bold');
      const valLines = doc.splitTextToSize(valText, valueW - 4);
      const rowH = Math.max(keyLines.length, valLines.length) * 5 + 4;

      ensureSpace(rowH);
      if (idx % 2 === 0) {
        doc.setFillColor(248, 247, 244);
        doc.rect(marginX, y - 4, contentW, rowH, 'F');
      }
      doc.setFont('Roboto', 'normal');
      doc.setTextColor(...MUTED);
      doc.text(keyLines, marginX + 2, y);
      doc.setFont('Roboto', 'bold');
      doc.setTextColor(...INK);
      doc.text(valLines, marginX + labelW + 2, y);
      y += rowH;
    });
    y += 4;
  }

  // ── Footer note: official representative + contact ──
  ensureSpace(20);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...AMBER);
  doc.text(L.contact, marginX, y);
  y += 6;
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  doc.text(L.rep, marginX, y);
  y += 5.5;
  doc.text(`${PHONE_DISPLAY}   ·   ${SITE_URL}`, marginX, y);

  drawFooter();

  const fileName = `${transliterateFileName(product.slug)}-tanso-solar.pdf`;
  doc.save(fileName);
}
