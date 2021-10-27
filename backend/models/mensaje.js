const { Schema, model } = require('mongoose');


const MensajeSchema = Schema({

    from: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    menssage: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500
    }
},{
    timestamps: true
});


MensajeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema );
