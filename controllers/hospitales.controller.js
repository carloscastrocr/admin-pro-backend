const { response } = require('express')
const { model } = require('mongoose')

const Hospital = require('../models/hospital.model')

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                             .populate('usuario','nombre img');

    try {
        res.json({
            ok: true,
            hospitales
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado hable con el administrador'
        })
    }
}


const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    })


    try {
        // Guardar Hospital
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (erorr) {
        console.log(erorr);
        return res.status(500).json({
            ok: false,
            msg: 'error inesperado hable con el administrador'
        })
    }


}

const actualizarHospital = async (req, res = response) => {

    const hospitalId = req.params.id
    const uid = req.uid


    try{
        
        const hospitalDb = await Hospital.findById(hospitalId)

        if(!hospitalDb){
             return res.status(404).json({
                ok:true,
                msg: 'Hospital no encontrado por id'
             }) 
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital,{new:true})
       
        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error inesperado hable con el administrador'
        })
    }

   
}

const borrarHospital = async (req, res = response) => {

    const hospitalId = req.params.id
   
    try{
        
        const hospitalDb = await Hospital.findById(hospitalId)

        if(!hospitalDb){
             return res.status(404).json({
                ok:true,
                msg: 'Hospital no encontrado por id'
             }) 
        }

        await Hospital.findByIdAndDelete(hospitalId)
       
        res.json({
            ok: true,
            msg: 'Hospital Borrado'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}