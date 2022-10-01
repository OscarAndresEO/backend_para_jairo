import express, { Application, json} from 'express';
import morgan from 'morgan';
import cors from 'cors';


import productoRoutes from './routes/productosRoutes';
import bodegasRoutes from './routes/bodegasRoutes';
import producto_bodegasRoutes from './routes/producto_bodegasRoutes';

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config() :void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    };

    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Servidor en puerto ', this.app.get('port'));
            
        })
    }

    routes(){
        this.app.use('/api/productos',productoRoutes);
        this.app.use('/api/bodegas',bodegasRoutes);
        this.app.use('/api/productos-bodegas',producto_bodegasRoutes);
    }
};

const newServer = new Server();
newServer.start();