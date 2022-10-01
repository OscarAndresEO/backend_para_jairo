import {Router} from 'express';
import  ProductosControllers from '../controllers/productosControllers';

class ProductoRoute{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void{
        this.router.get('/', ProductosControllers.List);
        this.router.post('/',ProductosControllers.create);
        this.router.get('/:id,:nombre', ProductosControllers.getOne);        
        this.router.put ('/:id',ProductosControllers.update);
        this.router.delete('/:id',ProductosControllers.delete);       
    }
}
const productoRoute = new ProductoRoute;
export default productoRoute.router;
 