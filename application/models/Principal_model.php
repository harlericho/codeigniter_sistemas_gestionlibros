<?php

class Principal_model extends CI_Model
{

    //Aqui va las sentencias SQL
    public function get_entries()
    {
        //procedimiento almacenado de listado
        $r = $this->db->query("call procedure_listado_libro");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }
    public function get_count_books()
    {
        return $this->db->count_all("libro", false);
    }
    public function get_count_editorial()
    {
        return $this->db->count_all("editorial", false);
    }
    public function get_count_authors()
    {
        return $this->db->count_all("autor", false);
    }
    public function get_count_users()
    {
        return $this->db->count_all("login", false);
    }
}