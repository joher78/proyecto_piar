function agregarEstudiante(form) {
  Logger.log(form); 

  const id = form["numero-documento"];
  const primerNombre = form["primer-nombre"];
  const segundoNombre = form["segundo-nombre"];
  const primerApellido = form["primer-apellido"];
  const segundoApellido = form["segundo-apellido"];
  const lugarNacimiento = form["lugar-nacimiento"];
  const fechaNacimiento = form["fecha-nacimiento"];
  const tipoDocumento = form["tipo-documento"];
  const telefono = form["telefono"];
  const correoElectronico = form["correo"];
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
    telefono,
    correoElectronico,
    estado

  ])
  return "Estudiannte agregado"
  
}

function agregarPadre(form) {

 Logger.log(form);
  return "Padre agregado" 
}




