const Mensaje = require('../models/mensaje');

const GetChat = async( req, res ) => {

    const myId = req.uid;
    const mensajesfrom = req.params.de;

    const last20 = await Mensaje.find({
        $or: [
            { from: myId, to: mensajesfrom },
            { from: mensajesfrom, to: myId },
        ]
    })
    .sort({ createdAt: 'asc' })
    .limit(20);



    res.json({
        ok: true,
        mensajes: last20
    });


}

module.exports = {
    GetChat
}