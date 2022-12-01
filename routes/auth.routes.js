/*
 path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    login);

router.post('/google',
    [
      
        check('token', 'El Token de google es obligatorio obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn);

module.exports = router;