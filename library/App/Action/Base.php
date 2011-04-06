<?php

namespace App\Action;

/**
 * Base class for Actions
 * Implements a few helper methods
 *
 * @category FBTUM
 * @package App
 */
abstract class Base implements iAction
{
    /**
     * @var boolean
     */
    protected $isAjax = false;

    /**
	 * @return \App\Facebook\Client
	 */
	public function getFacebookClient()
	{
		return \Zend_Registry::get('facebook');
	}
	
	/**
	 * @return App/Template/Engine
	 */
	public function getTplEngine()
	{
		$tpl = \Zend_Registry::get('tplengine');
		return $tpl;
	}
	
	/**
	 * @return \Inspekt
	 */
	public function getInspekt()
	{
		return \Zend_Registry::get('input');
	}

    /**
     * Redirects processment to ErrorAction
     *
     * @param \Exception $e
     * @param boolean $isAjax
     */
    public function redirectToError($e, $isAjax = false)
    {

        $error = new ErrorAction();
        $error->setIsAjax($isAjax);
        $error->setError($e);
        $error->run();

    }

    public function getIsAjax()
    {
        return $this->isAjax;
    }

    public function setIsAjax($isAjax)
    {
        $this->isAjax = $isAjax;
    }

    /**
     * Verifies if AppID and Secret are set
     *
     * @return boolean
     */
    protected function checkTokens()
    {
        if (!\defined('FACEBOOK_APP_ID') || !\defined('FACEBOOK_APP_SECRET')){
            $configPage = new ConfigAction();
            $configPage->run();
            return false;
        }
        
        return true;
    }

}

?>