import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  ensureDb,
  getAll,
  insertRow,
  patchRow,
  deleteRow,
  getSettings,
  updateSettings,
  replaceAllBanners,
} from './packages/shared/db/store.ts';

async function sendTelegramNotification(lead: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('[Telegram Notification Skipped] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured.');
    return;
  }

  const message = `☀️ <b>YANGI TANSO SOLAR SO‘ROVI</b>\n\n` +
    `👤 <b>Mijoz:</b> ${lead.fullName}\n` +
    `📞 <b>Telefon:</b> <code>${lead.phone}</code>\n` +
    `📦 <b>Mahsulot:</b> ${lead.productName || 'Umumiy konsultatsiya'}\n` +
    `🏷️ <b>Kategoriya:</b> ${lead.category || 'Konsultatsiya'}\n` +
    `🔢 <b>Soni:</b> ${lead.quantity || 1}\n` +
    `💬 <b>Izoh:</b> ${lead.comment || 'Izoh biriktirilmagan'}\n` +
    `🔗 <b>Manbaa:</b> ${lead.source || '/'}\n` +
    `🕒 <b>Vaqt:</b> ${new Date(lead.createdAt).toLocaleString('uz-UZ')}`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const resJson = await response.json();
    if (resJson.ok) {
      console.log('[Telegram Notification Sent Successfully]');
    } else {
      console.error('[Telegram Notification Error]', resJson);
    }
  } catch (err) {
    console.error('[Telegram Notification Fetch Exception]', err);
  }
}

const app = express();
const PORT = 3000;

async function startServer() {
  app.use(express.json({ limit: '10mb' }));

  // Ensure the database is ready (tables created + seeded) before any
  // /api request is handled. Cheap after the first call: ensureDb()
  // memoizes its promise per running instance.
  app.use('/api', async (req, res, next) => {
    try {
      await ensureDb();
      next();
    } catch (err: any) {
      console.error('[DB Init Error]', err);
      res.status(500).json({ error: 'Database ulanishda xatolik yuz berdi.', detail: String(err?.message || err) });
    }
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // LEADS API
  app.get('/api/leads', async (req, res) => {
    const leads = await getAll('leads', 'seq DESC');
    res.json(leads);
  });

  app.post('/api/leads', async (req, res) => {
    const { fullName, phone, productId, productName, category, quantity, comment, source, type } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Ism va telefon raqami kiritilishi shart.' });
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      type: type || (productId ? 'product_request' : 'consultation'),
      fullName: fullName.trim(),
      phone: phone.trim(),
      productId: productId || undefined,
      productName: productName || undefined,
      category: category || undefined,
      quantity: quantity ? Number(quantity) : 1,
      comment: comment ? comment.trim() : '',
      source: source || '/',
      status: 'NEW' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isRead: false,
      adminNotes: ''
    };

    await insertRow('leads', newLead);

    // Create Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      leadId: newLead.id,
      title: 'Yangi so‘rov kelib tushdi',
      message: `${newLead.fullName} - ${newLead.productName || 'Konsultatsiya'}`,
      createdAt: newLead.createdAt,
      isRead: false
    };
    await insertRow('notifications', newNotif);

    // Trigger Telegram Notification asynchronously
    sendTelegramNotification(newLead);

    res.status(201).json({ success: true, lead: newLead });
  });

  app.patch('/api/leads/:id', async (req, res) => {
    const { id } = req.params;
    const { status, adminNotes, isRead } = req.body;

    const patch: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    if (status !== undefined) patch.status = status;
    if (adminNotes !== undefined) patch.adminNotes = adminNotes;
    if (isRead !== undefined) patch.isRead = isRead;

    const updated = await patchRow('leads', id, patch);
    if (!updated) {
      return res.status(404).json({ error: 'So‘rov topilmadi.' });
    }

    res.json({ success: true, lead: updated });
  });

  app.delete('/api/leads/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('leads', id);
    res.json({ success: true });
  });

  // PRODUCTS API
  app.get('/api/products', async (req, res) => {
    const products = await getAll('products', 'seq DESC');
    res.json(products);
  });

  app.post('/api/products', async (req, res) => {
    const product = {
      ...req.body,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await insertRow('products', product);
    res.status(201).json(product);
  });

  app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('products', id, { ...req.body, updatedAt: new Date().toISOString() });
    if (!updated) return res.status(404).json({ error: 'Mahsulot topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('products', id);
    res.json({ success: true });
  });

  // CATEGORIES API
  app.get('/api/categories', async (req, res) => {
    const categories = await getAll('categories', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(categories);
  });

  app.post('/api/categories', async (req, res) => {
    const category = {
      ...req.body,
      id: `cat-${Date.now()}`
    };
    await insertRow('categories', category);
    res.status(201).json(category);
  });

  app.put('/api/categories/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('categories', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Kategoriya topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/categories/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('categories', id);
    res.json({ success: true });
  });

  // HERO BANNERS API
  app.get('/api/banners', async (req, res) => {
    const banners = await getAll('hero_banners', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(banners);
  });

  app.put('/api/banners', async (req, res) => {
    const banners = await replaceAllBanners(req.body);
    res.json(banners);
  });

  // SERVICES API
  app.get('/api/services', async (req, res) => {
    const services = await getAll('services', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(services);
  });

  app.post('/api/services', async (req, res) => {
    const service = { ...req.body, id: `serv-${Date.now()}` };
    await insertRow('services', service);
    res.status(201).json(service);
  });

  app.put('/api/services/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('services', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Xizmat topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/services/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('services', id);
    res.json({ success: true });
  });

  // PROJECTS API
  app.get('/api/projects', async (req, res) => {
    const projects = await getAll('projects', 'seq DESC');
    res.json(projects);
  });

  app.post('/api/projects', async (req, res) => {
    const project = { ...req.body, id: `proj-${Date.now()}` };
    await insertRow('projects', project);
    res.status(201).json(project);
  });

  app.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('projects', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Loyiha topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('projects', id);
    res.json({ success: true });
  });

  // PARTNERS API
  app.get('/api/partners', async (req, res) => {
    const partners = await getAll('partners', `(data->>'sortOrder')::int NULLS LAST, seq ASC`);
    res.json(partners);
  });

  app.post('/api/partners', async (req, res) => {
    const partner = { ...req.body, id: `part-${Date.now()}` };
    await insertRow('partners', partner);
    res.status(201).json(partner);
  });

  app.put('/api/partners/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await patchRow('partners', id, req.body);
    if (!updated) return res.status(404).json({ error: 'Hamkor topilmadi.' });
    res.json(updated);
  });

  app.delete('/api/partners/:id', async (req, res) => {
    const { id } = req.params;
    await deleteRow('partners', id);
    res.json({ success: true });
  });

  // SETTINGS API
  app.get('/api/settings', async (req, res) => {
    const settings = await getSettings();
    res.json(settings);
  });

  app.put('/api/settings', async (req, res) => {
    const settings = await updateSettings(req.body);
    res.json(settings);
  });

  // NOTIFICATIONS API
  app.get('/api/notifications', async (req, res) => {
    const notifications = await getAll('notifications', 'seq DESC');
    res.json(notifications);
  });

  app.patch('/api/notifications/read-all', async (req, res) => {
    const notifications = await getAll<{ id: string }>('notifications');
    await Promise.all(notifications.map((n) => patchRow('notifications', n.id, { isRead: true })));
    res.json({ success: true });
  });

  // Vite Middleware or Static Production Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.VERCEL !== '1') {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[TANSO SOLAR Server] Server listening on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();

export default app;
