
const  {Router}  = require('express');
const  {check } = require('express-validator');

// Controllers
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

 //create new user
router.post( '/new', [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario );


// Login validetor autmat
router.post('/',[
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    validarCampos
], login );

// Renew Token
router.get('/renew', validarJWT, renewToken );




module.exports = router;