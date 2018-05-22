<?php
/**
* Lists Return Model Class
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/06/06
* @version 1.17.0606
* @license SaSeed\license.txt
*/

namespace Application\Model;

class ListReturnModel implements \JsonSerializable
{

    private $id;
    private $type;
    private $name;
    private $status;
    private $items;

    public function setId($id = false) {
        $this->id = $id;
    }
    public function getId() {
        return $this->id;
    }

    public function setType($type = false) {
        $this->type = $type;
    }
    public function getType() {
        return $this->type;
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

    public function setItems($items = false) {
        $this->items = $items;
    }
    public function getItems() {
        return $this->items;
    }

    public function listProperties() {
        return array_keys(get_object_vars($this));
    }

    public function JsonSerialize()
    {
        return get_object_vars($this);
    }
}
