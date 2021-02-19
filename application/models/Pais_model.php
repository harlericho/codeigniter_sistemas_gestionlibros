<?php

class Pais_model extends CI_Model
{

    //Aqui va las sentencias SQL
    public function get_entries()
    {
        //procedimiento almacenado de listado
         $r = $this->db->query("call procedure_listado_pais");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }
    public function insert_entry($data)
    {
        return $this->db->insert('pais', $data);
    }
    public function single_entry($nombre)
    {
        $sql = "SELECT * FROM pais WHERE nombre = '" . $nombre . "'";
        $query = $this->db->query($sql);
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }
    public function update_status($data, $id)
    {
        return $this->db->update('pais', $data, array('id_pais' => $id));
    }
}
