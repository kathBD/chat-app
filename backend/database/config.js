const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.DB_CNN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true            
        });

        console.log('Base de datos en linea');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la DATABASE');
    }


}


module.exports = {dbConnection}
