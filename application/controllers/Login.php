<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{

	public function index()
	{
		$this->load->view('login/login');
	}
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Registro_model');
	}
	public function logeo()
	{
		if ($this->input->is_ajax_request()) {
			$data = $this->input->post();
			$arrayName = array(
				'email' => strtolower($data['email']),
				'pass' => md5($data['pass'])
			);
			if ($this->Registro_model->single_entry_login($arrayName) == true) {
				$list = $this->Registro_model->get_entry_user(strtolower($data['email']));
				$arrayName1 = array(
					'email' => $list->email,
					'nombres' => $list->nombres,
					'logged_in' => TRUE
				);
				$this->session->set_userdata($arrayName1);
				echo 1;
			} else {
				echo 0;
			}
		}
	}

	public function out()
	{
		//if ($this->input->is_ajax_request()) {
		$this->session->sess_destroy();
		redirect('login');
		//}
	}
}