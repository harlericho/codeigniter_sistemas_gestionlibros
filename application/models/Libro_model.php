<?php

class Libro_model extends CI_Model
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
    public function get_entries_autor()
    {
        //procedimiento almacenado de listado
        $r = $this->db->query("call procedure_listado_autor_libro");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }
    public function get_entries_editorial()
    {
        //procedimiento almacenado de listado
        $r = $this->db->query("call procedure_listado_editorial");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }
    public function get_entries_genero()
    {
        //procedimiento almacenado de listado
        $r = $this->db->query("call procedure_listado_genero");
        if (count($r->result()) > 0) {
            return $r->result();
        }
    }
    public function insert_entry($data)
    {

        return $this->db->insert('libro', $data);
    }
    public function update_entry($data)
    {
        return $this->db->update('libro', $data, array('id_libro' => $data['id_libro']));
    }

    public function single_entry_titulo_editorial($nombre, $editorial)
    {
        $sql = "SELECT * FROM libro WHERE titulo = '" . $nombre . "' and id_editorial= '.$editorial.' and estado='A'";
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
        $this->db->from("libro");
        $this->db->where("id_libro", $id);
        $query = $this->db->get();
        if (count($query->result()) > 0) {
            return $query->row();
        }
    }
    public function update_status($data, $id)
    {
        return $this->db->update('libro', $data, array('id_libro' => $id));
    }
    public function uploadImage($id)
    {
        $this->db->select("portada");
        $this->db->from("libro");
        $this->db->where("id_libro", $id);
        $query = $this->db->get();
        return $query->row();
    }
}