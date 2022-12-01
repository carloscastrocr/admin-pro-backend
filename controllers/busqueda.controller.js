const { response } = require('express');

const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model')

const getTodo = async (req, res = response) => {

    const buscar = req.params.busqueda;
    // expreción regular
    const regex = new RegExp(buscar, 'i')
    
    try{

        const [usuarios, hospitales, medicos] = await Promise.all([
            Usuario.find({nombre:regex}), 
            Hospital.find({nombre:regex}),
            Medico.find({nombre:regex})                        
        ])

        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado hables con el administrador'
        })
    }

}

const getDocumentosColeccion = async (req, res = response) => {
    
    const tabla = req.params.tabla;
    const buscar = req.params.busqueda;
    // expreción regular
    const regex = new RegExp(buscar, 'i');
    let data = [];
 
    switch (tabla){
        case 'medicos':
            data = await  Medico.find({nombre:regex})
                                .populate('usuario', 'nombre img') 
                                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await  Hospital.find({nombre:regex})
                                  .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await  Usuario.find({nombre:regex});
            break;            
        default:
           return res.status(400).json({
                ok:false,
                msg: 'la tabla tiene que ser medicos/hospitales/usuarios'
            });
                
    }

    res.json({
        ok:true,
        resutados: data
    })
    
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}