<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Registro extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Registro_model');
	}
	public function index()
	{
		$this->load->view('login/registro');
	}

	public function insertar()
	{
		$data = $this->input->post();
		$email = $this->input->post('email');
		if ($this->Registro_model->single_entry($email) == true) {
			echo 0;
		} else {
			$arrayName = array(
				'nombres' => $data['nombres'],
				'email' => strtolower($data['email']),
				'pass' => md5($data['recontra']),
			);

			$captcha = $_POST['g-recaptcha-response'];
			$secret = '6LeP6zQaAAAAAPsf1SfzK5yNvaDo6_KWX2XfZil7';
			$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$captcha");
			$response = json_decode($response);
			if ($response->success) {
				echo $this->Registro_model->insert_entry($arrayName);
			}
		}
	}
}
