<?php
	$map = array(
		array(
			'name' => 'foo bar',
			'id' => 'keyproperty'
		),
		array(
			'name' => 'property 2',
			'id' => '22222'
		),
		array(
			'name' => 'property 3',
			'id' => '33333'
		)
	);
	$query = $_POST['name'];
	echo json_encode($map);
	// class QueryHandler {
	// 	var $key = 'bff0ff3bd8a20b2dbfddcc31a70a09f433a8782b';
	// 	var $DaftAPI = new SoapClient("http://api.daft.ie/v2/wsdl.xml");
 
	//     var $parameters = array(
	//         'api_key'   =>  $key,
	//         'ad_type' =>  'sale',
	//         //'area_type'   =>  "county"
	//         'ad_type' =>  "rental"
	//     );

	//     function output() {
	//    		$areas = $DaftAPI->areas($parameters);
	//    		echo json_encode($areas);
	//     }
 
 //    // $response = $DaftAPI->property_types($parameters);
 //    // $features = $DaftAPI->features($parameters);

	// }
	
?>