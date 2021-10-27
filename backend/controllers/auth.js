const { response } = require('express');
const bcrypt  = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {
    
    try {
        
        const { email, password } = req.body;

        // check if the email does not exist
        const existEmail = await Usuario.findOne({ email });
        if ( existEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email  esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Save user in database
        await usuario.save();
        
        // Generate the JWT
        const token = await generarJWT( usuario.id );
             
        res.json({
            ok: true,
            usuario,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese el administrador'
        });
    }

    
}


// login
const login = async(req, res) => {

    const {  email, password } = req.body;

    try {
        
        // Verify existence of the mail
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'El email no se encontrado'
            });
        }
       // validate password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Password  incorrecto'
            });
        }

        // Generate JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador'
        });
    }

}

// renewToken
const renewToken = async(req, res) => {

    const uid = req.uid;
    //Generate a new JWT
    const token = await generarJWT( uid );

    // Get user for UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        usuario,
        token
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}
