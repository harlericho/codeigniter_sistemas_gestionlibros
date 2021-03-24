$(document).ready(function () {


});
$('#btnIngresar').click(function (e) {
    if (validaciones() == true) {
        let data = $("#login").serialize();
        login(data);
    }

    e.preventDefault();
});

function login(data) {
    $.ajax({
        type: "POST",
        url: "login/logeo",
        data: data,
        success: function (r) {
            if (r == 0) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Usuario no existe, revise email o contraseña!!');
                $('#email').focus();
            } else if (r == 1) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Bienvenido al sistema');
                setTimeout("redirectMain()", 1000);
            }
        }
    });
}

function redirectMain() {
    window.location.href = "principal";
}

function validaciones() {
    let email = $('#email').val();
    let pass = $('#pass').val();
    if ($.trim(email) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese un email');
        $("#email").focus();
    } else if ($.trim(pass) == "") {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Ingrese una contraseña');
        $("#pass").focus();
    } else {
        if (validarEmail(email) == true) {
            return true;
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