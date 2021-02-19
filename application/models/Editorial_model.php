<?php

class Editorial_model extends CI_Model
{

    //Aqui va las sentencias SQL
    public function get_entries()
    {
        //procedimiento almacenado de listado
        $r = $this->db->query("call procedure_listado_editorial");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }

    public function insert_entry($data)
    {

        return $this->db->insert('editorial', $data);
    }
    public function update_entry($data)
    {
        return $this->db->update('editorial', $data, array('id_editorial' => $data['id_editorial']));
    }

    public function single_entry($nombre)
    {
        $sql = "SELECT * FROM editorial WHERE nombre = '" . $nombre . "'";
        $query = $this->db->query($sql);
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }

    public function single_entry_id($id)
    {
        $this->db->select("*");
        $this->db->from("editorial");
        $this->db->where("id_editorial", $id);
        $query = $this->db->get();
        if (count($query->result()) > 0) {
            return $query->row();
        }
    }
    public function update_status($data, $id)
    {
        return $this->db->update('editorial', $data, array('id_editorial' => $id));
    }
}
