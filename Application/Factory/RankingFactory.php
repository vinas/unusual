<?php
/**
* Ranking Factory Class
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/25
* @version 1.17.0825
* @license SaSeed\license.txt
*/

namespace Application\Factory;

use SaSeed\Handlers\Mapper;
use SaSeed\Handlers\Exceptions;

use Application\Model\RankingEntryModel;
use Application\Model\RankingListItemModel;

class RankingFactory extends \SaSeed\Database\DAO {

    private $db;
    private $queryBuilder;
    private $table;

    public function __construct()
    {
        $this->db = parent::setDatabase('hostinger');
        $this->queryBuilder = parent::setQueryBuilder();
        $this->table = 'game_scores';
    }

    public function getRanking()
    {
        try {
            $this->queryBuilder->select(['gs.id AS id', 'u.name AS name', 'MAX(gs.score) AS score', 'gs.dateTime AS dateTime']);
            $this->queryBuilder->from('game_scores', 'gs');
            $this->queryBuilder->join(
                    ['users', 'u'],
                    'id',
                    '=',
                    'userId',
                    'gs'
                );
            $this->queryBuilder->rawWhere('gs.gameId = 1 GROUP BY gs.userId ORDER BY score * 1 DESC LIMIT 0, 10');
            $res = $this->db->getRows($this->queryBuilder->getQuery());
            for ($i = 0; $i < count($res); $i++) {
                $res[$i] = Mapper::populate(
                        new RankingListItemModel(),
                        $res[$i]
                    );
            }
            return $res;
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }
    }

    public function insert($entry)
    {
        try {
            $this->db->insertRow(
                $this->table,
                array(
                    $entry->getGameId(),
                    $entry->getUserId(),
                    $entry->getLastScore(),
                    $entry->getLastScoreDateTime()
                )
            );
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }
    }
}
