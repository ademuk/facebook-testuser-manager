<?php

namespace App\Action;

class AjaxCreateAction extends Base
{

	public function run()
	{
        try{
        	
        	$fb = $this->getFacebookClient();

            $params = array();
            $params['installed'] = $this->getInspekt()->post->getInt('installed');
            $params['permissions'] = $this->getInspekt()->post->getRaw('permissions');

            $user = $fb->api('/'.$fb->getAppId().'/accounts/test-users', 'POST', $params);

            if (is_array($user) && $params['installed']){

                $fb->setAccessToken($user['access_token']);
                $details = $fb->api('/me');

                $user = \array_merge($user,$details);
                $success = true;
            } else {
            	$user['name'] = 'Unknown';
            }

        } catch(\Exception $e) {
            $this->redirectToError($e, true);
            return;
        }

        $response = new \App\JsonResponse(200, "A new Test User (<a href=\"" . $user['login_url'] . "\">" . $user['name'] . "</a>) was created!", $user);
        $response->sendOutput();
	}

}

?>