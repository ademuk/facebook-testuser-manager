<?php

namespace App\Action;

class AjaxDeleteAppAction extends Base
{

	public function run()
	{
        try{
        	//Get Posted Data
            $key = $this->getInspekt()->post->getRaw('del_user_key');
            $id = $this->getInspekt()->post->getRaw('del_user_id');
            
        	$config = new \Zend_Config_Ini(ROOT_PATH . 'config/apps.ini',
										   null,
										   array('skipExtends' => true,
										   		 'allowModifications' => true));
										   
			if (isset($config->default->apps->$key) && $config->default->apps->$key->id == $id) unset($config->default->apps->$key);
			
			//var_dump($config->default->apps);
			
			$writer = new \Zend_Config_Writer_Ini(array('config'   => $config,
                                           			   'filename' => ROOT_PATH . 'config/apps.ini'));
			$writer->write();

        } catch(\Exception $e) {
            $this->redirectToError($e, true);
            return;
        }

        $response = new \App\JsonResponse(200, "App deleted.");
        $response->sendOutput();
	}

}

?>