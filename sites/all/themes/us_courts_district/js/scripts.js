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
