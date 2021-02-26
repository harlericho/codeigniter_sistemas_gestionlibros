$(document).ready(function () {
    selectorEditorial();
    selectorPais();
    selectorGenero();
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});

function selectorPais() {
    $.ajax({
        type: "POST",
        url: "libro/listadoPais",
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


$("#btnGuardar").click(function (e) {
    if (validaciones() == true) {
        let data = new FormData($("#libro")[0]);
        console.log(data);
        guardar(data);
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
            if (response) {
                console.log(response);
            }
        }
    });
}

function validaciones() {
    let pais = $("#pais").val();
    let edit = $("#editorial").val();
    let gen = $("#genero").val();
    let titulo = $("#titulo").val();
    let des = $("#des").val();
    let edic = $("#edi").val();
    let ann = $("#ann").val();
    let file = $("#file").val();
    let precio = $("#precio").val();
    if ($.trim(edit) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Elegir una editorial');
        $("#editorial").focus();
    } else if ($.trim(pais) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Elegir un pais ');
        $("#pais").focus();
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
    } else if ($.trim(file) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una imagen');
        $("#file").focus();
    } else if ($.trim(precio) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un precio venta');
        $("#precio").focus();
    } else {
        return true;
    }
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
