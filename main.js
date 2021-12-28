const express = require('express');
const Persistance = require('./persistance');
const { Router } = express
const persistance = new Persistance.Persistance();
const app = express()
const router = Router()

const PORT = 8080
app.use(express.json())
app.use(express.static('static'));


const server = app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);

});

router.get('/',(req,res)=>{
    res.render("index.html");
})

router.get('/productos', (req, res) => {
    res.send(persistance.getProductos())
})

router.get('/productos/:id', (req, res) => {
    var productId = req.params.id;
    
    if(persistance.productoExiste(productId)) {
        res.send(persistance.getProducto(productId))
    }else {
        res.status(404);
        res.send({ error: 'producto no encontrado' });
    }

})

router.post('/productos', (req, res) => {
    var productoToAdd = req.body;
    var id = persistance.addProducto(productoToAdd);
    res.send({id:id})

})

router.delete('/productos/:id', (req, res) => {
    var productId = req.params.id;
    if(persistance.productoExiste(productId)) {
        persistance.deleteProducto(productId);
        res.send()

    }else {
        res.status(404);
        res.send({ error: 'producto no encontrado' });
    }
  

})

router.put('/productos/:id', (req, res) => {
    var productId = req.params.id;
    var productoToModify= req.body;
    if(persistance.productoExiste(productId)) {
        persistance.putProducto(productoToModify,productId);
        res.send()

    }else {
        res.status(404);
        res.send({ error: 'producto no encontrado' });
    }

})



app.use('/api', router);

