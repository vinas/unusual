<?php
/**
* Games User Model
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/24
* @version 1.17.0824
* @license SaSeed\license.txt
*/ 

namespace Application\Model;

class GamesUserModel implements \JsonSerializable
{

    private $id;
    private $firstName;
    private $name;
    private $fbId;
    private $picture;

    public function setId($id = false) {
        $this->id = $id;
    }
    public function getId() {
        return $this->id;
    }

    public function setFirstName($firstName = false) {
        $this->firstName = $firstName;
    }
    public function getFirstName() {
        return $this->firstName;
    }

    public function setName($name = false) {
        $this->name = $name;
    }
    public function getName() {
        return $this->name;
    }

    public function setFbId($fbId = false) {
        $this->fbId = $fbId;
    }
    public function getFbId() {
        return $this->fbId;
    }

    public function setPicture($picture = false) {
        $this->picture = $picture;
    }
    public function getPicture() {
        return $this->picture;
    }

    public function listProperties() {
        return array_keys(get_object_vars($this));
    }

    public function JsonSerialize()
    {
        return get_object_vars($this);
    }
}
