"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class Productos_BodegaControllers {
    List(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield database_1.default.query("SELECT p_b.ID,p_b.productoID,p_b.bodegaID, p_b.CANTIDAD,p_b.FECHA,p_b.TOTAL,b.NOMBRE AS 'Nombre_Bodega',b.DESCRIPCION AS 'Descripcion_Bodega',b.Bodega_Ventas,b.CREACION AS 'Creacion_Bodega',b.MODIDICACION AS 'Modificacion_Bodega',b.ESTATUS  AS 'Estatus_Bodega', p.NOMBRE  AS 'Nombre_Producto', p.DESCRIPCION AS 'Descripcion_Producto',p.Precio_Compra AS 'Precio_Compra_Producto',p.Precio_Venta AS 'Precio_Venta_Producto',p.CREACION AS 'Creacion_Producto',p.MODIDICACION AS 'Modificacion_Producto',p.ESTATUS  AS 'Estatus_Producto'FROM productos_bodega p_b  INNER JOIN bodegas b on b.ID = p_b.bodegaID INNER JOIN productos p ON p.ID = p_b.productoID ORDER BY p_b.bodegaID");
            console.log(productos);
            res.json(productos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productos = yield database_1.default.query("SELECT p_b.ID,p_b.productoID,p_b.bodegaID, p_b.CANTIDAD,p_b.FECHA,p_b.TOTAL,b.NOMBRE AS 'Nombre_Bodega',b.DESCRIPCION AS 'Descripcion_Bodega',b.Bodega_Ventas,b.CREACION AS 'Creacion_Bodega',b.MODIDICACION AS 'Modificacion_Bodega',b.ESTATUS AS 'Estatus_Bodega', p.NOMBRE AS 'Nombre_Producto', p.DESCRIPCION AS 'Descripcion_Producto',p.Precio_Compra AS 'Precio_Compra_Producto',p.Precio_Venta AS 'Precio_Venta_Producto',p.CREACION AS 'Creacion_Producto',p.MODIDICACION AS 'Modificacion_Producto',p.ESTATUS AS 'Estatus_Producto'FROM productos_bodega p_b INNER JOIN bodegas b on b.ID = p_b.bodegaID INNER JOIN productos p ON p.ID = p_b.productoID where p_b.bodegaID = ? ORDER BY p_b.bodegaID", [id]);
            if (productos.length > 0) {
                console.log(productos);
                res.json(productos);
            }
            else {
                res.json({ Text: 'No hay productos en la bodega' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO Bodegas set ?', req.body);
            res.json({ message: 'Bodega agregado correctamente' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE Bodegas set estatus = "Cancelado" where id = ?', [id]);
            res.json({ message: 'La Bodega fue eliminada correctamente' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE Bodegas set ? where id = ?', [req.body, id]);
            res.json({ message: 'La Bodega ha sido actualizado' });
        });
    }
}
const productos_BodegaControllers = new Productos_BodegaControllers();
exports.default = productos_BodegaControllers;
