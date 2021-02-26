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
    public function listadoPais()
    {
        echo json_encode($this->Libro_model->get_entries_pais());
    }
    public function listadoEditorial()
    {
        echo json_encode($this->Libro_model->get_entries_editorial());
    }
    public function listadoGenero()
    {
        echo json_encode($this->Libro_model->get_entries_genero());
    }
    public function insertar()
    {

        //$data = $this->input->post();
        //$file = $this->input->post('file', ['tmp_name']);
        //$isbn = "ISBN-" . date("Y-m-d H:i:s");
        //$urlimagen = fopen($file, 'w');
        /*
        $arrayName = array(
            'id_editorial' => $data['editorial'],
            'id_pais' => $data['pais'],
            'id_genero' => $data['genero'],
            'isbn' => $isbn,
            'titulo' => $data['titulo'],
            'descripcion' => $data['des'],
            'editorial' => $data['edi'],
            'ann' => $data['ann'],
            'precio_v' => $data['precio'],
        );
        echo $this->Libro_model->insert_entry($arrayName);
        */
    }
}
