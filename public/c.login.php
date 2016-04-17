<?php

include("model_connect.php");
error_reporting(E_ALL & E_NOTICE);
ini_set('display_errors', 'on');

class Connect
{
var $login;
var $pass;
	function __construct()
	{
		$this->login = $_GET['login'];
		$this->pass = $_GET['pass'];
	}

    function test(){
    $connect = new model_connect();
    if($connect->mod_connect($this->login , $this->pass))
    {
        $fun = $connect->mod_connect($this->login , $this->pass)[0];
        session_start();
        $_SESSION["login"] = $this->login;
        $_SESSION["pass"] = $this->pass;  
              
    }

    else 
    {
         echo 'false';
    }
}

}
$conn= new Connect();
$conn->test();