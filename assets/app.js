var listApp = function(){
	this.url = document.location.pathname;
	return this;
}

listApp.prototype.start = function(){
	var api_key = "YOUR-FLYBASE-API-KEY";
	var app_name = "listmvp";
	
	this.flybaseRef = new Flybase(api_key, app_name, "people");
	return this;
};

listApp.prototype.view = function( table_name ){
	var self = this;
	var table_name = "#" + table_name;
	var table_headers = [];
	var table_data = [];
	var first = true;
	self.flybaseRef.on('value').then( function( data ){
		var htr = $('<tr>');
		data.forEach( function( row ){
			var row = row.value();
			table_data.push( row );
			var btr = $('<tr>');
			for( var key in row ){
				if( key.charAt(0) !== '_' ){
					var val = row[key];
					$('<th>' + val.linkify() + '</th>').appendTo( btr );
					if( first ){
						$('<th>' + key + '</th>').appendTo( htr );
					}
				}
			}
			$(table_name).find("tbody").html("").append( btr )
			first = false;
		});
		$(table_name).find("thead").html("").append( htr )
		console.log( "done " );
	});
	return this;
};

//	save the form into your flybase app.
listApp.prototype.save = function( form_name ){
	var self = this;
	var form_name = "#" + form_name;
	$( form_name ).submit(function( event ) {
		var record = {};
		$(this).find(':input').each(function(){
			var field_id = $(this).attr('id');
			var label = $(this).data('label');
			var order = $(this).data('order');
			var value = $(this).val();
			if( typeof label !== 'undefined' ){
				var label = '<!--' + order + '-->' + label;
				record[label] = value;
			}
			$(this).val("");
		});
		self.flybaseRef.push( record ).then( function(){
			$("#flash").html("<p>Your message has been saved</p>").show();
		});
		event.preventDefault();
	});	
	return this;
};

if(!String.linkify) {
	String.prototype.linkify = function() {
		// http://, https://, ftp://
		var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
		
		// www. sans http:// or https://
		var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		
		// Email addresses
		var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

		
		return this
			.replace(urlPattern, '<a href="$&" target="_new">$&</a>')
			.replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
			.replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
	};
}