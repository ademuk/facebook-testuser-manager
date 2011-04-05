<?php

namespace App\Action;

class AjaxDeleteAction extends Base
{

	public function run()
	{
        try{
        	
        	$fb = $this->getFacebookClient();

            //Get Posted Data
            $uid = $this->getInspekt()->post->getAlnum('del_user');
            $token = $this->getInspekt()->post->getRaw('del_user_token');

            //API call
            $fb->setAccessToken($token);
            $res = $fb->api('/'.$uid, 'DELETE');

        } catch(\Exception $e) {
            $this->redirectToError($e, true);
            return;
        }

        $response = new \App\JsonResponse(200, "User deleted.");
        $response->sendOutput();
	}

}

?>