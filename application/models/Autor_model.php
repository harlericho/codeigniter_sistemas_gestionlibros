<?php

class Autor_model extends CI_Model
{

    //Aqui va las sentencias SQL
    public function get_entries()
    {
        //procedimiento almacenado de listado
        $r = $this->db->query("call procedure_listado_autor");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }
    public function get_entries_pais()
    {
        //procedimiento almacenado de listado
        $r = $this->db->query("call procedure_listado_pais");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }
    public function insert_entry($data)
    {

        return $this->db->insert('autor', $data);
    }

    public function single_entry($nombre, $id)
    {
        $sql = "SELECT * FROM autor WHERE nombres = '" . $nombre . "' and  id_pais = '" . $id . "'";
        $query = $this->db->query($sql);
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }
    public function update_status($data, $id)
    {
        return $this->db->update('autor', $data, array('id_autor' => $id));
    }
}
