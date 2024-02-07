const {Schema, model} = require('mongoose');

const mascotaSchema = Schema({
    especie:{
        type: String,
        required: [true, 'La especie es obligatoria']
    },
    raza:{
        type: String,
        required: [true, 'La raza es obligatoria']
    },
    ganero:{
        type: String,
        required: [true, 'El genero es obligatorio']
    },
    img:{
        type: String
    },
    disponibilidad:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Mascota', mascotaSchema);