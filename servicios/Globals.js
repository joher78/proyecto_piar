const DB_ID = '18b0dIYky6E6TRuJg9CAexmuJf-CEyitsIMmHsX-qS2Y';
const SS = SpreadsheetApp.openById(DB_ID);
const sheetEstudiante = SS.getSheetByName('Estudiantes');

   
var padresSheet = SS.getSheetByName('Padres');
var infoGeneralSheet = SS.getSheetByName('GeneralEstudiantes');