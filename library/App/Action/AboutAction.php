<?php

namespace App\Action;

class AboutAction extends Base
{
	
	public function run()
	{
		//Render Template
		$tpl = $this->getTplEngine()->loadTemplate('about.html');
		$user_is_admin = (isset($_SESSION['user_is_admin']) && $_SESSION['user_is_admin'] == true);
		echo $user_is_admin;
        $tpl->display(array(
        	'user_is_admin' => $user_is_admin
        ));
	}
	
}

?>