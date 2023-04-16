import fs from 'fs';

class ProductManager {
  constructor() {
    this.products = [];
  }

  async init(file) {
    try {
      const data = await fs.readFile(file, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo de productos:', error);
    }
  }

  async getProducts(limit) {
    return limit ? this.products.slice(0, limit) : this.products;
  }

  async getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return product;
    } else {
      throw new Error('El producto no existe');
    }
  }

  async addProduct(newProduct) {
    const existingProduct = this.products.find(p => p.id === newProduct.id);
    if (existingProduct) {
      throw new Error('El producto ya existe');
    } else {
      this.products.push(newProduct);
      await this.saveProducts();
    }
  }

  async updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      await this.saveProducts();
    } else {
      throw new Error('El producto no existe');
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile('products.json', JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }
}

export default ProductManager;