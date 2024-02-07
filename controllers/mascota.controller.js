const bcryptjs = require('bcryptjs');
const Mascota = require('../models/mascota');
const { response } = require('express');

const mascotaGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { disponibilidad: true };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

const getMascotaById = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        mascota
    });
}

const putMascota = async (req, res = response) => {
    const { id } = req.params;

    const mascota = await Mascota.findByIdAndUpdate(id);

    res.status(200).json({
        msg: 'Mascota Actualizada !!!',
        mascota
    })
}

const mascotaDelete = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findByAndUpdate(id, { disponibilidad: false });
    res.status(200).json({
        msg: "Mascota Eliminada !!!",
        mascota
    });
}

const mascotaPost = async (req, res) => {
    const { especie, raza, genero} = req.body;
    const mascota = new Mascota({ especie, raza, genero });

    await mascota.save();
    res.status(202).json({
        mascota
    });
}

module.exports = {
    mascotaDelete,
    mascotaGet,
    getMascotaById,
    putMascota,
    mascotaPost
}