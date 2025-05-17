const hoja = materiasSheet;

function agregarMateria(form) {
  Logger.log(form);
  // {descripcion=otra materia, area=ootra, materia=otra, estado=activo, id=}
  const id = crearNuevoId();
  const nombre = form.materia;
  const area = form.area; //form["segundo-nombre"];
  const descripcion = form.descripcion; //form["primer-apellido"];

  const estado = "Activo";

  hoja.appendRow([
    id,
    nombre,
    area,
    descripcion,
    estado

  ])
  return "Materia agregada agregado"

}

function crearNuevoId() {
  let id = 1;
  if (hoja.getLastRow() === 1) {
    return id;
  }
  const ids = hoja.getRange(2, 1, hoja.getLastRow() - 1, 1).getValues().map(id => id[0]);
  Logger.log(ids);
  let maxId = 0;
  ids.forEach(id => {

    if (id > maxId) {
      maxId = id;
    }

  });
  Logger.log(parseInt(maxId) + 1);
  return parseInt(maxId) + 1;

}

function materiaPorId(id = 9) {

  try {
    if (!hoja) {
      Logger.log("Hoja no encontrada.");
      return JSON.stringify({ error: "Hoja  no encontrada." });
    }
    console.log("id " + id)

    var idColumn = hoja.getRange("A:A"); // Asumiendo que el ID está en la columna A
    console.log("idColumn " + idColumn)
    var idCell = idColumn.createTextFinder(id).findNext();

    if (idCell) {
      console.log("idCell " + idCell.getRow())
      var row = idCell.getRow();
      var range = hoja.getRange(row, 1, 1, hoja.getLastColumn());
      var values = range.getValues()[0];
      console.log("values " + values)
      var headers = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];

      var data = {};
      headers.forEach(function (header, j) {
        data[header] = values[j];
      });
      console.log(data);
      return data;

    } else {
      console.log("idCell errr ")
      return JSON.stringify({ mensaje: "no hay informacion" });
    }
    return null;

  } catch (e) {
    Logger.log(e.toString());
    return JSON.stringify({ error: "Error al obtener datos." });

  }
}

function materiaPorNombre(nombre = "ingles") {

  try {
    if (!hoja) {
      Logger.log("Hoja no encontrada.");
      return JSON.stringify({ error: "Hoja  no encontrada." });
    }
    console.log("nombre " + nombre)

    var idColumn = hoja.getRange("B:B"); // Asumiendo que el ID está en la columna A
    console.log("NombreColumn " + idColumn)
    var idCell = idColumn.createTextFinder(nombre).findNext();

    if (idCell) {
      console.log("NombreCell " + idCell.getRow())
      var row = idCell.getRow();
      var range = hoja.getRange(row, 1, 1, hoja.getLastColumn());
      var values = range.getValues()[0];
      console.log("values " + values)
      var headers = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];

      var data = {};
      headers.forEach(function (header, j) {
        data[header] = values[j];
      });
      console.log(data);
      return data;

    } else {
      console.log("nombreCell errr ")
      return JSON.stringify({ mensaje: "No hay informacion" });
    }
    return null;

  } catch (e) {
    Logger.log(e.toString());
    return JSON.stringify({ error: "Error al obtener datos." });

  }
}


function leerMaterias() {

  try {
    const data = hoja.getDataRange().getDisplayValues();
    data.shift();


    // Filtrar registros activos (asumiendo que la columna de estado es la última)
    var registrosActivos = data.filter(function (row) {

      return row[row.length - 1] === "Activo"; // Reemplaza "activo" con el valor de tu estado activo
    });

    console.log(registrosActivos);
    return registrosActivos;
  } catch (e) {
    Logger.log(e.toString());
    return "Error al obtener los registros activos: " + e.toString();
  }

}

function editarMateria(form) {

  const fila = buscarFila(form.idMateria);
  console.log(fila);
  hoja.getRange(fila, 2, 1, hoja.getLastColumn() - 1).setValues([[
    form.materia,
    form.area,
    form.descripcion,
    form.estado
  ]])
  return "Registro Editado"
}

function buscarFila(id) {
  const ids = hoja.getRange(2, 1, hoja.getLastRow() - 1, 1).getValues().map(id => id[0]);
  console.log(ids);
  const index = ids.indexOf(Number(id));
  const row = index + 2;
  console.log(row);
  return row;
}
