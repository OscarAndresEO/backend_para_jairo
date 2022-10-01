import {Request,Response} from 'express';
import pool from '../database';

class ProductosControllers{  

    public async List (req : Request,res : Response) {
        const productos = await pool.query("SELECT * FROM productos where estatus = 'activo';");
        console.log(productos);
        res.json(productos);
    }

    public async getOne(req: Request, res: Response) : Promise <any>{
        const { id } = req.params;
        const {nombre} = req.params;
        
        const producto = await pool.query('SELECT * FROM productos where id = ? Or NOMBRE = ?', [ id,nombre ]) ;
       
       if(producto.length > 0){
           console.log(producto[0]);
            res.json(producto[0]);
       }else{
           res.json({Text: 'El producto no ha sido encontrado'});
        }
    }
    
    public async create( req : Request, res: Response): Promise<void>{
        res.json(req.body);
        await pool.query('INSERT INTO productos set ?', req.body);
    }

    public async delete(req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE productos set estatus = "Cancelado" where id = ?', [ id ]) ;
        res.json({message:'El producto fue eliminado correctamente'})
    }

    public async update(req:Request, res:Response):Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE productos set ? where id = ?', [req.body, id ]) ;
        res.json({message:'El producto ha sido actualizado'});
    }
} 


const productosControllers = new ProductosControllers();
export default productosControllers;