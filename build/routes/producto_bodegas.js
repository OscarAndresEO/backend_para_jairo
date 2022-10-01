"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_bodegaControllers_1 = __importDefault(require("../controllers/productos_bodegaControllers"));
class BodegaRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productos_bodegaControllers_1.default.List);
        this.router.post('/', productos_bodegaControllers_1.default.create);
        this.router.get('/:id,:nombre', productos_bodegaControllers_1.default.getOne);
        this.router.put('/:id', productos_bodegaControllers_1.default.update);
        this.router.delete('/:id', productos_bodegaControllers_1.default.delete);
    }
}
const bodegaRoute = new BodegaRoute;
exports.default = bodegaRoute.router;
