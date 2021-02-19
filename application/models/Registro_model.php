<?php

class Registro_model extends CI_Model
{

    //Aqui va las sentencias SQL

    public function insert_entry($data)
    {

        return $this->db->insert('login', $data);
    }

    public function single_entry($email)
    {
        $sql = "SELECT * FROM login WHERE email = '" . $email. "'";
        $query = $this->db->query($sql);
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }
}
