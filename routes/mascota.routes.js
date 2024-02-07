const { Router } = require('express');
const { check } = require('express-validator');
const { existeMascotaById } = require('../helpers/db-validators')
const {
    mascotaGet,
    getMascotaById,
    putMascota,
    mascotaDelete,
    mascotaPost } = require('../controllers/mascota.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', mascotaGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos,
    ], getMascotaById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos,
    ], putMascota
);

router.post(
    "/",
    [
        check("especie", "La especie no puede estar vacia").not().isEmpty(),
        check("raza", 'La raza no puede ir vacia').not().isEmpty(),
        check("genero", "El genero no puede ir vacio").not().isEmpty(),
        validarCampos,
    ], mascotaPost
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], mascotaDelete
);

module.exports = router;