<?php
/**
* Ranking List Item Model
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/24
* @version 1.17.0824
* @license SaSeed\license.txt
*/ 

namespace Application\Model;

class RankingListItemModel implements \JsonSerializable
{

    private $id;
    private $name;
    private $score;
    private $dateTime;

    public function setId($id = false) {
        $this->id = $id;
    }
    public function getId() {
        return $this->id;
    }

    public function setName($name = false) {
        $this->name = $name;
    }
    public function getName() {
        return $this->name;
    }

    public function setScore($score = false) {
        $this->score = $score;
    }
    public function getScore() {
        return $this->score;
    }

    public function setDateTime($dateTime = false) {
        $this->dateTime = $dateTime;
    }
    public function getDateTime() {
        return $this->dateTime;
    }

    public function listProperties() {
        return array_keys(get_object_vars($this));
    }

    public function JsonSerialize()
    {
        return get_object_vars($this);
    }
}
