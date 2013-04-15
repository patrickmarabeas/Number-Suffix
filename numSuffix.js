(function($) {
	
	$.fn.numSuffix = function(config) {
		$this = $(this);
		var defaults = {
			prefix: '$',
			suffix: ['K','M','B','T']
		}
		var config = $.extend(defaults, config);

		function suffix(x) {
			
			switch (x.length) {
				case 0:
				case 1:
				case 2:
				case 3:
					return '';
					break;
				case 4:
				case 5:
				case 6:
					return config.suffix[0];
					break;
				case 7:
				case 8:
				case 9:
					return config.suffix[1];
					break;
				case 10:
				case 11:
				case 12:
					return config.suffix[2];
					break;
				case 13:
				case 14:
				case 15:
					return config.suffix[3];
					break;

			}
		}
		
		//ensure only numbers exist
		var sanatise = $this.text()
							.toString()
							.replace(/[^0-9]/g, "");
		
		//insert commas every 3 numbers
		var hoverValue = sanatise.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		//insert single dec point so number can be shortened and rounded at that point
		var dec = sanatise.replace(/\B(?=(\d{3})+(?!\d))/, ".");			
		var round = Math.round(dec * 100) / 100;
		//take first 4 characters - if last is dec point remove it (1.23, 12.3, 123)
		var numValue = round.toString()
							.substr(0,4)	
							.replace(/\.$/, "");
		
		//rewrite number and title property with new values
		$this.text(config.prefix + numValue + suffix(sanatise));
		$this.prop('title', config.prefix + hoverValue + suffix(sanatise));

	}
	
})(jQuery)