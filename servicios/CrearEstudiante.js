function agregarEstudiante(form) {
  Logger.log(form); 

  const id = form["id"];
  const primerNombre = form["primer-nombre"];
  const segundoNombre = form["segundo-nombre"];
  const primerApellido = form["primer-apellido"];
  const segundoApellido = form["segundo-apellido"];
  const lugarNacimiento = form["lugar-nacimiento"];
  const fechaNacimiento = form["fecha-nacimiento"];
  const tipoDocumento = form["tipo-documento"];
  const numeroDocumento = form["numero-documento"];
  const telefono = form["telefono"];
  const correoElectronico = form["correo"];
  const direccion = form["direccion"];
  const barrio = form["barrio"];
  const municipio = form["municipio"];
  const departamento = form["departamento"];
  const gradoAspirante = form["grado-aspirante"];
  const salon = form["salon"];
  const estado = "Activo";

  sheetEstudiante.appendRow([
    id,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    lugarNacimiento,
    fechaNacimiento,
    tipoDocumento,
    numeroDocumento,
    telefono,
    correoElectronico,
    direccion,
    barrio,
    municipio,
    departamento,
    gradoAspirante,
    salon,
    estado

  ])
  return "Estudiannte agregado"
  
}

function agregarPadre(form) {

 Logger.log(form);
  return "Padre agregado" 
}

function crearNuevoId(){
  let id = 1;
  if(sheetEstudiante.getLastRow() === 1){
    return id;
  }
  const ids = sheetEstudiante.getRange(2,1,sheetEstudiante.getLastRow()-1,1).getValues();
  
  let maxId = 0;
  ids.forEach (id => {

 if (id > maxId){
maxId = id;
  }

  });
  return parseInt(maxId) + 1;
 
}


