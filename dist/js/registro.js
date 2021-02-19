$(document).ready(function () {

});

$("#btnCrear").click(function (e) {
    if (validaciones() == true) {
        let data = $("#registro").serialize();
        guardar(data);
    }
    e.preventDefault();
});

function guardar(data) {
    $.ajax({
        type: "POST",
        url: "registro/insertar",
        data: data,
        success: function (response) {
            if (response == 0) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Email ya existe en la base');
                $("#email").focus();
            } else {
                $("#registro")[0].reset();
                $("#nombres").focus();
                grecaptcha.reset();
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Usuario creado con exito');
            }
        }
    });
}

function validaciones() {
    let nombre = $("#nombres").val();
    let email = $("#email").val();
    let contra = $("#contra").val();
    let recontra = $("#recontra").val();
    let response = grecaptcha.getResponse();
    if ($.trim(nombre) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese su nombres');
        $("#nombres").focus();
    } else if ($.trim(email) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese su email');
        $("#email").focus();
    } else if ($.trim(contra) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una contraseña');
        $("#contra").focus();
    } else if ($.trim(recontra) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Repita la contraseña');
        $("#recontra").focus();
    } else if ($.trim(email) != "") {
        if (validarEmail(email) == true) {
            if (contra === recontra) {
                if (response.length != 0) {
                    return true;
                } else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.warning('Eliga el recaptcha');
                    return false;
                }
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Contraseñas no son iguales');
                $("#recontra").focus();
            }
        } else {
            return false;
        }
    }
}



function validarEmail(valor) {
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(valor)) {
        return true;
    } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Formato de email es erroneo');
        $("#email").focus();
        return false;
    }
}