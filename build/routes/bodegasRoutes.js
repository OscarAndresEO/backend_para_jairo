"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodegasControllers_1 = __importDefault(require("../controllers/bodegasControllers"));
class BodegaRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bodegasControllers_1.default.List);
        this.router.post('/', bodegasControllers_1.default.create);
        this.router.get('/:id,:nombre', bodegasControllers_1.default.getOne);
        this.router.put('/:id', bodegasControllers_1.default.update);
        this.router.delete('/:id', bodegasControllers_1.default.delete);
    }
}
const bodegaRoute = new BodegaRoute;
exports.default = bodegaRoute.router;
