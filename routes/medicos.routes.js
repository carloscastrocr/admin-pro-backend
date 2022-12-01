/*
  Ruta : /api/medicos
*/
const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.controller')
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT, getMedicos)

// el segundo argumento seria el middleware
router.post('/', 
[
  validarJWT,
  check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
  check('hospital', 'El id de Hospital debe ser valido').isMongoId(),
  validarCampos
]
,crearMedico)

router.put('/:id', 
[   
  validarJWT,
  check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
  check('hospital', 'El id de Hospital debe ser valido').isMongoId(),
  validarCampos   
]
,actualizarMedico);

router.delete('/:id',validarJWT, borrarMedico) 


module.exports = router;