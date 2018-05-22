<?php
/**
* List Item Model Class
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/06/06
* @version 1.17.0606
* @license SaSeed\license.txt
*/

namespace Application\Model;

class ListItemModel implements \JsonSerializable
{

    private $id;
    private $listId;
    private $name;
    private $status;

    public function setId($id = false) {
        $this->id = $id;
    }
    public function getId() {
        return $this->id;
    }

    public function setListId($listId = false) {
        $this->listId = $listId;
    }
    public function getListId() {
        return $this->listId;
    }

    public function setName($name = false) {
        $this->name = $name;
    }
    public function getName() {
        return $this->name;
    }

    public function setStatus($status = false) {
        $this->status = $status;
    }
    public function getStatus() {
        return $this->status;
    }

    public function listProperties() {
        return array_keys(get_object_vars($this));
    }

    public function JsonSerialize()
    {
        return get_object_vars($this);
    }
}
