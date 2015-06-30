(function ($) {
	//get the url segments
	var pathArray = window.location.pathname.split('/');
	var segment_1 = pathArray[1];

	//navigation
	var $menu = $('#menu'),
		$mainMenu = $('#menu-main-menu'),
		$menulink = $('.menu-link'),
		$menuTrigger = $('.menu-item-has-children > a');

	//project section conditionals
	if (segment_1 == 'project') {
		//select the 'projects' section if we're on the 'project' section in the nav
		$menuTrigger.filter("[href^='/projects/']").parent('li').addClass('current-menu-parent');
	}

	if ($mainMenu.length) {

		//create the sub nav from the main nav, if applicable
		var $selectedParent = $mainMenu.find('> li.menu-item-has-children.current-menu-parent, > li.current-menu-item.menu-item-has-children');
		if ($selectedParent.length) {
			var $selectedSub = $selectedParent.find('> .sub-menu');
			if ($selectedSub.length) {
				var $newSub = $('<ul class="horizontal-subnavigation"></ul>');
				$newSub.html($selectedSub.html());
				$menu.after($newSub);

				//project section
				if (segment_1 == 'project') {
					//get the current project's categories and highlight them in the nav
					var $projectsSubNav = $('.projects-subnavigation').eq(0);
					if ($projectsSubNav.length) {
						var relativeCatURL = $projectsSubNav.attr('data-cat-relative-url');
						$newSub.find('a[href="' + relativeCatURL + '"]').addClass('selected');
					}
				}
			}
		}

		$menulink.click(function (e) {
			e.preventDefault();
			$menulink.toggleClass('active');
			$menu.toggleClass('active');
		});

		$menuTrigger.click(function (e) {
			e.preventDefault();
			var $this = $(this);
			$this.toggleClass('active').next('ul').toggleClass('active');
		});
	}

	//project page
	var $projectPhotoWrapper = $('.project_photo_wrapper');
	if ($projectPhotoWrapper.length) {

		//get the slides
		var $projectSlides = $projectPhotoWrapper.find('> div');

		if ($projectSlides.length) {
			//initialize the carousel
			$projectPhotoWrapper.slick({
				arrows: false
			});

			//get the photo-details div
			var $photoDetails = $('#photo-details');
			var $photoDetailsContent = $('#photo-details-content');
			var $photoDetailsHeading = $('#photo-details-heading');

			//get the thumbnail links
			var $thumbLinks = $('.thumbnails_wrapper').find('a');

			$projectPhotoWrapper.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$thumbLinks.removeClass('selected');
				$thumbLinks.eq(nextSlide).addClass('selected');
			});

			//thumbnail link click handler
			$thumbLinks.click(function (e) {
				e.preventDefault();

				//assign 'this' to a variable
				var $link = $(this);

				//find the position of this link among all of the thumbnails
				var thumbIndex = $thumbLinks.index($link);

				//tell the slider to move to this position
				$projectPhotoWrapper.slick("slickGoTo", thumbIndex);

				//get the slides html
				var slideHTML = $projectSlides.eq(thumbIndex).find('div').html();

				slideHTML = $.trim(slideHTML);

				//change the photo details html
				$photoDetailsContent.html(slideHTML);

				if (slideHTML == '') {
					$photoDetails.addClass('hidden');
				} else {
					$photoDetails.removeClass('hidden');

					//center the photo details
					$photoDetails.css('top', ($projectPhotoWrapper.height() - $photoDetails.height()) * .5);
				}
			});

			$photoDetailsHeading.click(function (e) {
				e.preventDefault();
				$photoDetails.toggleClass('closed');
			});

			//fake a click to the first item
			$thumbLinks.eq(0).addClass('selected').trigger('click');
		}
	}

	var $teamMenu = $('#team-cat-toggle');
	if ($teamMenu.length) {
		var $members = $('.team-member');
		var $toggles = $teamMenu.find('a');

		$toggles.click(function (e) {

			e.preventDefault();

			if (!$(this).hasClass('selected')) {

				var teamCat = $(this).attr('href').replace('#', '');

				//remove all selected toggle classes
				$toggles.removeClass('selected');

				//select this item
				$(this).addClass('selected');

				//hide all entries
				$members.addClass('hidden');
				$members.filter('.' + teamCat).removeClass('hidden');
			}
		});

		//similate a click on the first link to get the ball rolling
		if ($toggles.length) {
			$toggles.eq(0).trigger('click');
		}
	}

	var $cycleSliders = $('.cycle-slideshow');
	if ( $cycleSliders.length ) {
		if ($cycleSliders.find('.slide_wrapper').length <= 1) {
			$cycleSliders.find('.custom-pager').css("display", "none");
		}
	}
}(jQuery));