function doGet(e) {
  let page = e.parameter.mode || "Index";
  let html = HtmlService.createTemplateFromFile(page).evaluate();
  let htmlOutput = HtmlService.createHtmlOutput(html);
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');

  //Replace {{NAVBAR}} with the Navbar content
  htmlOutput.setContent(htmlOutput.getContent().replace("{{NAVBAR}}",getNavbar(page)));
  return htmlOutput;
}


//Create Navigation Bar
function getNavbar(activePage) {
  var scriptURLHome = getScriptURL();
  var scriptURLPage1 = getScriptURL("mode=estudiante/Estudiantes");
  var scriptURLPage2 = getScriptURL("mode=Profesor");
  var scriptURLPage3 = getScriptURL("mode=Page3");

  var navbar = 
    `<nav class="navbar navbar-expand-md navbar-dark bg-dark" data-bs-theme="dark">
         <div class="container-fluid">
        <a class="navbar-brand" href="${scriptURLHome}">PIAR</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-item nav-link ${activePage === 'Index' ? 'active' : ''}" href="${scriptURLHome}">Home</a>
             </li>
            <li class="nav-item">
            <a class="nav-item nav-link ${activePage === 'estudiante/Estudiantes' ? 'active' : ''}" href="${scriptURLPage1}">Estudiantes</a>
             </li>
            <li class="nav-item">
            <a class="nav-item nav-link ${activePage === 'Profesor' ? 'active' : ''}" href="${scriptURLPage2}">Profesores</a>
             </li>
            <li class="nav-item">
            <a class="nav-item nav-link ${activePage === 'Page3' ? 'active' : ''}" href="${scriptURLPage3}">Page 3</a>
             </li>
           </ul>
        </div>
        </div>
      </nav>`;
  return navbar;
}


//returns the URL of the Google Apps Script web app
function getScriptURL(qs = null) {
  var url = ScriptApp.getService().getUrl();
  if(qs){
    if (qs.indexOf("?") === -1) {
      qs = "?" + qs;
    }
    url = url + qs;
  }
  return url;
}

//INCLUDE HTML PARTS, EG. JAVASCRIPT, CSS, OTHER HTML FILES
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}