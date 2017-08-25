<?php
/**
* Games Controller
*
* @author Vinas de Andrade <vinas.andrade@gmail.com>
* @since 2017/08/24
* @version 1.17.0824
* @license SaSeed\license.txt
*/

namespace Application\Controller;

use SaSeed\Output\RestView;
use SaSeed\Handlers\Exceptions;

use Application\Service\TheChaseService;

class GamesController
{
	private $params;

	public function __construct($params)
	{
		$this->params = $params;
	}

	public function saveLastScore()
	{
		$res = false;
		try {
			if ($this->params['gameId'] == 1) {
				$service = new TheChaseService();
			}
			$service->saveLastScore($this->params);
			$res = (object) array('status' => 'saved');
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
			$res = $e->getMessage();
		} finally {
			RestView::render($res);
		}
	}

	public function getRanking()
	{
		$res = false;
		try {
			if ($this->params[0] == 1) {
				$service = new TheChaseService();
			}
			$res = $service->getRanking();
		} catch (Exception $e) {
			Exceptions::throwing(__CLASS__, __FUNCTION__, $e);
			$res = $e->getMessage();
		} finally {
			RestView::render($res);
		}
	}
}
