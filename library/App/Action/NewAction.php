<?php

namespace App\Action;

class NewAction extends Base
{
	
	public function run()
	{		
		//Render Template
        $tpl = $this->getTplEngine()->loadTemplate('new.html');
        
		if (!$user_is_admin = $this->checkAdmin()) {
        	$configPage = new ConfigAction();
            $configPage->run();
            return false;
        }
        
        $this->context['user_is_admin'] = $user_is_admin;
        $tpl->display($this->context);
	}
	
}

?>