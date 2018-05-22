<?php
/**
* Lists Service Class
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/06/06
* @version 1.17.0606
* @license SaSeed\license.txt
*/

namespace Application\Service;

use SaSeed\Handlers\Exceptions;

use Application\Factory\ListsFactory;
use Application\Factory\ListTypesFactory;
use Application\Factory\ListItemsFactory;

use Application\Model\ListReturnModel;

class ListsService {


	public function __construct()
	{
	}

	public function getListTypes()
	{
		$listTypes = [];
		try {
			$factory = new ListTypesFactory();
			$listTypes = $factory->listAllOrderById();
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $listTypes;
		}
	}

	public function getListsByTypeId($typeId)
	{
		$lists = [];
		try {
			$factory = new ListsFactory();
			$lists = $factory->listAllByTypeIdOrderByName($typeId);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $lists;
		}
	}

	public function getListById($listId)
	{
		$listReturn = new ListReturnModel();
		try {
			$listsFactory = new ListsFactory();
			$itemsFactory = new ListItemsFactory();
			$typeFactory = new ListTypesFactory();
			$list = $listsFactory->getById($listId);
			$type = $typeFactory->getById($list->getTypeId());
			$items = $itemsFactory->listByListIdOrderByDate($listId);
			$listReturn = $this->populateListReturnInfo($listReturn, $type, $list, $items);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		} finally {
			return $listReturn;
		}
	}

	public function eraseItem($itemId)
	{
		try {
			$itemsFactory = new ListItemsFactory();
			$itemsFactory->deleteListItemById($itemId);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}

	public function eraseListAndItem($listId)
	{
		try {
			$itemsFactory = new ListItemsFactory();
			$listsFactory = new ListsFactory();
			$itemsFactory->deleteListItemsByListId($listId);
			$listsFactory->deleteListById($listId);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}

	public function saveNewList($list)
	{
		try {
			$listsFactory = new ListsFactory();
			$listsFactory->saveNew($list);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}

	public function saveNewListItem($listItem)
	{
		try {
			$itemsFactory = new ListItemsFactory();
			$itemsFactory->saveNew($listItem);
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
		}
	}

	private function populateListReturnInfo($listInfo, $type = false, $list = false, $items = false)
	{
		$listInfo->setType($type->getName());
		$listInfo->setId($list->getId());
		$listInfo->setName($list->getName());
		$listInfo->setStatus($list->getStatus());
		$listInfo->setItems($items);
		return $listInfo;
	}
}
