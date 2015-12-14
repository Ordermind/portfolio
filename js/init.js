/*
  Strata by HTML5 UP
  html5up.net | @n33co
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

  var settings = {

  // Parallax background effect?
    parallax: true,

  // Parallax factor (lower = more intense, higher = less intense).
    parallaxFactor: 20

  };

  skel.init({
  reset: 'full',
  containers: '100%',
  breakpoints: {
    global: { href: '/css/style.css', grid: { gutters: ['2.5em', 0] } },
    xlarge: { media: '(max-width: 1800px)', href: '/css/style-xlarge.css' },
    large: { media: '(max-width: 1280px)', href: '/css/style-large.css', grid: { gutters: ['2em', 0] } },
    medium: { media: '(max-width: 980px)', href: '/css/style-medium.css'},
    small: { media: '(max-width: 736px)', href: '/css/style-small.css', grid: { gutters: ['1.5em', 0] }, viewport: { scalable: false } },
    xsmall: { media: '(max-width: 480px)', href: '/css/style-xsmall.css' }
  }
  });

  $(function() {

  var $window = $(window),
    $body = $('body'),
    $header = $('#header');

  // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
    $body.removeClass('is-loading');
    });

  // Touch?
    if (skel.vars.isMobile) {

    // Turn on touch mode.
      $body.addClass('is-touch');

    // Height fix (mostly for iOS).
      window.setTimeout(function() {
      $window.scrollTop($window.scrollTop() + 1);
      }, 0);

    }

  // Forms (IE<10).

    if (skel.vars.IEVersion < 10) {

    var $form = $('form');

    if ($form.length > 0) {

      $.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
      $form.n33_formerize();

    }

    }

  // Header.

    // Parallax background.

    // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
      if (skel.vars.browser == 'ie'
      ||  skel.vars.isMobile)
      settings.parallax = false;

    if (settings.parallax) {

      skel.change(function() {

      if (skel.isActive('medium')) {

        $window.off('scroll.strata_parallax');
        $header.css('background-position', 'top left, center center');

      }
      else {

        $header.css('background-position', 'left 0px');

        $window.on('scroll.strata_parallax', function() {
        $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
        });

      }

      });

    }

  // Main Sections: Two.

    // Lightbox gallery.
    $('#two').poptrox({
      caption: function($a) { return $a.next('h3').text(); },
      overlayColor: '#2c2c2c',
      overlayOpacity: 0.85,
      popupCloserText: '',
      popupLoaderText: '',
      selector: '.work-item a',
      usePopupCaption: true,
      usePopupDefaultStyling: false,
      usePopupEasyClose: false,
      usePopupNav: true,
      windowMargin: (skel.isActive('small') ? 0 : 50)
    });

  });
  
  $.fn.collapsibleClose = function() {
    $(this).css("margin-top", 0 - $(this).height());
  };
  $.fn.collapsibleOpen = function() {
    $(this).css("margin-top", 0);
  };
  $.fn.collapsibleToggle = function(toggle_class) {
    var $parent = $(this).parent();
    if(toggle_class) {
      $parent.toggleClass('collapsed');
    }
    if($parent.hasClass('collapsed')) {
      $(this).collapsibleClose();
    }
    else {
      $(this).collapsibleOpen();
    }
  };
  $.fn.showProject = function(projects) {
    var $project = $(this);
    //Gör bara något om projektet inte är synligt
    if(!$project.hasClass('visible')) {
      //Hitta närmaste synliga previous sibling
      var previous_index = $project.attr('data-index') - 1;
      var $previous_project = null;
      while(true) {
        if(previous_index < 0) {
          break; 
        }
        if(projects[previous_index].hasClass('visible')) {
          $previous_project = projects[previous_index];
          break;
        }
        previous_index--;
      }
      $project.addClass('visible');
      if(previous_index < 0) {
        var $parent = $('.projects .row');
        $parent.prepend($project);
      }
      else {
        $previous_project.after($project);
      }
      $project.fadeIn(200);
    }
  };
  $.fn.filterProjects = function(projects, nofade) {
    var $filter_buttons = $('.filters .button');
    var filters = {language: [], framework: []};
    $filter_buttons.each(function() {
      var type_of_filter = $(this).parent().attr('class').substring(7);
      if($(this).hasClass('special')) {
        filters[type_of_filter].push($(this).attr('data-value'));
      }
    });
    //Sätt history state
    if(window.history) {
      var current_url =  window.location.href.split('#')[0].split('?')[0];
      var query = {};
      for(var filter_type in filters) {
        for(var i in filters[filter_type]) {
          if(query[filter_type] === undefined) {
            query[filter_type] = [];
          }
          query[filter_type].push(filters[filter_type][i]);
        }
      }
      var query_string = "";
      for(var filter_type in query) {
        query_string += "&" + filter_type + "=" + query[filter_type].join(','); 
      }
      if(query_string) {
        query_string = "?" + query_string.substring(1);
      }
      window.history.replaceState({}, "", current_url + query_string);
    }
    //Filtrera projekt
    if(filters.language.length || filters.framework.length) {
      for(var i = 0; i < projects.length; i++) {
        var $project = projects[i];
        var visible = false;
        loop1:
          for(var filter_type in filters) {
            for(var j in filters[filter_type]) {
              var values = $project.attr('data-'+filter_type).split(',');
              for(var k in values) {
                var value = values[k];
                if(value === filters[filter_type][j]) {
                  visible = true;
                  break loop1;
                }
              }
            }
          }
        if(visible) {
          $project.showProject(projects);
        }
        else {
          if(nofade) {
            $project.removeClass('visible');
            $project.hide();
            $project.remove();
          }
          else {
            $project.fadeOut(200, function() {
              $(this).removeClass('visible');
              $(this).remove();
            });
          }
        }
      }
    }
    else {
      //Visa alla projekt
      for(var i = 0; i < projects.length; i++) {
        projects[i].showProject(projects);
      }
    }
  };

  $(document).ready(function() {
    //Scrolla till #main om man inte är på startsidan
    var current_path = window.location.pathname;
    if(current_path !== '/' && current_path !== '/en/') {
      $('body').scrollTop($('#main').offset().top);
    }

    //Project list
    if($('body').hasClass('page-project_list')) {
      var projects = [];
      $('.projects article').each(function(index) {
        $(this).attr('data-index', index);
        $(this).addClass('visible');
        projects[index] = $(this);
      });
      $('.collapsible > .legend').click(function() {
        var $content = $(this).siblings('.collapsible-content').first();
        $content.collapsibleToggle(true);
      });
      $('.filters .button').click(function() {
        var $this = $(this);
        var filter_value = $this.attr('data-value');
        var type_of_filter = $this.parent().attr('class').substring(7);
        var $filters = $this.closest('.filters');
        var $projects = $('.projects article');
        $this.toggleClass('special');
        $projects.filterProjects(projects);
      });
      var getUrlVars = function() {
        var vars = {}, hash;
        var href = window.location.href.split('#')[0];
        var hashes = href.slice(href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          if(hash[1]) {
            vars[hash[0]] = hash[1].split(',');
          }
        }
        return vars;
      };
      //Handle GET parameters
      var current_path = window.location.pathname;
      if(current_path === '/projekt/' || current_path === '/en/projects/') {
        var params = getUrlVars();
        var filtered = false;
        for(var filter_type in params) {
          for(var i in params[filter_type]) {
            var filter = $('.filters .button[data-value=' + params[filter_type][i] + ']');
            $('.filters .button[data-value=' + params[filter_type][i] + ']').each(function() {
              var $this = $(this);
              var filter_value = $this.attr('data-value');
              var type_of_filter = $this.parent().attr('class').substring(7);
              var $filters = $this.closest('.filters');
              var $projects = $('.projects article');
              $this.toggleClass('special');
              $projects.filterProjects(projects, true);
            });
            filtered = true;
          }
        }
        if(filtered) {
          //Öppna filterrutan så att det blir tydligt vad som har hänt
          $('.filters-wrapper').removeClass('collapsed');
        }
      }
      $(window).load(function() {
        $('.collapsible > .collapsible-content').each(function() { 
          $(this).collapsibleToggle();
          $(this).hide();
          $(this).show();
          $(this).attr('data-transition-original', 'margin-top 0.2s ease-in-out');
        });
      });
      $(window).resize(function() {
        $('.collapsible > .collapsible-content').each(function() {
          var $content = $(this);
          $content.css('transition', 'none');
          $content.collapsibleToggle();
          setTimeout(function() {
            $content.css('transition', $content.attr('data-transition-original'));
          }, 100);
        });
      });
    }
    
    //Contact form
    $('.contact form').submit(function(e) {
      var $form = $(this);
      var $parent = $form.parent();
      e.preventDefault();
      var data = {};
      $(this).find("input:not([type=hidden]), textarea").each(function() {
        if($(this).attr('name')) {
          data[$(this).attr('name')] = $(this).val();
        }
      });
      $form.remove();
      $parent.addClass('ajax-loading');
      $.ajax({
        dataType: 'jsonp',
        url: "http://getsimpleform.com/messages/ajax?form_api_token=d3e2a680802ad0cee4871234618f4d9e",
        data: data
      }).done(function() {
        $parent.removeClass('ajax-loading').prepend('<div class="thank-you">'+thank_you_text+'</div>');
      });
    });
  });
})(jQuery);