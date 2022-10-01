import {Router} from 'express';
import productos_BodegaControllers from '../controllers/productos_bodegaControllers'; 
class BodegaRoute{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void{
        this.router.get('/', productos_BodegaControllers.List);
        this.router.post('/',productos_BodegaControllers.create);
        this.router.get('/:id', productos_BodegaControllers.getOne);        
        this.router.put ('/:id',productos_BodegaControllers.update);
        this.router.delete('/:id',productos_BodegaControllers.delete);      
    }
}


const bodegaRoute = new BodegaRoute;
export default bodegaRoute.router;
 