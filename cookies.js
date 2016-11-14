$(document).ready(function(){
	var $originalPlate = null;
	var originalTop = null;
	var originalLeft = null;
	var originalPosition = null;
	var originalCss = {};

	function resetCookies() {
		Cookies.set('chocolate', 0);
		Cookies.set('sugar', 0);
		Cookies.set('lemon', 0);
		fillCounts();
	}

	function fillCounts() {
		$('#chocolate-count').children('span').text(Cookies.get('chocolate'));
		$('#sugar-count').children('span').text(Cookies.get('sugar'));
		$('#lemon-count').children('span').text(Cookies.get('lemon'));
	}
	fillCounts();

	function increaseCount($this) {
		if ($this.hasClass('chocolate')) {
			var current = parseInt(Cookies.get('chocolate'));
			Cookies.set('chocolate', (isNaN(current) ? 1 : current+1));
		}
		if ($this.hasClass('sugar')) {
			var current = parseInt(Cookies.get('sugar'));
			Cookies.set('sugar', (isNaN(current) ? 1 : current+1));
		}
		if ($this.hasClass('lemon')) {
			var current = parseInt(Cookies.get('lemon'));
			Cookies.set('lemon', (isNaN(current) ? 1 : current+1));
		}
		fillCounts();
	}

	var droppedInRightPlace = false;
	$('.cookie').draggable({
		snap: ".cookie-monster.bottom .snap",
		snapMode: "inner",
		revert: 'invalid',
		start: function(){
			$originalPlate = $(this).parent();
			originalTop = $(this).css('top');
			originalLeft = $(this).css('left');
			originalPosition = $(this).css('position');
			originalCss = {
				top: originalTop,
				left: originalLeft,
				position: originalPosition
			};
		},
		stop: function(){
			if (droppedInRightPlace) {
				var $this = $(this);
				$(this).appendTo('.cookie-monster.bottom').addClass('get-eaten');
				setTimeout(function(){
					$this.removeClass('get-eaten').appendTo($originalPlate).css(originalCss);
					droppedInRightPlace = false;
				}, 3000);
				increaseCount($this);
			}//end if
		}//end stop function
	});

	$('.snap').droppable({
		drop: function(){
			droppedInRightPlace = true;
		}
	});

	$(document).on('keypress', function(e){
		if (e.which === 26) {
			resetCookies();
		}
	});
});