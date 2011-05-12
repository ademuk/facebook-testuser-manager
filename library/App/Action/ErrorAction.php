<?php
namespace App\Action;

class ErrorAction extends Base
{
	
	protected $error;
	
	public function run()
	{
        header("HTTP/1.0 500 Internal Error");
		
        $user_is_admin = $this->checkAdmin();
        
        if ($this->getIsAjax()) {
            $response = new \App\JsonResponse($this->error->getCode(), $this->error->getMessage());
            $response->sendOutput();
        } else {
            //Render Template
            $tpl = $this->getTplEngine()->loadTemplate('error.html');
            $tpl->display(array('error' => $this->error, 'user_is_admin' => $user_is_admin));
        }
	}
	
	public function setError($e)
	{
		$this->error = $e;
		
	}
}

?>