$(document).ready(function () {
    listadoLibros();
    contarLibros();
    contarEditorial();
    contarAutor();
    contarUsuarios();
});

function listadoLibros() {
    $.ajax({
        type: "POST",
        url: "principal/listado",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped table-bordered' id='tablafiltro' style='width:100%' ><thead>";
            html += "<tr><th scope='col'>Editrial</th><th scope='col'>Autor</th><th scope='col'>Genero</th><th scope='col'>ISBN</th><th scope='col'>Titulo</th><th scope='col'>Ediccion</th><th scope='col'>Año</th><th scope='col'>Portada</th><th scope='col'>Precio</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['edito'] + "</td>";
                html += "<td>" + data[key]['auto'] + "</td>";
                html += "<td>" + data[key]['genen'] + "</td>";
                html += "<td>" + data[key]['isbn'] + "</td>";
                html += "<td>" + data[key]['titulo'] + "</td>";
                html += "<td>" + data[key]['edicion'] + "</td>";
                html += "<td>" + data[key]['ann'] + "</td>";
                html += "<td><img src=dist/images/uploads/" + data[key]['portada'] + " width=60 height=60></td>";
                html += "<td>" + data[key]['precio_v'] + "</td>";
            }
            html += "</tr></tbody></table>"
            $("#tablageneral").html(html);
            //tabla filtro
            $('#tablafiltro').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                }
            });
        }
    });
}
function contarLibros() {
    $.ajax({
        type: "POST",
        url: "principal/libros",
        dataType: "json",
        success: function (data) {
            $("#libros").html("Total de libros: " + data);

        }
    });
}
function contarEditorial() {
    $.ajax({
        type: "POST",
        url: "principal/editorial",
        dataType: "json",
        success: function (data) {
            $("#editorial").html("Total de editoriales: " + data);

        }
    });
}
function contarAutor() {
    $.ajax({
        type: "POST",
        url: "principal/autor",
        dataType: "json",
        success: function (data) {
            $("#autor").html("Total de autores: " + data);

        }
    });
}
function contarUsuarios() {
    $.ajax({
        type: "POST",
        url: "principal/usuarios",
        dataType: "json",
        success: function (data) {
            $("#usuarios").html("Total de usuarios: " + data);

        }
    });
}