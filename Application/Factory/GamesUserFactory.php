<?php
/**
* Games User Factory Class
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/24
* @version 1.17.0825
* @license SaSeed\license.txt
*/

namespace Application\Factory;

use SaSeed\Handlers\Mapper;
use SaSeed\Handlers\Exceptions;

use Application\Model\GamesUserModel;

class GamesUserFactory extends \SaSeed\Database\DAO {

	private $db;
	private $queryBuilder;

	public function __construct()
	{
		$this->db = parent::setDatabase('hostinger');
		$this->queryBuilder = parent::setQueryBuilder();
	}

	public function insert($user)
	{
		try {
			$this->db->insertRow(
				'users',
				array(
					$user->getFbId(),
					$user->getFirstName(),
					$user->getName(),
					$user->getPicture()
				)
			);
			$user->setId($this->db->lastId());
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}

	public function update($user)
	{
		try {
			if (!$user->getId()) {
				Exceptions::throwNew(
					__CLASS__,
					__FUNCTION__,
					'No user Id informed.'
				);
				return false;
			}
			$this->db->update(
				'users',
				array(
					$user->getFbId(),
					$user->getFirstName(),
					$user->getName(),
					$user->getPicture()
				),
				array(
					'fbId',
					'firstName',
					'name',
					'picture'
				),
				['id', '=', $user->getId()]
			);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}

	public function getById($id) {
		$user = new GamesUserModel();
		try {
			$this->queryBuilder->from('users');
			$this->queryBuilder->where([
				'id',
				'=',
				$id
			]);
			Mapper::populate(
				$user,
				$this->db->getRow($this->queryBuilder->getQuery())
			);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $user;
		}
	}

	public function getByFbId($fbId) {
		$user = new GamesUserModel();
		try {
			$this->queryBuilder->from('users');
			$this->queryBuilder->where([
				'fbId',
				'=',
				$fbId
			]);
			Mapper::populate(
				$user,
				$this->db->getRow($this->queryBuilder->getQuery())
			);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $user;
		}
	}

	/*public function getById($userId = false)
	{
		$user = new UserModel();
		try {
			$this->queryBuilder->from($this->table);
			$this->queryBuilder->where([
					'id',
					'=',
					$userId,
					$this->queryBuilder->getMainTableAlias()
				]);
			$user = Mapper::populate(
					$user,
					$this->db->getRow($this->queryBuilder->getQuery())
				);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $user;
		}
	}

	public function listAll()
	{
		$users = [];
		try {
			$this->queryBuilder->from($this->table);
			$users = $this->db->getRows($this->queryBuilder->getQuery());
			for ($i = 0; $i < count($users); $i++) {
				$users[$i] = Mapper::populate(
						new UserModel(),
						$users[$i]
					);
			}
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $users;
		}
	}

	public function listAllOrderByName()
	{
		$users = [];
		try {
			$this->queryBuilder->from($this->table);
			$this->queryBuilder->orderBy('name');
			$users = $this->db->getRows($this->queryBuilder->getQuery());
			for ($i = 0; $i < count($users); $i++) {
				$users[$i] = Mapper::populate(
						new UserModel(),
						$users[$i]
					);
			}
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $users;
		}
	}

	public function saveNew($user)
	{
		try {
			$this->db->insertRow(
				$this->table,
				array(
					$user->getName(),
					$user->getEmail()
				)
			);
			$user->setId($this->db->lastId());
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $user;
		}
	}

	public function deleteUser($user)
	{
		try {
			$this->deleteUserById($user->getId());
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}

	public function deleteUserById($userId)
	{
		try {
			$this->db->deleteRow($this->table, ['id', '=', $userId]);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}*/
}
