/*
 Ruta:/api/upload/:"medicos/usuarios/hospitales"/:id
*/
const {Router} = require('express')
//middlewares
const expressFileUpload = require('express-fileupload');

const {fielUpload, retornaImagen} = require('../controllers/upload.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', [
    validarJWT
], fielUpload);

router.get('/:tipo/:foto', [
    validarJWT
], retornaImagen);

module.exports = router;