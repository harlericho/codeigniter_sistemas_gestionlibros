<?php $this->load->view('templates/header'); ?>

<body class="sb-nav-fixed">
    <?php $this->load->view('templates/nav'); ?>
    <div id="layoutSidenav">
        <?php $this->load->view('templates/secciones'); ?>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid">
                    <h1 class="mt-4">Secciones</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Libros</li>
                    </ol>
                    <div class="breadcrumb mb-4">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-plus"></i> Agregar nuevo registro
                        </button>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                            Registro de libros
                        </div>
                        <div class="card-body">
                            <div class="table-responsive" id="tablaeditorial">
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div class="card-body">
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-book"></i> Nuevo libro</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="libro" enctype='multipart/form-data'>
                                    <input type="hidden" id="id" name="id">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="ediccion">Editorial</label>
                                            <div id="selecteditorial"></div>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="pais">Pais</label>
                                            <div id="selectpais"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="genero">Genero</label>
                                            <div id="selectgenero"></div>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="titulo">Titulo</label>
                                            <input type="text" class="form-control" id="titulo" name="titulo" required>
                                        </div>
                                    </div>
                                    <!-- ------------------------------ -->
                                    <div class="form-group">
                                        <label for="nombre">Descripcion</label>
                                        <input type="text" class="form-control" id="des" name="des" required>
                                    </div>
                                    <!-- ------------------------------ -->
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="dir">Edicción</label>
                                            <input type="text" class="form-control" id="edi" name="edi" required>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="dir">Año</label>
                                            <input type="number" class="form-control" id="ann" name="ann" required>
                                        </div>
                                    </div>
                                    <!-- ------------------------------ -->
                                    <div class="form-group">
                                        <label for="dir">Portada</label>
                                        <input type="file" class="form-control" id="file" name="file" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="dir">Precio venta</label>
                                        <input type="text" class="form-control decimales" id="precio" name="precio" required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fas fa-times-circle"></i> Cerrar</button>
                                <button type="button" class="btn btn-primary" id="btnGuardar"><i class="fas fa-save"></i> Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    <?php $this->load->view('templates/footer'); ?>
    <script src="<?php echo base_url('dist/js/libro.js') ?>"></script>
</body>