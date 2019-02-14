$(document).ready(function() {
	$(".slider").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		asNavFor: ".asnav"
	});
	$(".asnav").slick({
		slidesToShow: 1,
		fade: true,
		dots: false,
		arrows: false,
		draggable: false,
		focusOnSelect: true
	});
	var vague = $(".rfb").Vague({
		intensity: 6,
		forceSVGUrl: false,
		animationOptions: {
			duration: 600,
			easing: "swing"
		}
	});

	function openCaption() {
		$(".menu").addClass("menu-open");
		$(".menu-fade-bg").addClass("fadeOut");
		$(".slider").addClass("slide-disable");
		$(".menu-fade-top").addClass("menu-fade-top-in");
		setTimeout(function() {
			vague.animate(6, {
				duration: 400,
				easing: "swing"
			});
		}, 100);
		$(".slider .slick-active").addClass("zoomedslide");
	}

	function closeCaption() {
		vague.animate(0, {
			duration: 320,
			easing: "swing"
		});
		$(".menu").removeClass("menu-open");
		$(".menu-fade-bg").removeClass("fadeOut");
		$(".menu-fade-top").removeClass("menu-fade-top-in");
		$(".slider").removeClass("slide-disable");
		$(".slider .slick-active").removeClass("zoomedslide");
		$(".menu").scrollTop(0);
	}

	function openSMenu() {
		$(".left-half-nav").addClass("s-menu-switch-left");
		$(".right-half-nav").addClass("s-menu-switch-right");
		$(".cut-out").addClass("s-menu-swtich-cutout");
		$(".nav-button").addClass("s-menu-switch-navbtn");
		$(".menu-toggle, .search").addClass("icon-out");
		setTimeout(function() {
			$(".nav-container").addClass("s-menu-open");
			$(".secondary-nav").addClass("s-nav-open");
			$(".slider .slick-active").addClass("zoomedslide");
			vague.animate(6, {
				duration: 400,
				easing: "swing"
			});
		}, 390);
		setTimeout(function() {
			$(".link").addClass("link-in");
		}, 600);
	}

	function closeSMenu() {
		$(".link").removeClass("link-in");
		$(".left-half-nav").removeClass("s-menu-switch-left");
		$(".right-half-nav").removeClass("s-menu-switch-right");
		$(".cut-out").removeClass("s-menu-swtich-cutout");
		$(".nav-button").removeClass("s-menu-switch-navbtn");
		setTimeout(function() {
			$(".menu-toggle, .search").removeClass("icon-out");
		}, 270);
		setTimeout(function() {
			$(".nav-container").removeClass("s-menu-open");
			$(".secondary-nav").removeClass("s-nav-open");
			$(".slider .slick-active").removeClass("zoomedslide");
			vague.animate(0, {
				duration: 320,
				easing: "swing"
			});
		}, 390);
	}

	function openSearch() {
		$(".right-half-nav").addClass("s-menu-switch-left");
		$(".left-half-nav").addClass("s-menu-switch-right");
		$(".cut-out").addClass("search-swtich-cutout");
		$(".nav-button").addClass("s-menu-search-navbtn");
		$(".slider").addClass("slide-disable");
		vague.animate(6, {
			duration: 400,
			easing: "swing"
		});
		$(".slider .slick-active").addClass("zoomedslide");
		$(".menu-toggle, .search").addClass("icon-out");
		$(".search-bar").focus();
		setTimeout(function() {
			$(".search-container").addClass("search-c-in");
		}, 230);
	}

	function closeSearch() {
		$(".right-half-nav").removeClass("s-menu-switch-left");
		$(".left-half-nav").removeClass("s-menu-switch-right");
		$(".cut-out").removeClass("search-swtich-cutout");
		$(".nav-button").removeClass("s-menu-search-navbtn");
		$(".slider").removeClass("slide-disable");
		vague.animate(0, {
			duration: 320,
			easing: "swing"
		});
		$(".slider .slick-active").removeClass("zoomedslide");
		$(".search-container").removeClass("search-c-in");
		setTimeout(function() {
			$(".menu-toggle, .search").removeClass("icon-out");
		}, 270);
	}

	$(".nav-button").click(function() {
		if ($(".menu").hasClass("menu-open")) {
			closeCaption();
			$(".bars").removeClass("bars-cross");
		} else if ($(".nav-container").hasClass("s-menu-open")) {
			closeSMenu();
			$(".bars").removeClass("bars-cross");
		} else if ($(".search-container").hasClass("search-c-in")) {
			closeSearch();
			$(".bars").removeClass("bars-cross");
		} else {
			openCaption();
			$(".bars").addClass("bars-cross");
		}
	});

	$(".menu-toggle").click(function() {
		if ($(".menu").hasClass("menu-open")) {
			closeCaption();
			openSMenu();
			$(".bars").addClass("bars-cross");
		} else if ($(".nav-container").hasClass("s-menu-open")) {
			closeSMenu();
			$(".bars").removeClass("bars-cross");
		} else {
			openSMenu();
			$(".bars").addClass("bars-cross");
		}
	});

	$(".search").click(function() {
		if ($(".menu").hasClass("menu-open")) {
			closeCaption();
			openSearch();
			vague.animate(6, {
				duration: 400,
				easing: "swing"
			});
			$(".bars").addClass("bars-cross");
		} else if ($(".search-container").hasClass("s-menu-open")) {
			closeSearch();
			$(".bars").removeClass("bars-cross");
		} else {
			openSearch();
			$(".bars").addClass("bars-cross");
		}
	});
});
