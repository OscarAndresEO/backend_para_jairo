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
class BodegasControllers {
    List(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodegas = yield database_1.default.query("SELECT * FROM Bodegas where estatus = 'activo';");
            console.log(bodegas);
            res.json(bodegas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre } = req.params;
            const bodega = yield database_1.default.query('SELECT * FROM bodegas where id = ? Or NOMBRE = ?', [id, nombre]);
            if (bodega.length > 0) {
                console.log(bodega[0]);
                res.json(bodega[0]);
            }
            else {
                res.json({ Text: 'La bodega no ha sido encontrado' });
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
const bodegasControllers = new BodegasControllers();
exports.default = bodegasControllers;
