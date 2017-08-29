<?php
/**
* The Chse Save Params Model
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/24
* @version 1.17.0824
* @license SaSeed\license.txt
*/ 

namespace Application\Model;

class TheChaseSaveParamsModel implements \JsonSerializable
{

    private $firstName;
    private $name;
    private $fbId;
    private $gameId;
    private $picture;
    private $lastScore;
    private $lastScoreDateTime;

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

	public function setGameId($gameId = false) {
		$this->gameId = $gameId;
	}
	public function getGameId() {
		return $this->gameId;
	}

	public function setPicture($picture = false) {
		$this->picture = $picture;
	}
	public function getPicture() {
		return $this->picture;
	}

	public function setLastScore($lastScore = false) {
		$this->lastScore = $lastScore;
	}
	public function getLastScore() {
		return $this->lastScore;
	}

	public function setlastScoreDateTime($lastScoreDateTime = false) {
		$this->lastScoreDateTime = $lastScoreDateTime;
	}
	public function getlastScoreDateTime() {
		return $this->lastScoreDateTime;
	}

	public function listProperties() {
		return array_keys(get_object_vars($this));
	}

	public function JsonSerialize()
	{
		return get_object_vars($this);
	}
}
