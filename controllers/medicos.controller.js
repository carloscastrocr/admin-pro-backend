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

const actualizarMedico = (req, res = response) =>{
     
    res.json({
        ok:true,
        msg: 'putMedico'
    })
}

const borrarMedico = (req, res = response) =>{
     
    res.json({
        ok:true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico   
}