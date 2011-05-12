<?php

namespace App\Action;

class LoginAction extends Base
{
	
	public function run($params = null)
	{
		if ($this->checkSession($params)){
			
            //Render List action
        	$list = new ListAction();
        	$list->run();
        } else {
        	unset($_SESSION['APP_NAME']);
        	unset($_SESSION['FACEBOOK_APP_ID']);
        	unset($_SESSION['FACEBOOK_APP_SECRET']);
        	unset($_SESSION['user_is_admin']);
        	
        	 //Render List action
        	$about = new AboutAction();
        	$about->run();
        }
        
	}
	
	protected function checkSession($params) {
		$config = new \Zend_Config_Ini(ROOT_PATH . 'config/apps.ini', 'default');
      	$return = false;
      	foreach($config->apps as $app) {
      		if ($app->id == $params[0] && $app->tsid == $params[1]) {
      			$_SESSION['APP_NAME'] = $app->name;
      			$_SESSION['FACEBOOK_APP_ID'] = $app->app_id;
        		$_SESSION['FACEBOOK_APP_SECRET'] = $app->app_secret;
        		$_SESSION['user_is_admin'] = false;
        		$return =  true;
        		break;
      		}
      		if ($app->id == $params[0] && $app->asid == $params[1]) {
      			$_SESSION['APP_NAME'] = $app->name;
      			$_SESSION['FACEBOOK_APP_ID'] = $app->app_id;
        		$_SESSION['FACEBOOK_APP_SECRET'] = $app->app_secret;
        		$_SESSION['user_is_admin'] = true;
        		$return = true;
        		break;
      		}
      	}
      	return $return;
	}
	
}