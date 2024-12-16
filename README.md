# joyas


agregado ejemplos para test en cada uno de los dos middlewares:

-existenciaJoyas.js
/ testear con metal no existente
// 
// funcionando: http://localhost:3000/joyas/filtros?categoria=aros&metal=oro
// error: http://localhost:3000/joyas/filtros?categoria=aros&metal=greda

-validarFiltros.js
// testear con precio minimo mayor que el maximo: 
  // 
  // funcionando: http://localhost:3000/joyas/filtros?precio_min=15000&precio_max=30000
  // error: http://localhost:3000/joyas/filtros?precio_min=30000&precio_max=20000
