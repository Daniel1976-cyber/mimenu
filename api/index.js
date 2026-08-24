const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

let supabase = null;
let useInMemory = false;

// En Vercel NO necesitas dotenv — las variables ya están en process.env
// Solo úsalo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
  } catch (e) {
    console.log('dotenv no disponible en desarrollo');
  }
}

try {
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcHdxanZvYnltbmpwemV6ZmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMzA5NjAsImV4cCI6MjEwMTkwNjk2MH0.n8PFaA1Ez83f3K0GO7kr3OOaW3tNoA9V2Ev0yZPHkj8';

  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase conectado');
  } else {
    console.error('❌ Faltan SUPABASE_URL o SUPABASE_ANON_KEY en variables de entorno');
    useInMemory = true;
  }
} catch (e) {
  console.error('❌ Error al inicializar Supabase:', e.message);
  useInMemory = true;
}

if (!useInMemory) {
  app.get('/api/beverages', async (req, res) => {
    try {
      const { category, search, active } = req.query;
      let query = supabase.from('beverages').select('*');
      if (category) query = query.eq('category', category);
      if (active !== undefined) query = query.eq('active', active === 'true');
      if (search) query = query.ilike('name', `%${search}%`);
      const { data, error } = await query.order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/beverages/menu', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('beverages')
        .select('*')
        .eq('active', true)
        .gt('stock', 0)
        .order('id');
      if (error) throw error;
      const categories = [...new Set(data.map(b => b.category))].sort();
      res.json({ beverages: data, categories });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/beverages/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('beverages')
        .select('*')
        .eq('id', req.params.id)
        .single();
      if (error || !data) return res.status(404).json({ error: 'Bebida no encontrada' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/beverages', async (req, res) => {
    try {
      const { name, unit, priceUSD, priceCUP, category, active, stock } = req.body;
      if (!name || !category) return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
      const { data, error } = await supabase.from('beverages').insert([{
        name, unit: unit || 'u', price_usd: priceUSD || null, price_cup: priceCUP || 0,
        category, active: active !== undefined ? active : true, stock: stock || 0
      }]).select().single();
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/beverages/:id', async (req, res) => {
    try {
      const { name, unit, priceUSD, priceCUP, category, active, stock } = req.body;
      const updates = {};
      if (name !== undefined) updates.name = name;
      if (unit !== undefined) updates.unit = unit;
      if (priceUSD !== undefined) updates.price_usd = priceUSD;
      if (priceCUP !== undefined) updates.price_cup = priceCUP;
      if (category !== undefined) updates.category = category;
      if (active !== undefined) updates.active = active;
      if (stock !== undefined) updates.stock = stock;
      const { data, error } = await supabase.from('beverages').update(updates).eq('id', req.params.id).select().single();
      if (error || !data) return res.status(404).json({ error: 'Bebida no encontrada' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch('/api/beverages/:id/toggle', async (req, res) => {
    try {
      const { data: current, error: err1 } = await supabase.from('beverages').select('active').eq('id', req.params.id).single();
      if (err1 || !current) return res.status(404).json({ error: 'Bebida no encontrada' });
      const { data, error } = await supabase.from('beverages').update({ active: !current.active }).eq('id', req.params.id).select().single();
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch('/api/beverages/:id/stock', async (req, res) => {
    try {
      const { stock } = req.body;
      const { data, error } = await supabase.from('beverages').update({ stock }).eq('id', req.params.id).select().single();
      if (error || !data) return res.status(404).json({ error: 'Bebida no encontrada' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/beverages/:id', async (req, res) => {
    try {
      const { error } = await supabase.from('beverages').delete().eq('id', req.params.id);
      if (error) throw error;
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/categories', async (req, res) => {
    try {
      const { data, error } = await supabase.from('beverages').select('category');
      if (error) throw error;
      res.json([...new Set(data.map(b => b.category))].sort());
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/resumen', async (req, res) => {
    try {
      const { data, error } = await supabase.from('beverages').select('*');
      if (error) throw error;
      res.json({
        total: data.length,
        active: data.filter(b => b.active).length,
        inactive: data.length - data.filter(b => b.active).length,
        outOfStock: data.filter(b => b.stock === 0).length,
        categories: [...new Set(data.map(b => b.category))].length
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
} else {
  let beverages = [
    { id: 1, name: "Agua Gaseada", unit: "330 ml", priceUSD: null, priceCUP: 250, category: "Bebidas", active: true, stock: 50 }
  ];
  let nextId = 2;

  app.get('/api/beverages', (req, res) => {
    const { category, search, active } = req.query;
    let result = beverages;
    if (category) result = result.filter(b => b.category === category);
    if (search) result = result.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    if (active !== undefined) result = result.filter(b => b.active === (active === 'true'));
    res.json(result);
  });

  app.get('/api/beverages/menu', (req, res) => {
    const result = beverages.filter(b => b.active && b.stock > 0);
    const categories = [...new Set(result.map(b => b.category))];
    res.json({ beverages: result, categories });
  });

  app.get('/api/beverages/:id', (req, res) => {
    const beverage = beverages.find(b => b.id === parseInt(req.params.id));
    if (!beverage) return res.status(404).json({ error: 'Bebida no encontrada' });
    res.json(beverage);
  });

  app.get('/api/categories', (req, res) => {
    res.json([...new Set(beverages.map(b => b.category))].sort());
  });

  app.get('/api/resumen', (req, res) => {
    res.json({
      total: beverages.length,
      active: beverages.filter(b => b.active).length,
      inactive: beverages.length - beverages.filter(b => b.active).length,
      outOfStock: beverages.filter(b => b.stock === 0).length,
      categories: [...new Set(beverages.map(b => b.category))].length
    });
  });

  app.post('/api/beverages', (req, res) => {
    const { name, unit, priceUSD, priceCUP, category, active, stock } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
    const newBeverage = { id: nextId++, name, unit: unit || 'u', priceUSD: priceUSD || null, priceCUP: priceCUP || 0, category, active: active !== undefined ? active : true, stock: stock || 0 };
    beverages.push(newBeverage);
    res.status(201).json(newBeverage);
  });

  app.put('/api/beverages/:id', (req, res) => {
    const idx = beverages.findIndex(b => b.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Bebida no encontrada' });
    const { name, unit, priceUSD, priceCUP, category, active, stock } = req.body;
    if (name !== undefined) beverages[idx].name = name;
    if (unit !== undefined) beverages[idx].unit = unit;
    if (priceUSD !== undefined) beverages[idx].priceUSD = priceUSD;
    if (priceCUP !== undefined) beverages[idx].priceCUP = priceCUP;
    if (category !== undefined) beverages[idx].category = category;
    if (active !== undefined) beverages[idx].active = active;
    if (stock !== undefined) beverages[idx].stock = stock;
    res.json(beverages[idx]);
  });

  app.patch('/api/beverages/:id/toggle', (req, res) => {
    const beverage = beverages.find(b => b.id === parseInt(req.params.id));
    if (!beverage) return res.status(404).json({ error: 'Bebida no encontrada' });
    beverage.active = !beverage.active;
    res.json(beverage);
  });

  app.patch('/api/beverages/:id/stock', (req, res) => {
    const beverage = beverages.find(b => b.id === parseInt(req.params.id));
    if (!beverage) return res.status(404).json({ error: 'Bebida no encontrada' });
    beverage.stock = req.body.stock;
    res.json(beverage);
  });

  app.delete('/api/beverages/:id', (req, res) => {
    const idx = beverages.findIndex(b => b.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Bebida no encontrada' });
    beverages.splice(idx, 1);
    res.status(204).send();
  });
}

module.exports = serverless(app);