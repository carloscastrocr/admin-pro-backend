/*
 Ruta:/api/usuarios
*/
const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')


const {getUsuarios, creartUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT,getUsuarios)

// el segundo argumento seria el middleware
router.post('/', 
[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  validarCampos,
]
,creartUsuario)

router.put('/:id', 
[   
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
   validarCampos,
]
,actualizarUsuario);

router.delete('/:id', validarJWT,borrarUsuario) 


module.exports = router;
