$(document).ready(function () {
    listadoEditorial();
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});

$("#btnGuardar").click(function (e) {
    if (validaciones() == true) {
        let id = $("#id").val();
        let data = $("#editorial").serialize();
        if ($.trim(id) == "") {
            guardar(data);
            //console.log(id);
        } else {
            //console.log(id);
            actualizar(data);
        }

    }
    e.preventDefault();
});

function guardar(data) {
    $.ajax({
        type: "POST",
        url: "editorial/insertar",
        data: data,
        success: function (response) {
            if (response == 0) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Editorial ya existe en la base');
                $("#nombre").focus();
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Editorial guardado con exito');
                $("#editorial")[0].reset();
                $("#exampleModal").modal("hide");
                listadoEditorial();
            }
        }
    });
}

function actualizar(data) {
    $.ajax({
        type: "POST",
        url: "editorial/actualizar",
        data: data,
        success: function (r) {
            //console.log(data);
            if (r == 1) {
                $("#exampleModal").modal("hide");
                $("#editorial")[0].reset();
                listadoEditorial();
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Editorial modificado con exito');
            }
        }
    });
}







function validaciones() {
    let nombre = $("#nombre").val();
    let telefono = $("#telefono").val();
    let dir = $("#dir").val();
    if ($.trim(nombre) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un nombre editorial');
        $("#nombre").focus();
    } else if ($.trim(telefono) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un telefono');
        $("#telefono").focus();
    } else if ($.trim(dir) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una dirección');
        $("#dir").focus();
    } else {
        if (cantidadInput(telefono) == true) {
            return true;
        } else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.warning('Número telefonico debe tener entre 9 o 10 digitos');
            $("#telefono").focus();
        }

    }
}

function listadoEditorial() {
    $.ajax({
        type: "POST",
        url: "editorial/listado",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped table-bordered' id='tablafiltro' style='width:100%' ><thead>";
            html += "<tr><th scope='col'>Nombre</th><th scope='col'>Telefono</th><th scope='col'>Dirección</th><th scope='col'>Acciones</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['nombre'] + "</td>";
                html += "<td>" + data[key]['telefono'] + "</td>";
                html += "<td>" + data[key]['direccion'] + "</td>";
                html += `<td>
                <a href="#" id="del" value="${data[key]['id_editorial']}" class="btn btn-sm btn-danger" title="Eliminar">
                <i class="fas fa-trash-restore"></i>
                </a>
                <a href="#" id="edit" value="${data[key]['id_editorial']}" class="btn btn-sm btn-success" title="Editar">
                <i class="fas fa-pencil-alt"></i>
                </a>
                </td>`;
            }
            html += "</tr></tbody></table>"
            $("#tablaeditorial").html(html);
            //tabla filtro
            $('#tablafiltro').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                }
            });
        }
    });
}


$(document).on("click", "#edit", function (e) {
    let idEditar = $(this).attr("value");
    $.ajax({
        type: "POST",
        url: "editorial/obtenerID",
        dataType: "json",
        data: { idEditar: idEditar },
        success: function (data) {
            if (data.res == "suc") {
                $("#exampleModal").modal("show");
                $("#id").val(data.post.id_editorial);
                $("#nombre").val(data.post.nombre);
                $("#telefono").val(data.post.telefono);
                $("#dir").val(data.post.direccion);
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
                url: "editorial/eliminar",
                data: { idEliminar: idEliminar },
                success: function (response) {
                    if (response) {
                        listadoEditorial();
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

function limpiar() {
    document.getElementById("id").value = '';
    document.getElementById("nombre").value = '';
    document.getElementById("telefono").value = '';
    document.getElementById("dir").value = '';
    //$("#modaladd")[0].reset();
}

$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $('#nombre').focus();
    })
});

function cantidadInput(data) {
    let length = data.length;
    let c = 0;
    for (var i = 0; i < length; i++) {
        c = c + 1;
    }
    if (c > 9 && c <= 10) {
        return true;
    }else{
        return false;
    }
}