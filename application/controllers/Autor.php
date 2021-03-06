<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Autor extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Autor_model');
    }
    public function index()
    {
        if (!$this->session->userdata('logged_in')) {
            redirect('login');
        }
        $this->load->view('principal/autor');
    }
    public function listadoPais()
    {
        if ($this->input->is_ajax_request()) {
            echo json_encode($this->Autor_model->get_entries_pais());
        }
    }
    public function listado()
    {
        if ($this->input->is_ajax_request()) {
            echo json_encode($this->Autor_model->get_entries());
        }
    }
    public function insertar()
    {
        if ($this->input->is_ajax_request()) {
            $data = $this->input->post();
            $nombre = $this->input->post('nombres');
            $pais = $this->input->post('pais');
            if ($this->Autor_model->single_entry(strtoupper($nombre), $pais) == true) {
                echo 0;
            } else {
                $arrayName = array(
                    'id_pais' => $data['pais'],
                    'nombres' => strtoupper($data['nombres']),
                );
                echo $this->Autor_model->insert_entry($arrayName);
            }
        }
    }

    public function eliminar()
    {
        if ($this->input->is_ajax_request()) {
            $id = $this->input->post('idEliminar');
            $arrayName = array('estado' => 'I',);
            $this->Autor_model->update_status($arrayName, $id);
            echo 1;
        }
    }
}