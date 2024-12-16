const express = require('express');
const router = express.Router();
const { getJoyas, getJoyasFiltros } = require('../controllers/joyasController');  // Importa las funciones correctamente
const { verificarExistenciaJoyas } = require('../middlewares/existenciaJoyas');
const { validarRangoPrecios } = require('../middlewares/validarFiltros');


router.get('/joyas', getJoyas);
router.get('/joyas/filtros', validarRangoPrecios, verificarExistenciaJoyas, getJoyasFiltros);

module.exports = router;
