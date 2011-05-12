<?php

namespace App\Action;

class ListAction extends Base
{
	
	public function run($params = null)
	{
        if (!$this->checkTokens()){
            return;
        }
		
        $user_is_admin = $this->checkAdmin();
        
		try{
            //Get list of users
            $fb = $this->getFacebookClient();
            $fb->setAccessToken(null);
            $response = $fb->api('/'.$fb->getAppId().'/accounts/test-users');
            $testUsers = (\array_key_exists('data', $response))? $response['data']:array();

        } catch (\Exception $e) {
            $this->redirectToError($e);
            return;
        }

        //Render Template
        $tpl = $this->getTplEngine()->loadTemplate('list.html');
		
        $this->context['users'] = $testUsers;
        $this->context['user_is_admin'] = $user_is_admin;
        $tpl->display($this->context);
	}
	
}

?>