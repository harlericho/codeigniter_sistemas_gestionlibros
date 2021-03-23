$(document).ready(function () {
    selectorEditorial();
    selectorAutor();
    selectorGenero();
    listadoLibros();
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});

function selectorAutor() {
    $.ajax({
        type: "POST",
        url: "libro/listadoAutor",
        dataType: "json",
        success: function (data) {
            html = "<select class='form-control' aria-label='Default select example' id='autor' name='autor' required>";
            html += "<option selected disabled >--Seleccione--</option>";
            for (var key in data) {
                html += `<option value="${data[key]['id_autor']}"> ${data[key]['nombres']}</option>`;
            }
            html += "</select>";
            $("#selectautor").html(html);
        }
    });
}
function selectorEditorial() {
    $.ajax({
        type: "POST",
        url: "libro/listadoEditorial",
        dataType: "json",
        success: function (data) {
            html = "<select class='form-control' aria-label='Default select example' id='editorial' name='editorial' required>";
            html += "<option selected disabled >--Seleccione--</option>";
            for (var key in data) {
                html += `<option value="${data[key]['id_editorial']}"> ${data[key]['nombre']}</option>`;
            }
            html += "</select>";
            $("#selecteditorial").html(html);
        }
    });
}

function selectorGenero() {
    $.ajax({
        type: "POST",
        url: "libro/listadoGenero",
        dataType: "json",
        success: function (data) {
            html = "<select class='form-control' aria-label='Default select example' id='genero' name='genero' required>";
            html += "<option selected disabled >--Seleccione--</option>";
            for (var key in data) {
                html += `<option value="${data[key]['id_genero']}"> ${data[key]['nombre']}</option>`;
            }
            html += "</select>";
            $("#selectgenero").html(html);
        }
    });
}


function listadoLibros() {
    $.ajax({
        type: "POST",
        url: "libro/listado",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped table-bordered' id='tablafiltro' style='width:100%' ><thead>";
            html += "<tr><th scope='col'>Editrial</th><th scope='col'>Autor</th><th scope='col'>Genero</th><th scope='col'>ISBN</th><th scope='col'>Titulo</th><th scope='col'>Ediccion</th><th scope='col'>Año</th><th scope='col'>Portada</th><th scope='col'>Precio</th><th scope='col'>Acciones</th></tr></thead>";
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
                html += `<td>
                <a href="#" id="del" value="${data[key]['id_libro']}" class="btn btn-sm btn-danger" title="Eliminar">
                <i class="fas fa-trash-restore"></i>
                </a>
                <a href="#" id="edit" value="${data[key]['id_libro']}" class="btn btn-sm btn-success" title="Editar">
                <i class="fas fa-pencil-alt"></i>
                </a>
                </td>`;
            }
            html += "</tr></tbody></table>"
            $("#tablalibro").html(html);
            //tabla filtro
            $('#tablafiltro').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                }
            });
        }
    });
}

$("#btnGuardar").click(function (e) {
    if (validaciones() == true) {
        let id = $("#id").val();
        let data = new FormData($("#libro")[0]);
        if ($.trim(id) == "") {
            guardar(data);
        } else {
            actualizar(data);
        }
    }
    e.preventDefault();
});

function guardar(data) {
    $.ajax({
        type: "POST",
        url: "libro/insertar",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response == 0) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Titulo de libro ya esta relacionado con esa editorial');
                $("#titulo").focus();
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Libro guardado con exito');
                $("#libro")[0].reset();
                $("#exampleModal").modal("hide");
                listadoLibros();

            }
        }
    });
}
function actualizar(data) {
    $.ajax({
        type: "POST",
        url: "libro/actualizar",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Libro modificado con exito');
                $("#libro")[0].reset();
                $("#exampleModal").modal("hide");
                listadoLibros();
            }
        }
    });
}

$(document).on("click", "#edit", function (e) {
    let idEditar = $(this).attr("value");
    $.ajax({
        type: "POST",
        url: "libro/obtenerID",
        dataType: "json",
        data: { idEditar: idEditar },
        success: function (data) {
            if (data.res == "suc") {
                $("#exampleModal").modal("show");
                $("#id").val(data.post.id_libro);
                $("#editorial").val(data.post.id_editorial);
                $("#autor").val(data.post.id_autor);
                $("#genero").val(data.post.id_genero);
                $("#titulo").val(data.post.titulo);
                $("#des").val(data.post.descripcion);
                $("#edi").val(data.post.edicion);
                $("#ann").val(data.post.ann);
                $("#precio").val(data.post.precio_v);
            }

        }
    });

    e.preventDefault();
});

$(document).on("click", "#del", function (e) {
    let idEliminar = $(this).attr("value");
    Swal.fire({
        title: 'Seguro desea eliminar?',
        text: "Solo se cambiara el estado del registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "libro/eliminar",
                data: { idEliminar: idEliminar },
                success: function (response) {
                    if (response) {
                        listadoLibros();
                    }
                }
            });
            Swal.fire(
                'Eliminado!',
                'Su registro cambio de estado',
                'success'
            )
        }
    })
    e.preventDefault();
});

function validaciones() {
    let autor = $("#autor").val();
    let edit = $("#editorial").val();
    let gen = $("#genero").val();
    let titulo = $("#titulo").val();
    let des = $("#des").val();
    let edic = $("#edi").val();
    let ann = $("#ann").val();
    //let file = $("#file").val();
    let precio = $("#precio").val();
    if ($.trim(edit) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Elegir una editorial');
        $("#editorial").focus();
    } else if ($.trim(autor) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Elegir un autor ');
        $("#autor").focus();
    } else if ($.trim(gen) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Elegir un genero');
        $("#genero").focus();
    } else if ($.trim(titulo) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un titulo');
        $("#titulo").focus();
    } else if ($.trim(des) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una descripción');
        $("#des").focus();
    } else if ($.trim(edic) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una edicción');
        $("#edi").focus();
    } else if ($.trim(ann) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un año');
        $("#ann").focus();
    }
    /* else if ($.trim(file) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una imagen');
        $("#file").focus();
    } */else if ($.trim(precio) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un precio venta');
        $("#precio").focus();
    } else {
        if (cantidadInput(ann) == true) {
            return true;
        } else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Año debe tener minimo 4 digitos');
            $("#ann").focus();
        }

    }
}



function limpiar() {
    $('#editorial').get(0).selectedIndex = 0;
    $('#autor').get(0).selectedIndex = 0;
    $('#genero').get(0).selectedIndex = 0;
    document.getElementById("id").value = '';
    document.getElementById("titulo").value = '';
    document.getElementById("des").value = '';
    document.getElementById("edi").value = '';
    document.getElementById("ann").value = '';
    document.getElementById("file").value = '';
    document.getElementById("precio").value = '';
    //$("#modaladd")[0].reset();
}


$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $('#editorial').focus();
    })
});


function decimalNumber() {
    // Solo permite ingresar números con punto o coma
    $('.decimales').on('input', function () {
        this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
    });

}


function cantidadInput(data) {
    let length = data.length;
    let c = 0;
    for (var i = 0; i < length; i++) {
        c = c + 1;
    }
    if (c > 3 && c <= 4) {
        return true;
    } else {
        return false;
    }
}