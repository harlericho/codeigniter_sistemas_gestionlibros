<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Errorv extends CI_Controller {

	public function index()
	{
		$this->load->view('errors/error');
	}
}
