<?php

namespace App\Action;

class CreateAction extends Base
{
	
	public function run()
	{
        try {
            $fb = $this->getFacebookClient();

            $params = array();
            $params['installed'] = $this->getInspekt()->post->getInt('installed');
            $params['permissions'] = $this->getInspekt()->post->getRaw('permissions');

            $user = $fb->api('/'.$fb->getAppId().'/accounts/test-users', 'POST', $params);

            if (is_array($user)){

                $fb->setAccessToken($user['access_token']);
                $details = $fb->api('/me');

                $user = \array_merge($user,$details);
                $success = true;
            }
        } catch (\Exception $e) {
            $this->redirectToError($e);
            return;
        }

        $tpl = $this->getTplEngine()->loadTemplate('create.html');
        $user_is_admin = (isset($_SESSION['user_is_admin']) && $_SESSION['user_is_admin'] == true);
        $tpl->display(array(
        	'error' => !isset($success), 
        	'user' => $user, 
        	'user_is_admin' => $user_is_admin
        ));

	}
	
}

?>