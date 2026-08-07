import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  initialCategories, 
  initialProducts, 
  initialHeroBanners, 
  initialServices, 
  initialProjects, 
  initialPartners, 
  initialSiteSettings, 
  initialLeads 
} from './src/data/initialData.js';

// In-memory data store synchronized with client requests
let categoriesData = [...initialCategories];
let productsData = [...initialProducts];
let bannersData = [...initialHeroBanners];
let servicesData = [...initialServices];
let projectsData = [...initialProjects];
let partnersData = [...initialPartners];
let settingsData = { ...initialSiteSettings };
let leadsData = [...initialLeads];
let notificationsData = leadsData
  .filter(l => !l.isRead)
  .map(l => ({
    id: `notif-${l.id}`,
    leadId: l.id,
    title: 'Yangi so‘rov kelib tushdi',
    message: `${l.fullName} (${l.phone}) - ${l.productName || 'Konsultatsiya'}`,
    createdAt: l.createdAt,
    isRead: false
  }));

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // LEADS API
  app.get('/api/leads', (req, res) => {
    res.json(leadsData);
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

    leadsData.unshift(newLead);

    // Create Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      leadId: newLead.id,
      title: 'Yangi so‘rov kelib tushdi',
      message: `${newLead.fullName} - ${newLead.productName || 'Konsultatsiya'}`,
      createdAt: newLead.createdAt,
      isRead: false
    };
    notificationsData.unshift(newNotif);

    // Trigger Telegram Notification asynchronously
    sendTelegramNotification(newLead);

    res.status(201).json({ success: true, lead: newLead });
  });

  app.patch('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status, adminNotes, isRead } = req.body;

    const leadIndex = leadsData.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({ error: 'So‘rov topilmadi.' });
    }

    if (status !== undefined) leadsData[leadIndex].status = status;
    if (adminNotes !== undefined) leadsData[leadIndex].adminNotes = adminNotes;
    if (isRead !== undefined) leadsData[leadIndex].isRead = isRead;
    leadsData[leadIndex].updatedAt = new Date().toISOString();

    res.json({ success: true, lead: leadsData[leadIndex] });
  });

  app.delete('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    leadsData = leadsData.filter(l => l.id !== id);
    res.json({ success: true });
  });

  // PRODUCTS API
  app.get('/api/products', (req, res) => {
    res.json(productsData);
  });

  app.post('/api/products', (req, res) => {
    const product = {
      ...req.body,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    productsData.unshift(product);
    res.status(201).json(product);
  });

  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = productsData.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Mahsulot topilmadi.' });

    productsData[index] = {
      ...productsData[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    res.json(productsData[index]);
  });

  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    productsData = productsData.filter(p => p.id !== id);
    res.json({ success: true });
  });

  // CATEGORIES API
  app.get('/api/categories', (req, res) => {
    res.json(categoriesData);
  });

  app.post('/api/categories', (req, res) => {
    const category = {
      ...req.body,
      id: `cat-${Date.now()}`
    };
    categoriesData.push(category);
    res.status(201).json(category);
  });

  app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const index = categoriesData.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Kategoriya topilmadi.' });

    categoriesData[index] = { ...categoriesData[index], ...req.body };
    res.json(categoriesData[index]);
  });

  app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    categoriesData = categoriesData.filter(c => c.id !== id);
    res.json({ success: true });
  });

  // HERO BANNERS API
  app.get('/api/banners', (req, res) => {
    res.json(bannersData);
  });

  app.put('/api/banners', (req, res) => {
    bannersData = req.body;
    res.json(bannersData);
  });

  // SERVICES API
  app.get('/api/services', (req, res) => {
    res.json(servicesData);
  });

  app.post('/api/services', (req, res) => {
    const service = { ...req.body, id: `serv-${Date.now()}` };
    servicesData.push(service);
    res.status(201).json(service);
  });

  app.put('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const idx = servicesData.findIndex(s => s.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Xizmat topilmadi.' });
    servicesData[idx] = { ...servicesData[idx], ...req.body };
    res.json(servicesData[idx]);
  });

  app.delete('/api/services/:id', (req, res) => {
    const { id } = req.params;
    servicesData = servicesData.filter(s => s.id !== id);
    res.json({ success: true });
  });

  // PROJECTS API
  app.get('/api/projects', (req, res) => {
    res.json(projectsData);
  });

  app.post('/api/projects', (req, res) => {
    const project = { ...req.body, id: `proj-${Date.now()}` };
    projectsData.unshift(project);
    res.status(201).json(project);
  });

  app.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const idx = projectsData.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Loyiha topilmadi.' });
    projectsData[idx] = { ...projectsData[idx], ...req.body };
    res.json(projectsData[idx]);
  });

  app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projectsData = projectsData.filter(p => p.id !== id);
    res.json({ success: true });
  });

  // PARTNERS API
  app.get('/api/partners', (req, res) => {
    res.json(partnersData);
  });

  app.post('/api/partners', (req, res) => {
    const partner = { ...req.body, id: `part-${Date.now()}` };
    partnersData.push(partner);
    res.status(201).json(partner);
  });

  app.put('/api/partners/:id', (req, res) => {
    const { id } = req.params;
    const idx = partnersData.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Hamkor topilmadi.' });
    partnersData[idx] = { ...partnersData[idx], ...req.body };
    res.json(partnersData[idx]);
  });

  app.delete('/api/partners/:id', (req, res) => {
    const { id } = req.params;
    partnersData = partnersData.filter(p => p.id !== id);
    res.json({ success: true });
  });

  // SETTINGS API
  app.get('/api/settings', (req, res) => {
    res.json(settingsData);
  });

  app.put('/api/settings', (req, res) => {
    settingsData = { ...settingsData, ...req.body };
    res.json(settingsData);
  });

  // NOTIFICATIONS API
  app.get('/api/notifications', (req, res) => {
    res.json(notificationsData);
  });

  app.patch('/api/notifications/read-all', (req, res) => {
    notificationsData.forEach(n => n.isRead = true);
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TANSO SOLAR Server] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
