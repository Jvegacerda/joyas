const validarRangoPrecios = (req, res, next) => {
    const { precio_min, precio_max } = req.query;
  
    if (precio_min && precio_max && parseInt(precio_min) > parseInt(precio_max)) {
      return res.status(400).json({
        error: 'El precio mínimo no puede ser mayor que el precio máximo.',
      });
    }
  
    next();
  };
  
  module.exports = { validarRangoPrecios };


  // testear con precio minimo mayor que el maximo: 
  // 
  // funcionando: http://localhost:3000/joyas/filtros?precio_min=15000&precio_max=30000
  // error: http://localhost:3000/joyas/filtros?precio_min=30000&precio_max=20000