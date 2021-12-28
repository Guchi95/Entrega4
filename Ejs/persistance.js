class Persistance {
    constructor() {
        this.productos = [];
        this.autoIncrement = 0;
    }


    addProducto(producto) {
        this.autoIncrement++
        producto.id = this.autoIncrement;
        this.productos.push(producto);
        return this.autoIncrement;
    }

    getProducto(id) {

        for (let i = 0; i < this.productos.length; i++) {
            const producto = this.productos[i];
            if (producto.id == id) {
                return producto;
            }
        }
        return null;
    }

    deleteProducto(id) {

        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos.splice(i, 1);
            }
        }

    }

    putProducto(producto, id) {
        this.deleteProducto(id);
        producto.id=id;
        this.productos.push(producto);
    }

    getProductos() {
        return this.productos;
    }

    productoExiste(id) {
        var producto = this.getProducto(id)
        return producto !=null;
        
    }

}

module.exports = {
    Persistance: Persistance
}