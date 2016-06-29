<?php
	
	require_once('../../class/query-handler.php');

	if (isset($_POST['query'])){
		$query = $_POST['query'];
	}

	$query_handler = new QueryHandler();
	$query_handler->output();
?>