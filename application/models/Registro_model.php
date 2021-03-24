<?php

class Registro_model extends CI_Model
{

    //Aqui va las sentencias SQL
    public function get_entries()
    {
        $query = $this->db->get('login');
        if (
            count($query->result()) > 0
        ) {
            return $query->result();
        }
    }

    public function insert_entry($data)
    {

        return $this->db->insert('login', $data);
    }

    public function single_entry($email)
    {
        $sql = "SELECT * FROM login WHERE email = '" . $email . "'";
        $query = $this->db->query($sql);
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }
    public function single_entry_login($data)
    {
        $sql = "SELECT * FROM login WHERE email = '" . $data['email'] . "' AND pass='" . $data['pass'] . "'";
        $query = $this->db->query($sql);
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }
    public function get_entry_user($email)
    {
        $this->db->select("*");
        $this->db->from("login");
        $this->db->where("email", $email);
        $query = $this->db->get();
        return $query->row();
    }
}