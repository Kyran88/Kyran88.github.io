$('#ais').carousel({
  interval: 8000
});

// handles the carousel thumbnails
$('[id^=carousel-selector-]').click(function() {
  var id_selector = $(this).attr("id");
  //console.log(id_selector);
  var id = id_selector.substr(id_selector.length - 1);
  //console.log(id);
  id = parseInt(id);
  $('#ais').carousel(id - 1);
  $('[id^=carousel-selector-]').removeClass('active');
  $(this).addClass('active');
  //console.log(this);
});

// when the carousel slides, auto up<a href="https://www.jqueryscript.net/time-clock/">date</a>
$('#ais').on('slid.bs.carousel', function(e) {
  var id = $('.item.active').data('slide-number');
  id = parseInt(id);
  $('[id^=carousel-selector-]').removeClass('active');
  $('[id=carousel-selector-' + id + ']').addClass('active');
});

$(function () {
			'use strict';
		
			var $header = $('#hss .swipe-tabs'),
				$navLink = $('#hss .swipe-tab'),
				$tabsContainer = $('#hss .swipe-tabs-container'),
				currentIndex = 0,
				activeTab = 'active-tab',
		    $nextButton = $('slick-next'),
		    $prevButton = $('slick-prev');
		
			$header.on('init', function(event, slick) {
				$tabsContainer.removeClass('invisible');
				$header.removeClass('invisible');
		
				currentIndex = slick.getCurrent();
				$navLink.removeClass(activeTab);
		       	$('#hss .swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTab);
			});
		
			$header.slick({
				slidesToShow: 2.5,
				slidesToScroll: 1,
				arrows: false,
				infinite: false,
				swipeToSlide: true,
				touchThreshold: 10,
				responsive: [
					{
						breakpoint: 600,
						settings: {
							variableWidth: true
						}
					}
				]
			});
		
			$tabsContainer.slick({
				asNavFor: $header,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				infinite: false,
				swipeToSlide: true,
		    	draggable: true,
				touchThreshold: 10
			});
		
			$navLink.on('click', function(event) {
		        // gets index of clicked tab
		        currentIndex = $(this).data('slick-index');
		        $navLink.removeClass(activeTab);
		        $('#hss .swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTab);
		        $header.slick('slickGoTo', currentIndex);
		        $tabsContainer.slick('slickGoTo', currentIndex);
		    });
		
		    //initializes slick navigation tabs swipe handler
		    $tabsContainer.on('swipe', function(event, slick, direction) {
		    	currentIndex = $(this).slick('slickCurrentSlide');
				$navLink.removeClass(activeTab);
				$('#hss .swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTab);
			});
		});


$(document).ready(function() {
    loadRSS('RSS feed link here', '#Newsfeed', 'Read More');   
});

function loadRSS(link, htmlContainer, author) {
    var url = link;
    var container = $(htmlContainer);

    feednami.load(url, function(result){
        if (result.error) {
            console.log(result.error);
        } else {
            var entries = result.feed.entries;
            for(var i = 0; i < 4; i++){
                var entry = entries[i];
                container.append("<li class=\"RSScard\"><p><h2>" 
                    + "<a href=\"" + entry.link + "\" target=\"_blank\">" + entry.title + "</a>" 
                    + "</h2></p>"+ author + "</li>");
            }
        }
    });
}
