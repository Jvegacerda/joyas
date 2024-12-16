const { DB } = require('../db');

const fetchJoyas = async (limits, page, order_by) => {
  const limit = limits ? parseInt(limits) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;
  const [field, direction] = order_by ? order_by.split('_') : ['id', 'ASC'];

  const query = `
    SELECT * FROM inventario
    ORDER BY ${field} ${direction}
    LIMIT $1 OFFSET $2;
  `;
  const result = await DB.query(query, [limit, offset]);

  return {
    total: result.rows.length,
    data: result.rows,
    links: {
      self: `/joyas?limits=${limits}&page=${page}&order_by=${order_by}`,
      next: `/joyas?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`,
      prev: `/joyas?limits=${limits}&page=${parseInt(page) - 1}&order_by=${order_by}`,
    },
  };
};

const fetchJoyasFiltros = async (precio_min, precio_max, categoria, metal) => {
    const query = `
      SELECT * FROM inventario
      WHERE
        ($1::INT IS NULL OR precio >= $1) AND
        ($2::INT IS NULL OR precio <= $2) AND
        ($3::TEXT IS NULL OR categoria = $3) AND
        ($4::TEXT IS NULL OR metal = $4)
    `;
    const values = [
      precio_min ? parseInt(precio_min) : null,
      precio_max ? parseInt(precio_max) : null,
      categoria || null,
      metal || null,
    ];
  
    const result = await DB.query(query, values);
    return result.rows;
  };
  
  module.exports = { fetchJoyasFiltros, fetchJoyas };