const hoja2 = institucionSheet;


function agregarProfesor(form) {
  Logger.log(form);
  // {descripcion=otra materia, area=ootra, materia=otra, estado=activo, id=}
  const id = crearNuevoId();
  const nombre = form.nombre;
  const sede = form.sede; //form["segundo-nombre"];
  const direccion = form.direccion;
  const correo= form.correo;
  const telefono= form.telefono
  const estado = "Activo";

  hoja2.appendRow([
    id,
    nombre,
    sede,
    direccion,
    correo,
    telefono,
    estado

  ])
  return "Institucion agregada correctamante"

}

function crearNuevoId() {
  let id = 1;
  if (hoja2.getLastRow() === 1) {
    return id;
  }
  const ids = hoja2.getRange(2, 1, hoja2.getLastRow() - 1, 1).getValues().map(id => id[0]);
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

function editarColegio(form) {

  const fila = buscarFila(form.id);
  console.log(fila);
  hoja2.getRange(fila, 2, 1, hoja2.getLastColumn() - 1).setValues([[
    form.nombre,
    form.sede,
    form.direccion,
     form.correo,
      form.telefono,
    form.estado
  ]])
  return "Registro Editado"
}


function leerColegios() {

  try {
    const data = hoja2.getDataRange().getDisplayValues();
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

function eliminarColegio(id){

  let formulario = colegioPorId(id);
  formulario.estado = "Inactivo";
  editarColegio(formulario);
 return "Registro Eliminado"

}


function colegioPorId(id) {

  try {
    if (!hoja2) {
      Logger.log("Hoja no encontrada.");
      return JSON.stringify({ error: "Hoja  no encontrada." });
    }
    console.log("id " + id)

    var idColumn = hoja2.getRange("A:A"); // Asumiendo que el ID está en la columna A
    console.log("idColumn " + idColumn)
    var idCell = idColumn.createTextFinder(id).findNext();

    if (idCell) {
      console.log("idCell " + idCell.getRow())
      var row = idCell.getRow();
      var range = hoja2.getRange(row, 1, 1, hoja2.getLastColumn());
      var values = range.getValues()[0];
      console.log("values " + values)
      var headers = hoja2.getRange(1, 1, 1, hoja2.getLastColumn()).getValues()[0];

      var data = {};
      headers.forEach(function (header, j) {
        data[header] = values[j];
      });
      console.log("data ",data);
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


function colegioPorNombre(nombre) {

  try {
    if (!hoja2) {
      Logger.log("Hoja no encontrada.");
      return JSON.stringify({ error: "Hoja  no encontrada." });
    }
    console.log("nombre " + nombre)

    var idColumn = hoja2.getRange("B:B"); // Asumiendo que el ID está en la columna A
    console.log("NombreColumn " + idColumn)
    var idCell = idColumn.createTextFinder(nombre).findNext();

    if (idCell) {
      console.log("NombreCell " + idCell.getRow())
      var row = idCell.getRow();
      var range = hoja2.getRange(row, 1, 1, hoja2.getLastColumn());
      var values = range.getValues()[0];
      console.log("values " + values)
      var headers = hoja2.getRange(1, 1, 1, hoja2.getLastColumn()).getValues()[0];

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

function buscarFila(id) {
  const ids = hoja2.getRange(2, 1, hoja2.getLastRow() - 1, 1).getValues().map(id => id[0]);
  console.log(ids);
  const index = ids.indexOf(Number(id));
  const row = index + 2;
  console.log(row);
  return row;
}

let form1 = {
  id:"2",
  nombre: "sagrado",
    sede: "unica",
    direccion: "calle",
    correo: "correo",
    telefono: "121212121",
    estado: "Activo"

};

function ejecutar (){

colegioPorNombre('sagrado')
}