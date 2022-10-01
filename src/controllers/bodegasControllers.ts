import {Request,Response} from 'express';
import pool from '../database';

class BodegasControllers{  

    public async List (req : Request,res : Response) {
        const bodegas = await pool.query("SELECT * FROM Bodegas where estatus = 'activo';");
        console.log(bodegas);
        res.json(bodegas);
    }

    public async getOne(req: Request, res: Response) : Promise <any>{
        const { id } = req.params;
        const {nombre} = req.params;
        
        const bodega = await pool.query('SELECT * FROM bodegas where id = ? Or NOMBRE = ?', [ id,nombre ]) ;
       
       if(bodega.length > 0){
           console.log(bodega[0]);
            res.json(bodega[0]);
       }else{
           res.json({Text: 'La bodega no ha sido encontrado'});
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

const bodegasControllers = new BodegasControllers();
export default bodegasControllers;