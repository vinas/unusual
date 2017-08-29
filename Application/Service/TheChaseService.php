<?php
/**
* The Chase Service
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/24
* @version 1.17.0825
* @license SaSeed\license.txt
*/

namespace Application\Service;

use SaSeed\Handlers\Exceptions;
use SaSeed\Handlers\Mapper;

use Application\Factory\GamesUserFactory;
use Application\Factory\RankingFactory;
use Application\Model\TheChaseSaveParamsModel;
use Application\Model\GamesUserModel;
use Application\Model\RankingEntryModel;

class TheChaseService
{

    public function getRanking()
    {
        try {
            $factory = new RankingFactory();
            return $factory->getRanking();
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }

    }

    public function saveLastScore($saveParams)
    {
        try {
            if ($saveParams) {
                $saveParams = Mapper::populate(new TheChaseSaveParamsModel(), $saveParams);
                $user = $this->updateUserInfo($saveParams);
                $this->updateRanking($saveParams, $user->getId());
                return;
            }
            Exceptions::throwNew(__CLASS__, __FUNCTION__, 'No parameters sent.');
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
            $res = $e->getMessage();
        }
    }

    private function updateUserInfo($params)
    {
        try {
            $factory = new GamesUserFactory();
            $user = Mapper::populate(new GamesUserModel(), $params);
            $found = $factory->getByFbId($user->getFbId());
            if (!$found->getId()) {
                $user = $factory->insert($user);
                return $user;
            }
            $user->setId($found->getId());
            if ($this->isUserDifferent($found, $user)) $factory->update($user);
            return $user;
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }
    }

    private function updateRanking($params, $userId)
    {
        try {
            $ranking = Mapper::populate(new RankingEntryModel(), $params);
            $ranking->setUserId($userId);
            $factory = new RankingFactory();
            $factory->insert($ranking);
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }
    }

    private function isUserDifferent($user1, $user2)
    {
        return $user1->getFirstName() != $user2->getFirstName()
            || $user1->getName() != $user2->getName()
            || $user1->getFbId() != $user2->getFbId()
            || $user1->getPicture() != $user2->getPicture();
    }
}
