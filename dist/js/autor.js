$(document).ready(function () {
    listadoAutor();
    selectorPais();
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});

$("#btnGuardar").click(function (e) {
    if (validaciones() == true) {
        let data = $("#autor").serialize();
        console.log(data);
        guardar(data);
    }
    e.preventDefault();
});

function guardar(data) {
    $.ajax({
        type: "POST",
        url: "autor/insertar",
        data: data,
        success: function (response) {
            if (response == 0) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Autor relacionado con ese pais ya existe en la base');
                $("#nombres").focus();
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Autor guardado con exito');
                $("#autor")[0].reset();
                $("#exampleModal").modal("hide");
                listadoAutor();
            }
        }
    });
}

function listadoAutor() {
    $.ajax({
        type: "POST",
        url: "autor/listado",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped table-bordered' id='tablafiltro' style='width:100%' ><thead>";
            html += "<tr><th scope='col'>Nombre</th><th scope='col'>Pais</th><th scope='col'>Acciones</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['autor'] + "</td>";
                html += "<td>" + data[key]['pais'] + "</td>";
                html += `<td>
               <a href="#" id="del" value="${data[key]['id_autor']}" class="btn btn-sm btn-danger" title="Eliminar">
               <i class="fas fa-trash-restore"></i>
               </a>
               </td>`;
            }
            html += "</tr></tbody></table>"
            $("#tablaautor").html(html);
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
                url: "autor/eliminar",
                data: { idEliminar: idEliminar },
                success: function (response) {
                    if (response) {
                        listadoAutor();
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

function selectorPais() {
    $.ajax({
        type: "POST",
        url: "autor/listadoPais",
        dataType: "json",
        success: function (data) {
            html = "<select class='form-control' aria-label='Default select example' id='pais' name='pais' required>";
            html += "<option selected disabled >--Seleccione--</option>";
            for (var key in data) {
                html += `<option value="${data[key]['id_pais']}"> ${data[key]['nombre']}</option>`;
            }
            html += "</select>";
            $("#selectpais").html(html);
        }
    });
}

function validaciones() {
    let pais = $("#pais").val();
    let nombres = $("#nombres").val();
    if ($.trim(pais) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Elegir un pais');
        $("#pais").focus();
    } else if ($.trim(nombres) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un nombre de autor');
        $("#nombres").focus();
    } else {
        return true;
    }
}


$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $('#pais').focus();
    })
});