const hoja1 = educadorSheet;

function agregarProfesor(form) {
  Logger.log(form);
  // {descripcion=otra materia, area=ootra, materia=otra, estado=activo, id=}
  const id = form.idDocumento;
  const nombres = form.nombres;
  const apellidos = form.apellidos; //form["segundo-nombre"];
  const area = form.area; //form["primer-apellido"];
  const cargo = form.cargo;
  const correo= form.correo;
  const telefono= form.telefono
  const estado = "Activo";

  hoja1.appendRow([
    id,
    nombres,
    apellidos,
    area,
    cargo,
    correo,
    telefono,
    estado

  ])
  return "Profesor agregado correctamante"

}

function crearNuevoId1() {
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

function profesorPorId(id) {

  try {
    if (!hoja1) {
      Logger.log("Hoja no encontrada.");
      return JSON.stringify({ error: "Hoja  no encontrada." });
    }
    console.log("id " + id)

    var idColumn = hoja1.getRange("A:A"); // Asumiendo que el ID está en la columna A
    console.log("idColumn " + idColumn)
    var idCell = idColumn.createTextFinder(id).findNext();

    if (idCell) {
      console.log("idCell " + idCell.getRow())
      var row = idCell.getRow();
      var range = hoja1.getRange(row, 1, 1, hoja1.getLastColumn());
      var values = range.getValues()[0];
      console.log("values " + values)
      var headers = hoja1.getRange(1, 1, 1, hoja1.getLastColumn()).getValues()[0];

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

function profesorPorNombre(nombre = "ingles") {

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


function leerProfesores() {

  try {
    const data = hoja1.getDataRange().getDisplayValues();
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

function editarProfesor(form) {
console.log("profesor para ed1tar", form.idDocumento);
  const fila = buscarFila1(form.idDocumento);
  console.log(fila);
   hoja1.getRange(fila, 2, 1, hoja1.getLastColumn() - 1).setValues([[
    form.nombres,
    form.apellidos,
    form.area,
    form.cargo,
    form.correo,
    form.telefono,
    form.estado
  ]])
 
  return "Registro Editado"
}

function buscarFila1(id) {
 console.log('id',id) 
  const ids = hoja1.getRange(2, 1, hoja1.getLastRow() - 1, 1).getValues().map(id => id[0]);
  console.log(ids);
  const index = ids.indexOf(Number(id));
  const row = index + 2;
  console.log(row);
  return row;
}

function eliminarProfesor(id){
  let formulario = profesorPorId(id);
  console.log("formuilario", formulario)
  formulario.estado='Inactivo'
  editarProfesor(formulario);
  return 'profesor eliminado'

}

function prueba(){
 // eliminarProfesor('12131415')
 crearNuevoId()
}

