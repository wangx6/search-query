<?php

	class QueryHandler {
		private $daft_api;
		private $response;
		private $API_KEY;

	    public function __construct() {
			$this->API_KEY = 'bff0ff3bd8a20b2dbfddcc31a70a09f433a8782b';
			$this->daft_api= new SoapClient("http://api.daft.ie/v2/wsdl.xml"); 
		}

		public function gen_parameters() {
			return array(
		        'api_key'    =>  $this->API_KEY,
		        'area_type'  =>  "county"
		    );
		}

	    public function output () {
	    	$parameters = $this->gen_parameters();
	   		$this->response = $this->daft_api->areas($parameters);

		    foreach($this->response->areas as $county){
		        print $county->name . "<br />\n";
		    }
	    }
	 
	}
?>