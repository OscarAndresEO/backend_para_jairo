import {Request,Response} from 'express';
import pool from '../database';

class Productos_BodegaControllers{  

    public async List (req : Request,res : Response) {
        const productos = await pool.query("SELECT p_b.ID,p_b.productoID,p_b.bodegaID, p_b.CANTIDAD,p_b.FECHA,p_b.TOTAL,b.NOMBRE AS 'Nombre_Bodega',b.DESCRIPCION AS 'Descripcion_Bodega',b.Bodega_Ventas,b.CREACION AS 'Creacion_Bodega',b.MODIDICACION AS 'Modificacion_Bodega',b.ESTATUS  AS 'Estatus_Bodega', p.NOMBRE  AS 'Nombre_Producto', p.DESCRIPCION AS 'Descripcion_Producto',p.Precio_Compra AS 'Precio_Compra_Producto',p.Precio_Venta AS 'Precio_Venta_Producto',p.CREACION AS 'Creacion_Producto',p.MODIDICACION AS 'Modificacion_Producto',p.ESTATUS  AS 'Estatus_Producto'FROM productos_bodega p_b  INNER JOIN bodegas b on b.ID = p_b.bodegaID INNER JOIN productos p ON p.ID = p_b.productoID ORDER BY p_b.bodegaID");
        console.log(productos);
        res.json(productos);
    }
    
    public async getOne(req: Request, res: Response) : Promise <any>{
        const { id } = req.params;
        
        const productos = await pool.query("SELECT p_b.ID,p_b.productoID,p_b.bodegaID, p_b.CANTIDAD,p_b.FECHA,p_b.TOTAL,b.NOMBRE AS 'Nombre_Bodega',b.DESCRIPCION AS 'Descripcion_Bodega',b.Bodega_Ventas,b.CREACION AS 'Creacion_Bodega',b.MODIDICACION AS 'Modificacion_Bodega',b.ESTATUS AS 'Estatus_Bodega', p.NOMBRE AS 'Nombre_Producto', p.DESCRIPCION AS 'Descripcion_Producto',p.Precio_Compra AS 'Precio_Compra_Producto',p.Precio_Venta AS 'Precio_Venta_Producto',p.CREACION AS 'Creacion_Producto',p.MODIDICACION AS 'Modificacion_Producto',p.ESTATUS AS 'Estatus_Producto'FROM productos_bodega p_b INNER JOIN bodegas b on b.ID = p_b.bodegaID INNER JOIN productos p ON p.ID = p_b.productoID where p_b.bodegaID = ? ORDER BY p_b.bodegaID", [ id ]) ;
       
       if(productos.length > 0){
           console.log(productos);
            res.json(productos);
       }else{
           res.json({Text: 'No hay productos en la bodega'});
        }
    }

    public async create( req : Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO Bodegas set ?', req.body);
        res.json({message: 'Bodega agregado correctamente'});

    }

    public async delete(req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE Bodegas set estatus = "Cancelado" where id = ?', [ id ]) ;
        res.json({message:'La Bodega fue eliminada correctamente'})
    }

    public async update(req:Request, res:Response):Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE Bodegas set ? where id = ?', [req.body, id ]) ;
        res.json({message:'La Bodega ha sido actualizado'});
    }
} 

const productos_BodegaControllers = new Productos_BodegaControllers();
export default productos_BodegaControllers;