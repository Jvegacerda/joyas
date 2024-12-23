const { DB } = require('../db');
const verificarExistenciaJoyas = async (req, res, next) => {
    const { precio_min, precio_max, categoria, metal } = req.query;

    const query = `
        SELECT * FROM inventario
        WHERE ($1::INT IS NULL OR precio >= $1)
        AND ($2::INT IS NULL OR precio <= $2)
        AND ($3::TEXT IS NULL OR categoria = $3)
        AND ($4::TEXT IS NULL OR metal = $4)
    `;

    const values = [
        precio_min ? parseInt(precio_min) : null,
        precio_max ? parseInt(precio_max) : null,
        categoria || null,
        metal || null,
    ];

    try {
        const result = await DB.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No se encontraron joyas con los filtros proporcionados.' });
        }
        next();
    } catch (error) {next(error);}
};

module.exports = { verificarExistenciaJoyas };


// testear con metal no existente
// 
// funcionando: http://localhost:3000/joyas/filtros?categoria=aros&metal=oro
// error: http://localhost:3000/joyas/filtros?categoria=aros&metal=greda