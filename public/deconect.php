<?php
session_start();

include("model_connect.php");
	session_unset();
	$_SESSION["login"]=NULL;
	$_SESSION["email"]=null;
	$_SESSION["pass"]= null; 
?>