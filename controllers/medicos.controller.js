const { response } = require('express')
const { model } = require('mongoose')

const Medico = require('../models/medico.model')

const getMedicos = async (req, res = response) =>{

    const medicos = await Medico.find()
                    .populate('usuario','nombre')
                    .populate('hospital','nombre img');

    try{

        res.json({
            ok:true,
            medicos
        })

    }catch(error){
       console.log(error);
       res.status(500).json({
        ok:false,
        msg: 'error inesperado hable con el administrador'
       })
    }  
     
}


const crearMedico = async (req, res = response) =>{

    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body
    })
   

    try{
        // Guardar Medico
        const medicolDB= await medico.save();
        res.json({
            ok:true,
            medico: medicolDB
        })

    }catch(erorr){
        console.log(erorr);
       return res.status(500).json({
            ok:false,
            msg: 'error inesperado hable con el administrador'
        })
    }
}

const actualizarMedico = async (req, res = response) =>{

    const medicoId = req.params.id
    const uid = req.uid


    try{
        
        const medicoDb = await Medico.findById(medicoId)

        if(!medicoDb){
             return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
             }) 
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico,{new:true})
       
        res.json({
            ok: true,
            medico: medicoActualizado
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error inesperado hable con el administrador'
        })
    }
}

const borrarMedico = async (req, res = response) =>{
    const medicoId = req.params.id
    try{
        
        const medicoDb = await Medico.findById(medicoId)

        if(!medicoDb){
             return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
             }) 
        }

         await Medico.findByIdAndDelete(medicoId)
       
        res.json({
            ok: true,
            msg: 'Medico Borrado'
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error inesperado hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico   
}