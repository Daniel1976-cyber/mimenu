const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const supabase = require('./supabase');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
    if (!name || !category) {
      return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
    }

    const newBeverage = {
      name,
      unit: unit || 'u',
      price_usd: priceUSD || null,
      price_cup: priceCUP || 0,
      category,
      active: active !== undefined ? active : true,
      stock: stock || 0
    };

    const { data, error } = await supabase
      .from('beverages')
      .insert([newBeverage])
      .select()
      .single();

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

    const { data, error } = await supabase
      .from('beverages')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) return res.status(404).json({ error: 'Bebida no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/beverages/:id/toggle', async (req, res) => {
  try {
    const { data: current, error: err1 } = await supabase
      .from('beverages')
      .select('active')
      .eq('id', req.params.id)
      .single();

    if (err1 || !current) return res.status(404).json({ error: 'Bebida no encontrada' });

    const { data, error } = await supabase
      .from('beverages')
      .update({ active: !current.active })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/beverages/:id/stock', async (req, res) => {
  try {
    const { stock } = req.body;
    const { data, error } = await supabase
      .from('beverages')
      .update({ stock })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) return res.status(404).json({ error: 'Bebida no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/beverages/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('beverages')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('beverages')
      .select('category');

    if (error) throw error;
    const categories = [...new Set(data.map(b => b.category))].sort();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/resumen', async (req, res) => {
  try {
    const { data, error } = await supabase.from('beverages').select('*');
    if (error) throw error;

    const total = data.length;
    const active = data.filter(b => b.active).length;
    const inactive = total - active;
    const outOfStock = data.filter(b => b.stock === 0).length;
    const categories = [...new Set(data.map(b => b.category))].length;

    res.json({ total, active, inactive, outOfStock, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

module.exports = serverless(app);