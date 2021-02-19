<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Gestion Libros</title>
    <link href="<?php echo base_url('dist/images/favicon.ico') ?>" rel="icon">
    <link href="<?php echo base_url('dist/css/styles.css') ?>" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
</head>

<body class="bg-primary">
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4"><img src="<?php echo base_url('dist/images/logo.ico') ?>" width="50" height="50"> Crear cuenta</h3>
                                </div>
                                <div class="card-body">
                                    <form id="registro" method="POST">
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="nombres">Nombres</label>
                                                    <input class="form-control py-4" id="nombres" name="nombres" type="text" placeholder="nombres" autofocus />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="email">Email</label>
                                                    <input class="form-control py-4" id="email" name="email" type="email" aria-describedby="emailHelp" placeholder="xyz@dominio.com" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="contra">Contraseña</label>
                                                    <input class="form-control py-4" id="contra" name="contra" type="password" placeholder="*******" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="recontra">Confirmar contraseña</label>
                                                    <input class="form-control py-4" id="recontra" name="recontra" type="password" placeholder="******" />
                                                </div>
                                            </div>
                                            <div class="g-recaptcha" id="catpcha" data-sitekey="6LeP6zQaAAAAAJgJf9BOktbUafwj84fiH5JBHONB"></div>
                                        </div>
                                        <div class="form-group mt-4 mb-0"><a class="btn btn-primary btn-block" id="btnCrear">Crear</a></div>
                                    </form>
                                </div>
                                <div class="card-footer text-center">
                                    <div class="small"><a href="<?php echo base_url('login') ?>">Ir a login</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div id="layoutAuthentication_footer">
            <footer class="py-2 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; CarlChokSanc 2021</div>
                        <div>
                            <a href="#">Privacidad Politica</a>
                            &middot;
                            <a href="#">Terminos &amp; Condiciones</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>


    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="<?php echo base_url('dist/js/scripts.js') ?>"></script>
    <script src="<?php echo base_url('dist/js/registro.js') ?>"></script>
</body>

</html>