<?php
/**
* List Items Factory Class
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/06/06
* @version 1.17.0606
* @license SaSeed\license.txt
*/

namespace Application\Factory;

use SaSeed\Handlers\Mapper;
use SaSeed\Handlers\Exceptions;

use Application\Model\ListItemModel;

class ListItemsFactory extends \SaSeed\Database\DAO {

    private $db;
    private $queryBuilder;
    private $table = 'list_items';

    public function __construct()
    {
        $this->db = parent::setDatabase('lista');
        $this->queryBuilder = parent::setQueryBuilder();
    }

    public function listByListIdOrderByDate($listId)
    {
        $list = [];
        try {
            $this->queryBuilder->from($this->table);
            $this->queryBuilder->where(['listId', '=', $listId]);
            $this->queryBuilder->orderBy('id DESC');
            $list = $this->db->getRows($this->queryBuilder->getQuery());
            for ($i = 0; $i < count($list); $i++) {
                $list[$i] = Mapper::populate(
                        new ListItemModel(),
                        $list[$i]
                    );
            }
        } catch (Exception $e) {
            print_r($e->getMessage());
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        } finally {
            return $list;
        }
    }

    public function deleteListItemById($itemId)
    {
        try {
            $this->db->deleteRow($this->table, ['id', '=', $itemId]);
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }
    }

    public function deleteListItemsByListId($listId)
    {
        try {
            $this->db->deleteRow($this->table, ['listId', '=', $listId]);
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }
    }

    public function saveNew($listItem)
    {
        try {
            $this->db->insertRow(
                $this->table,
                array(
                    $listItem->getListId(),
                    $listItem->getName(),
                    true
                )
            );
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        }
    }
}
