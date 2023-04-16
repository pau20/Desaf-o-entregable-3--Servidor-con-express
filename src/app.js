import express from 'express';
import ProductManager from './Managers/productManager.js'

const app = express();
const PORT = 8080;

const productManager = new ProductManager();
app.use(express.json());

// Inicializar el ProductManager y leer el archivo de productos
productManager.init()
  .then(() => {
    // Endpoint para obtener todos los productos o un número limitado de productos
    app.get('/products', async (req, res) => {
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      try {
        const products = await productManager.getProducts(limit);
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
    });

    // Endpoint para obtener un producto por ID
    app.get('/products/:pid', async (req, res) => {
      const id = parseInt(req.params.pid);
      try {
        const product = await productManager.getProductById(id);
        res.json(product);
      } catch (error) {
        res.status(404).json({ error: 'Error: El producto no existe' });
      }
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al inicializar el ProductManager:', error);
  });
