<?php

namespace App\Action;

class SetSessionAction extends Base
{
	
	public function run()
	{
        //Check submitted
        $appId = $this->getInspekt()->post->getAlnum('fb_app_id');
        $appSecret = $this->getInspekt()->post->getAlnum('fb_app_secret');
        
        if ($appId) $_SESSION['FACEBOOK_APP_ID'] = $appId;
        if ($appSecret) $_SESSION['FACEBOOK_APP_SECRET'] = $appSecret;

        //Check for clear session
        $submitAction = $this->getInspekt()->post->getAlnum('action');
        if($submitAction == "ClearcurrentAppID"){
            unset($_SESSION['FACEBOOK_APP_ID']);
            unset($_SESSION['FACEBOOK_APP_SECRET']);
        }
        
        //Check Session
        $sessionAppId = (isset($_SESSION['FACEBOOK_APP_ID']))? $_SESSION['FACEBOOK_APP_ID']:null;

        //Check no session
        if (\defined('USE_SESSION') && USE_SESSION){
            $noSession = false;
        } else {
            $noSession = true;
        }

        //Render Template
		$tpl = $this->getTplEngine()->loadTemplate('set_session.html');
		$user_is_admin = (isset($_SESSION['user_is_admin']) && $_SESSION['user_is_admin'] == true);
        $this->context['user_is_admin'] = $user_is_admin;
        $this->context['appId'] = $appId;
        $this->context['appSecret'] = $appSecret;
        $this->context['sessionAppId'] = $sessionAppId;
        $this->context['noSession'] = $noSession;
        $tpl->display($this->context);
        
	}
	
}

?>