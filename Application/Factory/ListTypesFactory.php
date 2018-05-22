<?php
/**
* Lists Types Factory Class
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/06/06
* @version 1.17.0606
* @license SaSeed\license.txt
*/

namespace Application\Factory;

use SaSeed\Handlers\Mapper;
use SaSeed\Handlers\Exceptions;

use Application\Model\ListTypeModel;

class ListTypesFactory extends \SaSeed\Database\DAO {

    private $db;
    private $queryBuilder;
    private $table = 'list_type';

    public function __construct()
    {
        $this->db = parent::setDatabase('lista');
        $this->queryBuilder = parent::setQueryBuilder();
    }

    public function listAllOrderByName()
    {
        $listTypes = [];
        try {
            $this->queryBuilder->from($this->table);
            $this->queryBuilder->orderBy('name');
            $listTypes = $this->db->getRows($this->queryBuilder->getQuery());
            for ($i = 0; $i < count($listTypes); $i++) {
                $listTypes[$i] = Mapper::populate(
                        new ListTypeModel(),
                        $listTypes[$i]
                    );
            }
        } catch (Exception $e) {

            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        } finally {
            return $listTypes;
        }
    }

    public function listAllOrderById()
    {
        $listTypes = [];
        try {
            $this->queryBuilder->from($this->table);
            $this->queryBuilder->orderBy('id');
            $listTypes = $this->db->getRows($this->queryBuilder->getQuery());
            for ($i = 0; $i < count($listTypes); $i++) {
                $listTypes[$i] = Mapper::populate(
                        new ListTypeModel(),
                        $listTypes[$i]
                    );
            }
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        } finally {
            return $listTypes;
        }
    }

    public function getById($typeId = false)
    {
        $listType = new ListTypeModel();
        try {
            $this->queryBuilder->from($this->table);
            $this->queryBuilder->where([
                    'id',
                    '=',
                    $typeId
                ]);
            $listType = Mapper::populate(
                    $listType,
                    $this->db->getRow($this->queryBuilder->getQuery())
                );
        } catch (Exception $e) {
            Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
        } finally {
            return $listType;
        }
    }}
