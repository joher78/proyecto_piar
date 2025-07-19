// @ts-nocheck
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

 function obtenerDatosPorId(sheet, id) {
  try{
if (!sheet) {
      Logger.log("Hoja 'informacionGeneral' no encontrada.");
      return JSON.stringify({ error: "Hoja 'informacionGeneral' no encontrada." });
    }
  console.log("id 2 " + id)
  console.log("hoja " + sheet)
     var idColumn = sheet.getRange("A:A"); // Asumiendo que el ID está en la columna A
     console.log("idColumn " + idColumn)
      var idCell = idColumn.createTextFinder(id).findNext();
       
      if (idCell) {
         console.log("idCell " + idCell.getRow())
        var row = idCell.getRow();
        var range = sheet.getRange(row, 1, 1, sheet.getLastColumn());
        var values = range.getValues()[0];
        console.log("values " + values)
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

        var data = {};
        headers.forEach(function(header, j) {
          data[header] = values[j];
        });
        console.log(data);
        return data;
        
      }else{
         console.log("idCell errr " )
          return JSON.stringify({ mensaje: "no hay informacionn general del estudiante." });
      }
      return null;

  } catch(e){
    Logger.log(e.toString());
    return JSON.stringify({ error: "Error al obtener datos." });

  }
     
    }

function estudianteId(id){

  console.log ("=======> " + id);
   try {
     console.log ("=======>  estudiante");
    // Obtener datos del estudiante
    var estudianteData = obtenerDatosPorId(sheetEstudiante, id);

   

    // Obtener datos de los padres (asumiendo que hay múltiples padres)
    var padresData = [];
    var lastRow = padresSheet.getLastRow();
    var headersPadres = padresSheet.getRange(1, 1, 1, padresSheet.getLastColumn()).getValues()[0];
    for (var i = 2; i <= lastRow; i++) {
      if (padresSheet.getRange(i, 2).getValue() === id) {
        var parentValues = padresSheet.getRange(i, 1, 1, padresSheet.getLastColumn()).getValues()[0];
        var parentData = {};
        headersPadres.forEach(function(header, j) {
          parentData[header] = parentValues[j];
        });
        padresData.push(parentData);
      }
    }

    // Crear el objeto JSON combinado
    var jsonData = {
      "estudiante": estudianteData,
      "padres": padresData
    };
    console.log(JSON.stringify(jsonData))

    return JSON.stringify(jsonData);

  } catch (e) {
    Logger.log(e.toString());
    return JSON.stringify({ error: "Error al obtener datos." });
  }

}
