
const { Router }  = require('express');
const { GetChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:from', validarJWT, GetChat );




module.exports = router;

