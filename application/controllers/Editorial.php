<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Editorial extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Editorial_model');
    }
    public function index()
    {
        $this->load->view('principal/editorial');
    }
    public function listado()
    {
        echo json_encode($this->Editorial_model->get_entries());
    }
    public function insertar()
    {
        $data = $this->input->post();
        $nombre = $this->input->post('nombre');
        if ($this->Editorial_model->single_entry(strtoupper($nombre)) == true) {
            echo 0;
        } else {
            $arrayName = array(
                'nombre' => strtoupper($data['nombre']),
                'telefono' => $data['telefono'],
                'direccion' => strtoupper($data['dir']),
            );
            echo $this->Editorial_model->insert_entry($arrayName);
        }
    }

    public function actualizar()
    {
        $data = $this->input->post();
        $arrayName = array(
            'id_editorial' => $data['id'],
            'nombre' => strtoupper($data['nombre']),
            'telefono' => $data['telefono'],
            'direccion' => strtoupper($data['dir']),
        );
        $this->Editorial_model->update_entry($arrayName);
        echo 1;
    }

    public function obtenerID()
    {

        $data = $this->input->post('idEditar');
        $post = $this->Editorial_model->single_entry_id($data);
        $arrayName = array(
            'res' => 'suc',
            'post' => $post
        );
        echo json_encode($arrayName);
    }

    public function eliminar()
    {
        $id = $this->input->post('idEliminar');
        $arrayName = array('estado' => 'I',);
        $this->Editorial_model->update_status($arrayName, $id);
        echo 1;
    }
}
