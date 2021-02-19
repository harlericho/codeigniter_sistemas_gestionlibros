<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pais extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Pais_model');
	}
	public function index()
	{
		$this->load->view('principal/pais');
	}
	public function listado()
	{
		echo json_encode($this->Pais_model->get_entries());
	}
	public function insertar()
	{
		$data = $this->input->post();
		$nombre = $this->input->post('nombre');
		if ($this->Pais_model->single_entry(strtoupper($nombre)) == true) {
			echo 0;
		} else {
			$arrayName = array(
				'nombre' => strtoupper($data['nombre']),
			);
			echo $this->Pais_model->insert_entry($arrayName);
		}
	}
	public function eliminar()
	{
		$id = $this->input->post('idEliminar');
		$arrayName = array('estado' => 'I',);
		$this->Pais_model->update_status($arrayName, $id);
		echo 1;
	}
}
