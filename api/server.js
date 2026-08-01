const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(path.join(__dirname, '../frontend')));

let beverages = [
  { id: 1, name: "Agua Gaseada Ciego Montero 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 400, category: "Agua", active: true, stock: 50 },
  { id: 2, name: "Agua Gaseada Ciego Montero 300 ml", unit: "300 ml", priceUSD: null, priceCUP: 250, category: "Agua", active: true, stock: 50 },
  { id: 3, name: "Agua Mineral Natural Ciego Montero 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 400, category: "Agua", active: true, stock: 50 },
  { id: 4, name: "Agua Mineral Natural Ciego Montero 500 ml", unit: "500 ml", priceUSD: null, priceCUP: 300, category: "Agua", active: true, stock: 50 },
  { id: 5, name: "Agua Natural 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 250, category: "Agua", active: true, stock: 50 },
  { id: 6, name: "Agua Natural 500 ml", unit: "500 ml", priceUSD: null, priceCUP: 300, category: "Agua", active: true, stock: 50 },
  { id: 7, name: "Agua Saborizada Manzana 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 250, category: "Agua", active: true, stock: 50 },
  { id: 8, name: "Agua Saborizada Piña 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 250, category: "Agua", active: true, stock: 50 },
  { id: 9, name: "Agua Tónica Ciego Montero 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 250, category: "Agua", active: true, stock: 50 },
  { id: 10, name: "Agua Tónica Ciego Montero 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 250, category: "Agua", active: true, stock: 50 },
  { id: 11, name: "Brandy 10 Años Torres 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Brandy", active: true, stock: 30 },
  { id: 12, name: "Brandy 15 Años Torres 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Brandy", active: true, stock: 30 },
  { id: 13, name: "Brandy 20 Años Torres 700 ml", unit: "45 ml", priceUSD: 3.00, priceCUP: 1500, category: "Brandy", active: true, stock: 30 },
  { id: 14, name: "Brandy VSOP 36° Napoleon 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Brandy", active: true, stock: 30 },
  { id: 15, name: "Brandy 5 Años Torres 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Brandy", active: true, stock: 30 },
  { id: 16, name: "Brandy Barcepal 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Brandy", active: true, stock: 30 },
  { id: 17, name: "Brandy Espituoso Regis More 30% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Brandy", active: true, stock: 30 },
  { id: 18, name: "Brandy of France 40% Napoleon 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Brandy", active: true, stock: 30 },
  { id: 19, name: "Brandy Spirit Napoleon Le Couvier 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Brandy", active: true, stock: 30 },
  { id: 20, name: "Cerveza 69 Beer 5% 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 21, name: "Cerveza Cristal Extra 5.2% 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 600, category: "Cerveza", active: true, stock: 100 },
  { id: 22, name: "Cerveza Bucanero Fuerte 350 ml", unit: "350 ml", priceUSD: null, priceCUP: 600, category: "Cerveza", active: true, stock: 100 },
  { id: 23, name: "Cerveza Cristal 350 ml", unit: "350 ml", priceUSD: null, priceCUP: 600, category: "Cerveza", active: true, stock: 100 },
  { id: 24, name: "Cerveza Cruzcampo Pilsen 4.8% 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 25, name: "Cerveza Dutch Windmill 4.6% Bavaria 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 26, name: "Cerveza Super Bock Lager 5.2% 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 27, name: "Cerveza Moosehead Lager 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 28, name: "Cerveza Mahou Clasica 4.8% 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 29, name: "Cerveza Bucanero Fuerte 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 600, category: "Cerveza", active: true, stock: 100 },
  { id: 30, name: "Cerveza Cristal 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 600, category: "Cerveza", active: true, stock: 100 },
  { id: 31, name: "Cerveza Stella Artois 5% 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 32, name: "Cerveza BIER Holland Import 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 33, name: "Cerveza Moyoc 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 34, name: "Cerveza Parranda 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 35, name: "Cerveza Parranda 500 ml", unit: "500 ml", priceUSD: null, priceCUP: 500, category: "Cerveza", active: true, stock: 100 },
  { id: 36, name: "Crema Barceló 700 ml", unit: "45 ml", priceUSD: 3.00, priceCUP: 1500, category: "Crema", active: true, stock: 20 },
  { id: 37, name: "Crema Baileys 750 ml", unit: "45 ml", priceUSD: 3.00, priceCUP: 1500, category: "Crema", active: true, stock: 20 },
  { id: 38, name: "Crema de Tequila Fresa Capitán Fresón 17% 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Crema", active: true, stock: 20 },
  { id: 39, name: "Crema de Tequila Mango Mariachi 17% 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Crema", active: true, stock: 20 },
  { id: 40, name: "Crema de Whisky Elliot Hall 17% 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Crema", active: true, stock: 20 },
  { id: 41, name: "Crema de Whisky Airisbei 17% 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Crema", active: true, stock: 20 },
  { id: 42, name: "Crema Royal Palm 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Crema", active: true, stock: 20 },
  { id: 43, name: "Crema Ruavieja Havana Club 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Crema", active: true, stock: 20 },
  { id: 44, name: "Elixir Cubay 33 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Elixir", active: true, stock: 20 },
  { id: 45, name: "Ginebra Beefeater 40% 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ginebra", active: true, stock: 30 },
  { id: 46, name: "Ginebra Black Pool 37.5% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ginebra", active: true, stock: 30 },
  { id: 47, name: "Ginebra Beefeater 750 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ginebra", active: true, stock: 30 },
  { id: 48, name: "Ginebra Captain 37.5° 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ginebra", active: true, stock: 30 },
  { id: 49, name: "Ginebra Reythor 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ginebra", active: true, stock: 30 },
  { id: 50, name: "Ginebra Imagination 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ginebra", active: true, stock: 30 },
  { id: 51, name: "Ginebra Tanqueray 750 ml", unit: "45 ml", priceUSD: 3.00, priceCUP: 1500, category: "Ginebra", active: true, stock: 30 },
  { id: 52, name: "Helado Nestle 4500 ml", unit: "u", priceUSD: 12.00, priceCUP: 6000, category: "Helado", active: true, stock: 10 },
  { id: 53, name: "Jugo de Manzana 200 ml", unit: "200 ml", priceUSD: null, priceCUP: 325, category: "Jugo", active: true, stock: 50 },
  { id: 54, name: "Jugo Pera Light Tetra Pack", unit: "u", priceUSD: null, priceCUP: 325, category: "Jugo", active: true, stock: 50 },
  { id: 55, name: "Licor Amareto Conti 28° Beveland 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Licor", active: true, stock: 25 },
  { id: 56, name: "Licor Ricard 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Licor", active: true, stock: 25 },
  { id: 57, name: "Licor Coconut Malibu 750 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Licor", active: true, stock: 25 },
  { id: 58, name: "Licor Crema al Ron 18° Habana Bvland 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Licor", active: true, stock: 25 },
  { id: 59, name: "Licor Crema Catalana Beveland 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Licor", active: true, stock: 25 },
  { id: 60, name: "Licor Curacao Azul Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 61, name: "Licor Curacao Blue Beveland 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 180, category: "Licor", active: true, stock: 25 },
  { id: 62, name: "Licor de Cacao Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 63, name: "Licor de Café Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 64, name: "Licor de Coco Cocobay 1000 ml", unit: "45 ml", priceUSD: null, priceCUP: 95, category: "Licor", active: true, stock: 25 },
  { id: 65, name: "Licor de Melocotón Sweetesh 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 66, name: "Licor de Menta Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 67, name: "Licor de Menta Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 85, category: "Licor", active: true, stock: 25 },
  { id: 68, name: "Licor de Piña Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 69, name: "Licor Fresa Sorel 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 140, category: "Licor", active: true, stock: 25 },
  { id: 70, name: "Licor Granadina Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 71, name: "Licor Jagguieroot 35% Barcepal 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 155, category: "Licor", active: true, stock: 25 },
  { id: 72, name: "Licor Malt Cream 16° Beveland 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Licor", active: true, stock: 25 },
  { id: 73, name: "Licor Marrasquino Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 74, name: "Licor Peppermint 24% Barcepal 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 190, category: "Licor", active: true, stock: 25 },
  { id: 75, name: "Licor Sambuca 40° Vincí 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 185, category: "Licor", active: true, stock: 25 },
  { id: 76, name: "Licor Sambuca Extra Molinari 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Licor", active: true, stock: 25 },
  { id: 77, name: "Licor Sambuca Romina 38% Barcepal 1000 ml", unit: "45 ml", priceUSD: null, priceCUP: 80, category: "Licor", active: true, stock: 25 },
  { id: 78, name: "Licor Triple Sec Tabay 24% 1000 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 79, name: "Licor Triple Sec Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 130, category: "Licor", active: true, stock: 25 },
  { id: 80, name: "Limoncello 30° Casal D Emilia 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 200, category: "Licor", active: true, stock: 25 },
  { id: 81, name: "Manzana Roja Varios Calibres", unit: "u", priceUSD: null, priceCUP: 250, category: "Fruta", active: true, stock: 50 },
  { id: 82, name: "Refresco Tukola Dietetica Ciego Montero 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 600, category: "Refresco", active: true, stock: 50 },
  { id: 83, name: "Refresco Cola Cintra 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 84, name: "Refresco Cola Amaro 300 ml", unit: "300 ml", priceUSD: null, priceCUP: 250, category: "Refresco", active: true, stock: 50 },
  { id: 85, name: "Refresco Gaseado Ember 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 250, category: "Refresco", active: true, stock: 50 },
  { id: 86, name: "Refresco Gaseado Limón Frised 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 87, name: "Refresco Gaseado Cola Frised 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 88, name: "Refresco Guss Cola Atlantico 500 ml", unit: "500 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 89, name: "Refresco Guss Naranja Atlantico 500 ml", unit: "500 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 90, name: "Refresco Ironbeer 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 600, category: "Refresco", active: true, stock: 50 },
  { id: 91, name: "Refresco Lima Limón Ciego Montero 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 92, name: "Refresco Lima Limón Ciego Montero 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 93, name: "Refresco Lima Limón Ciego Montero 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 600, category: "Refresco", active: true, stock: 50 },
  { id: 94, name: "Refresco Materva Ciego Montero 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 95, name: "Refresco Materva Ciego Montero 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 600, category: "Refresco", active: true, stock: 50 },
  { id: 96, name: "Refresco Naranja Ciego Montero 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 97, name: "Refresco Naranja Amaro 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 98, name: "Refresco Naranja Ciego Montero 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 99, name: "Refresco Naranja Ciego Montero 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 600, category: "Refresco", active: true, stock: 50 },
  { id: 100, name: "Refresco Piñita Ciego Montero 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 101, name: "Refresco Revoltosa Cola Atlantico 2000 ml", unit: "2000 ml", priceUSD: null, priceCUP: 700, category: "Refresco", active: true, stock: 50 },
  { id: 102, name: "Refresco Revoltosa Naranja Atlantico 2000 ml", unit: "2000 ml", priceUSD: null, priceCUP: 700, category: "Refresco", active: true, stock: 50 },
  { id: 103, name: "Refresco Pepsi Cola 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 104, name: "Refresco Coca Cola 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 105, name: "Refresco Seven Up 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 106, name: "Refresco Limón Cintra 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 107, name: "Refresco Naranja Mirinda 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 108, name: "Refresco Sabores Varios 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 300, category: "Refresco", active: true, stock: 50 },
  { id: 109, name: "Refresco Tukola Dietetica Ciego Montero 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 110, name: "Refresco Tukola Ciego Montero 355 ml", unit: "355 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 111, name: "Refresco Tukola Ciego Montero 330 ml", unit: "330 ml", priceUSD: null, priceCUP: 400, category: "Refresco", active: true, stock: 50 },
  { id: 112, name: "Refresco Tukola Ciego Montero 1500 ml", unit: "1500 ml", priceUSD: null, priceCUP: 600, category: "Refresco", active: true, stock: 50 },
  { id: 113, name: "Ron 40° Profundo Havana Club 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 114, name: "Ron Añejo 15 Años Havana Club 700 ml", unit: "45 ml", priceUSD: 110.00, priceCUP: 55000, category: "Ron", active: true, stock: 10 },
  { id: 115, name: "Ron Añejo 3 Años Havana Club 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 116, name: "Ron Añejo 3 Años Havana Club 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 117, name: "Ron Añejo 7 Años Havana Club 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Ron", active: true, stock: 30 },
  { id: 118, name: "Ron Añejo 7 Años Havana Club 1000 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Ron", active: true, stock: 30 },
  { id: 119, name: "Ron Añejo 8 Años Santiago de Cuba 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Ron", active: true, stock: 30 },
  { id: 120, name: "Ron Añejo Blanco Havana Club 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 121, name: "Ron Añejo Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 300, category: "Ron", active: true, stock: 30 },
  { id: 122, name: "Ron Añejo Perla del Norte 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 240, category: "Ron", active: true, stock: 30 },
  { id: 123, name: "Ron Añejo Santa Cruz 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 240, category: "Ron", active: true, stock: 30 },
  { id: 124, name: "Ron Añejo Especial Havana Club 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 125, name: "Ron Añejo Reserva Havana Club 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 126, name: "Ron Añejo Reserva Havana Club 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 127, name: "Ron Añejo Ritual Cubano Havana Club 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 128, name: "Ron Añejo Suave Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 50, category: "Ron", active: true, stock: 30 },
  { id: 129, name: "Ron Añejo Superior Guantanamera 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 125, category: "Ron", active: true, stock: 30 },
  { id: 130, name: "Ron Blanco Ligero Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 85, category: "Ron", active: true, stock: 30 },
  { id: 131, name: "Ron Pacto Navio 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Ron", active: true, stock: 30 },
  { id: 132, name: "Ron C/B Guantanamera 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 125, category: "Ron", active: true, stock: 30 },
  { id: 133, name: "Ron C/Oro Guantanamera 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 145, category: "Ron", active: true, stock: 30 },
  { id: 134, name: "Ron Carta Blanca Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 135, category: "Ron", active: true, stock: 30 },
  { id: 135, name: "Ron Carta Blanca Perla del Norte 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 135, category: "Ron", active: true, stock: 30 },
  { id: 136, name: "Ron Carta Blanca Santa Cruz 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 135, category: "Ron", active: true, stock: 30 },
  { id: 137, name: "Ron Carta Blanca Extra Viejo Cubay 700 ml", unit: "700 ml", priceUSD: 70.00, priceCUP: 35000, category: "Ron", active: true, stock: 10 },
  { id: 138, name: "Ron Carta de Oro Santa Cruz 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 100, category: "Ron", active: true, stock: 30 },
  { id: 139, name: "Ron Carta Dorada Cubay 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 220, category: "Ron", active: true, stock: 30 },
  { id: 140, name: "Ron Carta Oro Perla del Norte 700 ml", unit: "45 ml", priceUSD: null, priceCUP: 145, category: "Ron", active: true, stock: 30 },
  { id: 141, name: "Ron Cuban Smoky Havana Club 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Ron", active: true, stock: 30 },
  { id: 142, name: "Ron Cuban Smoky Havana Club 750 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Ron", active: true, stock: 30 },
  { id: 143, name: "Ron Cuban Spiced Havana Club 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 30 },
  { id: 144, name: "Ron Eminente Ambar Claro 700 ml", unit: "700 ml", priceUSD: 2.00, priceCUP: 1000, category: "Ron", active: true, stock: 20 },
  { id: 145, name: "Ron Eminente Reserva 7 Años 700 ml", unit: "700 ml", priceUSD: 4.00, priceCUP: 2000, category: "Ron", active: true, stock: 20 },
  { id: 146, name: "Ron Especial Havana Club 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Ron", active: true, stock: 40 },
  { id: 147, name: "Ron Extra Añejo 11 Años Santiago de Cuba 700 ml", unit: "45 ml", priceUSD: 3.00, priceCUP: 1500, category: "Ron", active: true, stock: 20 },
  { id: 148, name: "Ron Extra Añejo 12 Años Santiago de Cuba 700 ml", unit: "45 ml", priceUSD: 4.00, priceCUP: 2000, category: "Ron", active: true, stock: 20 },
  { id: 149, name: "Ron Extra Añejo 1870 Cubay 700 ml", unit: "700 ml", priceUSD: 90.00, priceCUP: 45000, category: "Ron", active: true, stock: 10 },
  { id: 150, name: "Ron Extra Añejo 20 Años Santiago de Cuba 700 ml", unit: "700 ml", priceUSD: 70.00, priceCUP: 35000, category: "Ron", active: true, stock: 10 },
  { id: 151, name: "Ron HC Union Havana Club 700 ml", unit: "700 ml", priceUSD: 100.00, priceCUP: 50000, category: "Ron", active: true, stock: 10 },
  { id: 152, name: "Ron Selección de Maestros Havana Club 700 ml", unit: "45 ml", priceUSD: 3.00, priceCUP: 1500, category: "Ron", active: true, stock: 20 },
  { id: 153, name: "Tequila Tres Sombreros 38° 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Tequila", active: true, stock: 25 },
  { id: 154, name: "Tequila Jose Sarmento 35% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Tequila", active: true, stock: 25 },
  { id: 155, name: "Tequila Reposado Olmeca 35% 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Tequila", active: true, stock: 25 },
  { id: 156, name: "Tequila Silver Olmeca 35% 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Tequila", active: true, stock: 25 },
  { id: 157, name: "Tequila Spirit Tabay 30% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Tequila", active: true, stock: 25 },
  { id: 158, name: "Tequila Spirit Cruzada 30% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Tequila", active: true, stock: 25 },
  { id: 159, name: "Turrón Alicante La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 160, name: "Turrón Chocolate con Almendra La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 161, name: "Turrón Chocolate con Almendra La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 162, name: "Turrón Chocolate Crujiente El Antiguo 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 163, name: "Turrón de Frutas La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 164, name: "Turrón de Jijona La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 165, name: "Turrón de Nata Nueces La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 166, name: "Turrón de Yema La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 167, name: "Turrón Imperial Extra La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 168, name: "Turrón Imperial Sin Azúcar 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 169, name: "Turrón Yema Tostada Extra La Flor de Jijona 200 g", unit: "200 g", priceUSD: 2.00, priceCUP: 1000, category: "Turrón", active: true, stock: 30 },
  { id: 170, name: "Vermouth Blanco Volini 1000 ml", unit: "1000 ml", priceUSD: 1.00, priceCUP: 500, category: "Vermouth", active: true, stock: 20 },
  { id: 171, name: "Vermouth Rojo Volini 1000 ml", unit: "1000 ml", priceUSD: 1.00, priceCUP: 500, category: "Vermouth", active: true, stock: 20 },
  { id: 172, name: "Vodka Koltsova 37.5% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 173, name: "Vodka Tabarish 37.5% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 174, name: "Vodka Tabarish 37.5% 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 175, name: "Vodka Samarskaya 37.5° 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 176, name: "Vodka Lyubov 40% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 177, name: "Vodka Lyubov 40% 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 178, name: "Vodka Na Zdorovie 40% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 179, name: "Vodka Villa Clara 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 180, name: "Vodka Absolut 750 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Vodka", active: true, stock: 25 },
  { id: 181, name: "Vodka Principe Igor 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Vodka", active: true, stock: 30 },
  { id: 182, name: "Whisky The Glenlivet Founders Reserve 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 20 },
  { id: 183, name: "Whisky Glen Silver's 12 Años 40° 700 ml", unit: "45 ml", priceUSD: 4.00, priceCUP: 2000, category: "Whisky", active: true, stock: 20 },
  { id: 184, name: "Whisky Chivas Regal 12 Years 40% 700 ml", unit: "45 ml", priceUSD: 4.00, priceCUP: 2000, category: "Whisky", active: true, stock: 20 },
  { id: 185, name: "Whisky Chivas Regal 18 Years 40% 700 ml", unit: "45 ml", priceUSD: 5.00, priceCUP: 2500, category: "Whisky", active: true, stock: 15 },
  { id: 186, name: "Whisky Glen Silver's 8 Años 40° 700 ml", unit: "700 ml", priceUSD: 2.00, priceCUP: 1000, category: "Whisky", active: true, stock: 20 },
  { id: 187, name: "Whisky Black & White 750 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 188, name: "Whisky Black Label 12 Años Johnnie Walker 750 ml", unit: "45 ml", priceUSD: 4.00, priceCUP: 2000, category: "Whisky", active: true, stock: 20 },
  { id: 189, name: "Whisky Glen Silver's Blended Malt 40° 700 ml", unit: "700 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 190, name: "Whisky Scoth Lands 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 191, name: "Whisky Clan Campbell 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 192, name: "Whisky VAT 69 750 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 193, name: "Whisky Ballantines Finest 40% 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Whisky", active: true, stock: 25 },
  { id: 194, name: "Whisky Jameson Irish 5 Años 750 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Whisky", active: true, stock: 25 },
  { id: 195, name: "Whisky Marshall Bourbon 40% 700 ml", unit: "700 ml", priceUSD: 2.00, priceCUP: 1000, category: "Whisky", active: true, stock: 25 },
  { id: 196, name: "Whisky Jameson Original 40% 700 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Whisky", active: true, stock: 25 },
  { id: 197, name: "Whisky Red Label Johnnie Walker 750 ml", unit: "45 ml", priceUSD: 2.00, priceCUP: 1000, category: "Whisky", active: true, stock: 25 },
  { id: 198, name: "Whisky Buchanan's Reserve 18 Años 750 ml", unit: "45 ml", priceUSD: 9.00, priceCUP: 4500, category: "Whisky", active: true, stock: 15 },
  { id: 199, name: "Whisky Glen Silver's Scotch 40° 1000 ml", unit: "1000 ml", priceUSD: 2.00, priceCUP: 1000, category: "Whisky", active: true, stock: 20 },
  { id: 200, name: "Whisky Elliot Hall Spirit 40% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 201, name: "Whisky Peter Wallace Spirit 40% 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 202, name: "Whisky Howells Spirit 40° 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 203, name: "Whisky Old Premier's Spirit 700 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 204, name: "Whisky Black Head Spirit 700 ml", unit: "700 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 },
  { id: 205, name: "Whisky Old Partner Spirits 40% 1000 ml", unit: "45 ml", priceUSD: 1.00, priceCUP: 500, category: "Whisky", active: true, stock: 25 }
];

let nextId = 206;

// GET all beverages (admin)
app.get('/api/beverages', (req, res) => {
  const { category, search, active } = req.query;
  let result = beverages;
  if (category) result = result.filter(b => b.category === category);
  if (search) result = result.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
  if (active !== undefined) result = result.filter(b => b.active === (active === 'true'));
  res.json(result);
});

// GET active beverages only (menu publico)
app.get('/api/beverages/menu', (req, res) => {
  const result = beverages.filter(b => b.active && b.stock > 0);
  const categories = [...new Set(result.map(b => b.category))];
  res.json({ beverages: result, categories });
});

// GET single beverage
app.get('/api/beverages/:id', (req, res) => {
  const beverage = beverages.find(b => b.id === parseInt(req.params.id));
  if (!beverage) return res.status(404).json({ error: 'Bebida no encontrada' });
  res.json(beverage);
});

// POST new beverage
app.post('/api/beverages', (req, res) => {
  const { name, unit, priceUSD, priceCUP, category, active, stock } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
  const newBeverage = {
    id: nextId++,
    name,
    unit: unit || 'u',
    priceUSD: priceUSD || null,
    priceCUP: priceCUP || 0,
    category,
    active: active !== undefined ? active : true,
    stock: stock || 0
  };
  beverages.push(newBeverage);
  res.status(201).json(newBeverage);
});

// PUT update beverage
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

// PATCH toggle active status
app.patch('/api/beverages/:id/toggle', (req, res) => {
  const beverage = beverages.find(b => b.id === parseInt(req.params.id));
  if (!beverage) return res.status(404).json({ error: 'Bebida no encontrada' });
  beverage.active = !beverage.active;
  res.json(beverage);
});

// PATCH update stock
app.patch('/api/beverages/:id/stock', (req, res) => {
  const beverage = beverages.find(b => b.id === parseInt(req.params.id));
  if (!beverage) return res.status(404).json({ error: 'Bebida no encontrada' });
  const { stock } = req.body;
  beverage.stock = stock;
  res.json(beverage);
});

// DELETE beverage
app.delete('/api/beverages/:id', (req, res) => {
  const idx = beverages.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Bebida no encontrada' });
  beverages.splice(idx, 1);
  res.status(204).send();
});

// GET categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(beverages.map(b => b.category))].sort();
  res.json(categories);
});

// GET stats
app.get('/api/stats', (req, res) => {
  const total = beverages.length;
  const active = beverages.filter(b => b.active).length;
  const inactive = total - active;
  const outOfStock = beverages.filter(b => b.stock === 0).length;
  const categories = [...new Set(beverages.map(b => b.category))].length;
  res.json({ total, active, inactive, outOfStock, categories });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
