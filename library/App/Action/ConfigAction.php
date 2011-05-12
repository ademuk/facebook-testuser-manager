<?php

namespace App\Action;

class ConfigAction extends Base
{
	
	public function run()
	{
		//Render Template
		$tpl = $this->getTplEngine()->loadTemplate('config.html');
		$user_is_admin = (isset($_SESSION['user_is_admin']) && $_SESSION['user_is_admin'] == true);
        $tpl->display(array('user_is_admin' => $user_is_admin));
	}
	
}

?>