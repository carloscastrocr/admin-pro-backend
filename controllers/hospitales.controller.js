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

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'putHospitales'
    })
}

const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}