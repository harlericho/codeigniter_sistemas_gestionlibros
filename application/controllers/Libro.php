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
        if (!$this->session->userdata('logged_in')) {
            redirect('login');
        }
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
                $this->load->library('upload', $config);
                $data = $this->input->post();
                //$file = $this->input->post('file', ['tmp_name']);
                $isbn = "ISBN-" . date("Y-m-d H:i:s");
                //$urlimagen = fopen($file, 'w');
                if ($this->upload->do_upload('file')) {
                    $datos = array('upload_data' => $this->upload->data());
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
                } else {
                    $arrayName = array(
                        'id_editorial' => $data['editorial'],
                        'id_autor' => $data['autor'],
                        'id_genero' => $data['genero'],
                        'isbn' => $isbn,
                        'titulo' => strtoupper($data['titulo']),
                        'descripcion' => strtoupper($data['des']),
                        'edicion' => strtoupper($data['edi']),
                        'ann' => $data['ann'],
                        //'portada' => $datos['upload_data']['file_name'],
                        'precio_v' => $data['precio'],
                    );
                    echo $this->Libro_model->insert_entry($arrayName);
                }
            }
        }
    }

    public function actualizar()
    {
        if ($this->input->is_ajax_request()) {
            $config = [
                'upload_path' => './dist/images/uploads',
                'allowed_types' => 'png|jpg|jpeg'
            ];
            //if ($this->Libro_model->single_entry_titulo_editorial($this->input->post('titulo'), $this->input->post('editorial')) == true) {
            //    echo 0;
            //} else {
            $this->load->library('upload', $config);
            if ($this->upload->do_upload('file')) {
                $data = $this->input->post();
                $link = $this->Libro_model->uploadImage($this->input->post('id'));
                unlink("./dist/images/uploads/" . $link->portada);
                $datos = array('upload_data' => $this->upload->data());
                $arrayName = array(
                    "id_libro" => $data['id'],
                    'id_editorial' => $data['editorial'],
                    'id_autor' => $data['autor'],
                    'id_genero' => $data['genero'],
                    'titulo' => strtoupper($data['titulo']),
                    'descripcion' => strtoupper($data['des']),
                    'edicion' => strtoupper($data['edi']),
                    'ann' => $data['ann'],
                    'portada' => $datos['upload_data']['file_name'],
                    'precio_v' => $data['precio'],
                );
                echo $this->Libro_model->update_entry($arrayName);
            } else {
                $data = $this->input->post();
                $arrayName = array(
                    "id_libro" => $data['id'],
                    'id_editorial' => $data['editorial'],
                    'id_autor' => $data['autor'],
                    'id_genero' => $data['genero'],
                    'titulo' => strtoupper($data['titulo']),
                    'descripcion' => strtoupper($data['des']),
                    'edicion' => strtoupper($data['edi']),
                    'ann' => $data['ann'],
                    // 'portada' => $datos['upload_data']['file_name'],
                    'precio_v' => $data['precio'],
                );
                echo $this->Libro_model->update_entry($arrayName);
            }
            //}
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

    public function obtenerID()
    {
        if ($this->input->is_ajax_request()) {
            $data = $this->input->post('idEditar');
            $post = $this->Libro_model->single_entry_id($data);
            $arrayName = array(
                'res' => 'suc',
                'post' => $post
            );
            echo json_encode($arrayName);
        }
    }
}