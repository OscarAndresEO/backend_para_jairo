import {Router} from 'express';
import bodegasControllers from '../controllers/bodegasControllers';

class BodegaRoute{
    public router : Router = Router();

    constructor(){
        this.config();
    }

    config() : void{
        this.router.get('/', bodegasControllers.List);
        this.router.post('/',bodegasControllers.create);
        this.router.get('/:id,:nombre', bodegasControllers.getOne);        
        this.router.put ('/:id',bodegasControllers.update);
        this.router.delete('/:id',bodegasControllers.delete);      
    }
}


const bodegaRoute = new BodegaRoute;
export default bodegaRoute.router;
 