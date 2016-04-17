<?php 
include("Database.php");
class model_Connect
{
	function mod_connect($email,$password){
		    $co = \App\Model\Database::get()->prepare("select * from users where (email = '".$email."' or username = '".$email."') and password = '".$password."'");
		    $co->execute();
            return $co->fetchAll();
	    }
}

 ?>