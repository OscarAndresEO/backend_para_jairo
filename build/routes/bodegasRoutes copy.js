"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodegasControllers_1 = __importDefault(require("../controllers/bodegasControllers"));
const bodegasControllers_2 = __importDefault(require("../controllers/bodegasControllers"));
class BodegaRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bodegasControllers_2.default.List);
        this.router.post('/', bodegasControllers_2.default.create);
        this.router.get('/:id,:nombre', bodegasControllers_1.default.getOne);
        this.router.put('/:id', bodegasControllers_2.default.update);
        this.router.delete('/:id', bodegasControllers_2.default.delete);
    }
}
const bodegaRoute = new BodegaRoute;
exports.default = bodegaRoute.router;
