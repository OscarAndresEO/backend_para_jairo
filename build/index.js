"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const bodegasRoutes_1 = __importDefault(require("./routes/bodegasRoutes"));
const producto_bodegasRoutes_1 = __importDefault(require("./routes/producto_bodegasRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    ;
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en puerto ', this.app.get('port'));
        });
    }
    routes() {
        this.app.use('/api/productos', productosRoutes_1.default);
        this.app.use('/api/bodegas', bodegasRoutes_1.default);
        this.app.use('/api/productos-bodegas', producto_bodegasRoutes_1.default);
    }
}
;
const newServer = new Server();
newServer.start();
