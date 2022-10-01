"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosControllers_1 = __importDefault(require("../controllers/productosControllers"));
class ProductoRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productosControllers_1.default.List);
        this.router.post('/', productosControllers_1.default.create);
        this.router.get('/:id,:nombre', productosControllers_1.default.getOne);
        this.router.put('/:id', productosControllers_1.default.update);
        this.router.delete('/:id', productosControllers_1.default.delete);
    }
}
const productoRoute = new ProductoRoute;
exports.default = productoRoute.router;
