$(document).ready(function () {
    listadoGenero();
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});


$("#btnGuardar").click(function (e) {
    if (validaciones() == true) {
        let data = $("#genero").serialize();
        //console.log(data);
        guardar(data);
    }
    e.preventDefault();
});


function guardar(data) {
    $.ajax({
        type: "POST",
        url: "genero/insertar",
        data: data,
        success: function (response) {
            if (response == 0) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Genero ya existe en la base');
                $("#nombre").focus();
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Genero guardado con exito');
                $("#genero")[0].reset();
                $("#exampleModal").modal("hide");
                listadoGenero();
            }
        }
    });
}


function validaciones() {
    let nombre = $("#nombre").val();
    let des = $("#des").val();
    if ($.trim(nombre) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un nombre de genero');
        $("#nombre").focus();
    } else if ($.trim(des) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una descripción');
        $("#des").focus();
    } else {
        return true;
    }
}

function listadoGenero() {
    $.ajax({
        type: "POST",
        url: "genero/listado",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped table-bordered' id='tablafiltro' style='width:100%' ><thead>";
            html += "<tr><th scope='col'>Nombre</th><th scope='col'>Descripción</th><th scope='col'>Acciones</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['nombre'] + "</td>";
                html += "<td>" + data[key]['descripcion'] + "</td>";
                html += `<td>
               <a href="#" id="del" value="${data[key]['id_genero']}" class="btn btn-sm btn-danger" title="Eliminar">
               <i class="fas fa-trash-restore"></i>
               </a>
               </td>`;
            }
            html += "</tr></tbody></table>"
            $("#tablagenero").html(html);
            //tabla filtro
            $('#tablafiltro').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                }
            });
        }
    });
}


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
                url: "genero/eliminar",
                data: { idEliminar: idEliminar },
                success: function (response) {
                    if (response) {
                        listadoGenero();
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




$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $('#nombre').focus();
    })
});
