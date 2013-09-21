// To create List Page
$( document ).on("pageinit", "#tea-list", function() {
	
	window.teaList = new TeaCollection();

	// When the model data returns from the server, it uses set to 
	// (intelligently) merge the fetched models, unless you pass 
	// {reset: true}, in which case the collection will be reset.
    window.teaList.fetch();
	
	// When creating a new View, the options passed,like model, 
	// collection, etc. are attached to the view as 'this.options' 
	// for future reference
    window.teaListView = new TeaListView( { collection: window.teaList } ); 
	
    $('#nav').html( window.teaListView.render().el );
});

// To fetch Tea id and load it details page
$( document ).on( "pagebeforechange", function(event, data) {
	// The value stored in data.toPage is the URL of the page 
	// that will be loaded. 
	// To fetch id from path: #tea-details?id
	var urlHash = $.mobile.path.parseUrl(data.toPage).hash;
	
	if ( urlHash != undefined && urlHash.indexOf( "tea-details" ) >= 0 ) {
		var teaId = urlHash.substring( urlHash.indexOf( "?" ) + 1);
		
		// To create Tea's view
        tea = teaList.get(teaId);
        teaView = new TeaView( { model: tea } );
		
		// To inject view into DOM 
        $('#content').html( teaView.render().el );
		$.mobile.changePage( $('#tea-details') ); 
		
		// To prevent normal page transtion
		event.preventDefault();
	}
})

// To create #new-tea Page content
$( document ).on("pagebeforeshow", "#new-tea", function(event) {

    window.teaView = new TeaView( { model: new Tea() } );
    $('#newtea-content').html( window.teaView.render().el );
	// $.mobile.changePage( $('#new-tea') );
});

