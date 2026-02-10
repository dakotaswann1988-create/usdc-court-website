// Redefine console for debug safety
if (! ("console" in window) || !("firebug" in console)) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group"
                 , "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i <names.length; ++i) window.console[names[i]] = function() {};
}

function setInputDefaultValue(input_id, input_value) {

//Setting the initial value via JS
$(input_id).val(input_value);

$(input_id).focus(function () {
  if ($(this).attr("value") == input_value) {
  $(this).val("");
}
}); //end focus function

$(input_id).blur(function () {
  if ($(this).attr("value") == "") {
    $(this).val(input_value);
  }

}); //end blur function
};
(function ($) {
  Drupal.behaviors.uscourtsGeneral = {
    attach: function(context, settings) {
      //START Drupal Behaviors

      //TODO: Drupal comes with jquery.cookies, how do we activate the core version instead?
      //TODO: Drop all of this into a custom module that has the block as well

      //We're going to have to use body a lot so let's cache it
      var $body = $('body');

      //We'll be setting this variable onclick, but let's give a safe default
      var textSize = 'defaultFont';

      //If the user has a font size set already let's put it in place
      if($.cookie('TEXT_SIZE')) {
        $body.removeClass('defaultFont sidebar-first');
        $body.addClass($.cookie('TEXT_SIZE'));
      }

      // Smaller
      if ($('.resizer', context).length ) {
        //TODO: .small is too generic of a class name
        $('.resizer .decrease-font a').click(function() {
          if ( $('body').hasClass('xlFont') ) {
             $('body').removeClass('xlFont').addClass('lgFont');
             textSize = 'lgFont';
          }
          else if ( $('body').hasClass('lgFont') ) {
             $('body').removeClass('lgFont').addClass('defaultFont');
             textSize = 'defaultFont';
          }

          $.cookie('TEXT_SIZE', textSize, { path: '/', expires: 10000 });
          return false;
        });

        // Larger
        $('.resizer .increase-font a').click(function() {
          if ( $('body').hasClass('defaultFont') ) {
             $('body').removeClass('defaultFont').addClass('lgFont');
             textSize = 'lgFont';
          }
          else if ( $('body').hasClass('lgFont') ) {
             $('body').removeClass('lgFont').addClass('xlFont');
             textSize = 'xlFont';
          }

          $.cookie('TEXT_SIZE', textSize, { path: '/', expires: 10000 });
          return false;
        });

        // Default
        $('.resizer .reset-font a').click(function() {
          if ( $('body').hasClass('lgFont') ) {
             $('body').removeClass('lgFont').addClass('defaultFont');
             textSize = 'defaultFont';
          }
          else if ( $('body').hasClass('xlFont') ) {
             $('body').removeClass('xlFont').addClass('defaultFont');
             textSize = 'defaultFont';
          }
          $.cookie('TEXT_SIZE', textSize, { path: '/', expires: 10000 });
          return false;
        });
      }

      // [end] Text Resizer

      // Sliding Drawer
      if ( $('.views-field-field-faq-answer', context).length ) {
        $('li .views-field-title').addClass('faq-js-active');
        $('.views-field-field-faq-answer').hide();
        $('li .views-field-title').click(function(){
          $(this).parent().find('.views-field-field-faq-answer').slideToggle();
          $(this).toggleClass('faq-open');
        })
      }

      // [end] Sliding Drawer

// mobile menu for smart phones

jQuery(document).ready(function($){

	// prepend menu icon //
	$('#block-menu-menu-mobile-menu').prepend('<div id="menu-icon">Menu</div>');

	// toggle nav //
	$("#menu-icon").click(function() {
		$("#navigation .menu").slideToggle();
		$(this).toggleClass("active");
	});
// end of mobile menu

});
  //  END Drupal Behaviors
    }
  };


  function calculateSidebarHeight(contentHeight, sidebarHeight) {
    return (contentHeight > sidebarHeight) ? contentHeight : sidebarHeight;
  }
  function getContentHeight() {
    if ($('body').hasClass('front')) {
      return $('div#main-content > .grid_9').height();
    }
    else {
      return $('div#main').height();
    }
  }
  function getSidebarHeight(position) {
    switch (position) {
      case "first":
        return $('div#sidebar-first').height();
      case "second":
        return $('div#sidebar-second').height();
        break;
      default:
        return;
    }
  }

  Drupal.behaviors.sidebarHeight = {
    attach: function(context, settings) {
      $(document).ready(function sidebarHeight() {
        var sidebarHeight = calculateSidebarHeight(getContentHeight(), getSidebarHeight("second"));
        $('div#sidebar-second').css("height", sidebarHeight + 'px');
      });
    }
  };

  Drupal.behaviors.resizeSidebar = {
    attach: function(context, settings) {
      $(window).resize(function resizeSidebar() {
        $('div#sidebar-second').css("height", "auto");
        var sidebarHeight = calculateSidebarHeight(getContentHeight(), getSidebarHeight("second"));
        $('div#sidebar-second').css("height", sidebarHeight + 'px');
      });
    }
  };

})(jQuery);
;
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};;
/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}
	
    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );;
