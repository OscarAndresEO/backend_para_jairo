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
class ProductosControllers {
    List(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield database_1.default.query("SELECT * FROM productos where estatus = 'activo';");
            console.log(productos);
            res.json(productos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const producto = yield database_1.default.query('SELECT * FROM productos where id = ?', [id]);
            if (producto.length > 0) {
                console.log(producto);
                res.json(producto[0]);
            }
            else {
                res.status(404).json({ Text: 'El producto no ha sido encontrado' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO productos set ?', req.body);
            res.json({ message: 'producto agregado correctamente' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE productos set estatus = "Cancelado" where id = ?', [id]);
            res.json({ message: 'El producto fue eliminado correctamente' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE productos set ? where id = ?', [req.body, id]);
            res.json({ message: 'El producto ha sido actualizado' });
        });
    }
}
const productosControllers = new ProductosControllers();
exports.default = productosControllers;
