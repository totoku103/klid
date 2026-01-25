var HmDropDownList = {
		
		create: function($obj, options) {
			var defOpts = { width: '95%', height: 20, theme: jqxTheme, autoDropDownHeight: true, placeHolder: '선택해주세요', 
					enableBrowserBoundsDetection: true };
			$.extend(defOpts, options);
			$obj.jqxDropDownList(defOpts);
		},
		
		getSourceByUrl: function(url, params) {
			return new $.jqx.dataAdapter(
					{
						datatype: 'json',
						url: ctxPath + url
					},
					{
						formatData: function(data) {
							if(params != null) $.extend(data, params);
							return data;
						}
					}
			);
		},
		
		getSourceByHmResource: function(resourceId) {
			return HmResource[resourceId];
		},

		/**
		 * checkboxes 속성이 true인 경우 체크된 리스트 value값만 추출하여 리턴
		 */
		getCheckedValues: function($obj) {
			var checkedItems = $obj.jqxDropDownList('getCheckedItems');
			var result = [];
			$.each(checkedItems, function(idx, item) {
				result.push(item.value);
			});
			return result;
		}
		
};