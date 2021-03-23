<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Principal extends CI_Controller
{

	public function index()
	{
		$this->load->view('principal/main');
	}
	public function __construct()
	{
		parent::__construct();
		$this->load->model("Principal_model");
	}
	public function listado()
	{
		if ($this->input->is_ajax_request()) {
			echo json_encode($this->Principal_model->get_entries());
		}
	}
	public function libros()
	{
		if ($this->input->is_ajax_request()) {
			$post = $this->Principal_model->get_count_books();
			echo json_encode($post);
		}
	}
	public function editorial()
	{
		if ($this->input->is_ajax_request()) {
			$post = $this->Principal_model->get_count_editorial();
			echo json_encode($post);
		}
	}
	public function autor()
	{
		if ($this->input->is_ajax_request()) {
			$post = $this->Principal_model->get_count_authors();
			echo json_encode($post);
		}
	}
	public function usuarios()
	{
		if ($this->input->is_ajax_request()) {
			$post = $this->Principal_model->get_count_users();
			echo json_encode($post);
		}
	}
}