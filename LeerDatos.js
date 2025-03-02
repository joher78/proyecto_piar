function leerEstudiantes() {

 try {
    const dataEstudiante = sheetEstudiante.getDataRange().getDisplayValues();
  dataEstudiante.shift();


    // Filtrar registros activos (asumiendo que la columna de estado es la última)
    var registrosActivos = dataEstudiante.filter(function(row) {
     
      return row[row.length - 1] === "Activo"; // Reemplaza "activo" con el valor de tu estado activo
    });

     console.log(registrosActivos);

     
    return registrosActivos;

   
  } catch (e) {
    Logger.log(e.toString());
    return "Error al obtener los registros activos: " + e.toString();
  }

 

 

  
}
