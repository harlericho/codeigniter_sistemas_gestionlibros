<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Genero extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Genero_model');
	}

	public function index()
	{
		$this->load->view('principal/genero');
	}

	public function listado()
	{
		if ($this->input->is_ajax_request()) {
			echo json_encode($this->Genero_model->get_entries());
		}
	}

	public function insertar()
	{
		if ($this->input->is_ajax_request()) {
			$data = $this->input->post();
			$nombre = $this->input->post('nombre');
			if ($this->Genero_model->single_entry(strtoupper($nombre)) == true) {
				echo 0;
			} else {
				$arrayName = array(
					'nombre' => strtoupper($data['nombre']),
					'descripcion' => strtoupper($data['des']),
				);
				echo $this->Genero_model->insert_entry($arrayName);
			}
		}
	}

	public function eliminar()
	{
		if ($this->input->is_ajax_request()) {
			$id = $this->input->post('idEliminar');
			$arrayName = array('estado' => 'I',);
			$this->Genero_model->update_status($arrayName, $id);
			echo 1;
		}
	}
}
