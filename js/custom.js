/* =========================================================
 * custom.js 
 * =========================================================
 * This is a place to hold your custom scripts for your site
 * ========================================================= */

 $(document).ready(function(){
 	var navbarSelector = '#navbar';
 	shorten_titles(
 		'On Our Terms: The Undergraduate Journal of the Athena Center for Leadership Studies',
 		"On Our Terms"
 		);
 	bootstrappify_nav(navbarSelector);

 	// Reorder menu items
	$(navbarSelector+' #home').appendTo(menuSelector);
	$(navbarSelector+' #about').appendTo(menuSelector);
	$(navbarSelector+' #userMenu').appendTo(menuSelector);
	$(navbarSelector+' #current').appendTo(menuSelector); // Move current to the right of about
	$(navbarSelector+' #archiveMenu').appendTo(menuSelector);

 });

// Truncate long titles to friendly titles
function shorten_titles(fullTitle, friendlyTitle){

	// Shorten the title in the breadcrumbs
	$('#breadcrumb a').each(function() {
		if( $(this).text() == fullTitle ) $(this).text(friendlyTitle);
	});

	// If the journal title is the page title, hide it
	if( $('#breadcrumb + h2').text() == fullTitle ) { 
		$('#breadcrumb + h2').hide();
	}
}

function bootstrappify_nav_submenu(menuParentObject, menuChildObjects){
	var submenuObject = $('<ul/>').addClass('dropdown-menu');
	menuParentObject.addClass('dropdown');

	// Create menu label
	menuParentObject
		.find('a').attr({
			"class": "dropdown-toggle", 
			"data-toggle": "dropdown", 
		})
		.append('<b class="caret"/>');

	// Add submenu items
	$.each(menuChildObjects, function(index, value){
		submenuObject.append(value);
	});

	// Attach submenu to parent menu
	menuParentObject.append(submenuObject);

	return menuParentObject;
}

function bootstrappify_nav(navbarSelector){

	// Build bootstrap navbar scaffolding
	$(navbarSelector).addClass('navbar');
	$(navbarSelector+' ul')
	.wrapAll('<div class="navbar-inner" />')
	.wrapAll('<div class="container" />')
	.removeClass('menu')
	.addClass('nav');

	// Navbar modifications
	menuSelector = navbarSelector+' .menu';

	// Move register under login
	var menuParentObject = $(navbarSelector+' #login');	
	var menuChildObjects = new Array(
		menuParentObject.clone(),
		$(navbarSelector+' #register')
		);
	menuParentObject.attr('id', menuParentObject.attr('id')+'Menu');
	$(navbarSelector+" .nav").append(bootstrappify_nav_submenu(menuParentObject, menuChildObjects));

	// Move search under archives
	var menuParentObject = $(navbarSelector+' #archives');	
	var menuChildObjects = new Array(
		menuParentObject.clone(),
		$(navbarSelector+' #search')
		);
	menuParentObject.attr('id', menuParentObject.attr('id')+'Menu');
	$(navbarSelector+" .nav").append(bootstrappify_nav_submenu(menuParentObject, menuChildObjects));
}
