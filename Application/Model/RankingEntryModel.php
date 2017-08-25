<?php
/**
* Ranking Entry Model
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/24
* @version 1.17.0824
* @license SaSeed\license.txt
*/ 

namespace Application\Model;

class RankingEntryModel implements \JsonSerializable
{

    private $gameId;
    private $userId;
    private $lastScore;
    private $lastScoreDateTime;

    public function setGameId($gameId = false) {
        $this->gameId = $gameId;
    }
    public function getGameId() {
        return $this->gameId;
    }

    public function setUserId($userId = false) {
        $this->userId = $userId;
    }
    public function getUserId() {
        return $this->userId;
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
