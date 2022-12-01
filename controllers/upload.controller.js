//libreria de Nod
const path = require('path');

const fs = require('fs');

const { response } = require('express')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fielUpload = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'el tipo tiene que ser medicos/hospitales/usuarios'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        })
    }

    //procesar la imagaen ...
    const file = req.files.imagen; //esto gracias al middleware expressFileUpload

    const nombreCortado = file.name.split('.'); // wolverin.1.2.png
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extención
    const extensionesValida = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es una extensión no permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // mover la imagen eesto con expressUpload
    //En base a callbags
    file.mv(path, (err)=> {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg: 'Error al mover la imagen'
            });
        }

        //Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo)


        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        })
    
    });
   
}

const retornaImagen = (req, res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    //la direccion de toda mi aplicación desplegada es:__dirname
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
    
    if(fs.existsSync(pathImg)){
        res.sendFile( pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.png`)
        res.sendFile( pathImg);
    }
    
}
module.exports = {
    fielUpload,
    retornaImagen
}