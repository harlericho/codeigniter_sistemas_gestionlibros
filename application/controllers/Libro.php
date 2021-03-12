<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Libro extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Libro_model');
    }
    public function index()
    {
        $this->load->view('principal/libro');
    }
    public function listado()
    {
        if ($this->input->is_ajax_request()) {
            echo json_encode($this->Libro_model->get_entries());
        }
    }
    public function listadoAutor()
    {
        if ($this->input->is_ajax_request()) {
            echo json_encode($this->Libro_model->get_entries_autor());
        }
    }
    public function listadoEditorial()
    {
        if ($this->input->is_ajax_request()) {
            echo json_encode($this->Libro_model->get_entries_editorial());
        }
    }
    public function listadoGenero()
    {
        if ($this->input->is_ajax_request()) {
            echo json_encode($this->Libro_model->get_entries_genero());
        }
    }
    public function insertar()
    {
        if ($this->input->is_ajax_request()) {
            $config = [
                'upload_path' => './dist/images/uploads',
                'allowed_types' => 'png|jpg|jpeg'
            ];
            if ($this->Libro_model->single_entry_titulo_editorial($this->input->post('titulo'), $this->input->post('editorial')) == true) {
                echo 0;
            } else {
                //echo 1;
                $this->load->library('upload', $config);
                if ($this->upload->do_upload('file')) {
                    $datos = array('upload_data' => $this->upload->data());
                    $data = $this->input->post();
                    //$file = $this->input->post('file', ['tmp_name']);
                    $isbn = "ISBN-" . date("Y-m-d H:i:s");
                    //$urlimagen = fopen($file, 'w');

                    $arrayName = array(
                        'id_editorial' => $data['editorial'],
                        'id_autor' => $data['autor'],
                        'id_genero' => $data['genero'],
                        'isbn' => $isbn,
                        'titulo' => strtoupper($data['titulo']),
                        'descripcion' => strtoupper($data['des']),
                        'edicion' => strtoupper($data['edi']),
                        'ann' => $data['ann'],
                        'portada' => $datos['upload_data']['file_name'],
                        'precio_v' => $data['precio'],
                    );
                    echo $this->Libro_model->insert_entry($arrayName);
                }
            }
        }
    }


    public function eliminar()
    {
        if ($this->input->is_ajax_request()) {
            $id = $this->input->post('idEliminar');
            $arrayName = array('estado' => 'I',);
            $this->Libro_model->update_status($arrayName, $id);
            echo 1;
        }
    }
}
