$("#btnBuscar").click(function (e) {
    if (validacion() === true) {
        const buscar = document.getElementById("search");
        urlNavegacion(buscar);
    }
    e.preventDefault();
});

function validacion() {
    let buscar = document.getElementById("search");
    if (buscar.value === "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese algo a buscar');
        document.getElementById("search").focus();
    } else {
        return true;
    }
}
function urlNavegacion(data) {
    // TODO: seccion libros
    if (data.value === "Libros" || data.value === "libros" || data.value === "libro" || data.value === "LIBROS") {
        $(location).attr('href', 'libro');
    } else if (data.value === "Editorial" || data.value === "editorial" || data.value === "EDITORIAL") {
        $(location).attr('href', 'editorial');
    } else if (data.value === "Autores" || data.value === "autores" || data.value === "autor" || data.value === "Autor" || data.value === "AUTOR") {
        $(location).attr('href', 'autor');
    } else if (data.value === "Genero" || data.value === "genero" || data.value === "GENERO") {
        $(location).attr('href', 'genero');
    } else if (data.value === "Pais" || data.value === "pais" || data.value === "PAIS") {
        $(location).attr('href', 'pais');
    } else {
        resetarSearch();
    }



}
function resetarSearch() {
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('No existe esa sección');
    document.getElementById("search").value = "";
    document.getElementById("search").focus();
}