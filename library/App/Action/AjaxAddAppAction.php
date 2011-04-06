<?php

namespace App\Action;

class AjaxAddAppAction extends Base
{

	public function run()
	{
        try{
        	//Get Posted Data
            $app_name = $this->getInspekt()->post->getRaw('app_name');
            $app_id = $this->getInspekt()->post->getInt('app_id');
            $fb_app_id = $this->getInspekt()->post->getAlnum('facebook_app_id');
            $fb_app_secret = $this->getInspekt()->post->getAlnum('facebook_app_secret');
            
            $key = $this->getInspekt()->post->getAlpha('app_name');
            
        	$config = new \Zend_Config_Ini(ROOT_PATH . 'config/apps.ini',
										   null,
										   array('skipExtends' => true,
										   		 'allowModifications' => true));

			$data = array(
				'name' => $app_name,
				'id' => $app_id, 
				'tsid' => str_replace('.', '', uniqid($_SERVER['REMOTE_ADDR'], TRUE)),
				'app_id' => $fb_app_id, 
				'app_secret' => $fb_app_secret
			);
			if (!isset($config->default->apps->$key)) $config->default->apps->$key = $data;
			
			//var_dump($config->default->apps);
			
			$writer = new \Zend_Config_Writer_Ini(array('config'   => $config,
                                           			   'filename' => ROOT_PATH . 'config/apps.ini'));
			$writer->write();

        } catch(\Exception $e) {
            $this->redirectToError($e, true);
            return;
        }

        $response = new \App\JsonResponse(200, "App added.", $data);
        $response->sendOutput();
	}

}

?>