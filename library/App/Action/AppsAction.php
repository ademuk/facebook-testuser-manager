<?php

namespace App\Action;

class AppsAction extends Base
{
	
	public function run()
	{
		if (!$user_is_admin = $this->checkAdmin()) {
        	$configPage = new ConfigAction();
            $configPage->run();
            return false;
        }
        
		$config = new \Zend_Config_Ini(ROOT_PATH . 'config/apps.ini', 'default', array('allowModifications' => true));
		$apps = array();
		foreach($config->apps as $key => $app) {
			$app->login = BASE_URL . 'login/' . $app->id . '/' . ($app->asid ? $app->asid : $app->tsid);
			if ($app->asid) $app->admin = true;
			$apps[$key] = $app;
		}
        //Render Template
		$tpl = $this->getTplEngine()->loadTemplate('apps.html');
		$this->context['apps'] = $apps;
        $this->context['user_is_admin'] = $user_is_admin;
        $tpl->display($this->context);
        
	}
	
}

?>