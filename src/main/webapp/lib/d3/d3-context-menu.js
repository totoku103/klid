/**
 * 2017.01.12 - 동적 메뉴 생성을 위해 23번째 줄 변경	
 * list.selectAll('li').data(menu).enter() -> list.selectAll('li').data(menu(data)).enter()
 */
d3.contextMenu = function (menu, openCallback) {
	// create the div element that will hold the context menu
	d3.selectAll('.d3-context-menu').data([1])
		.enter()
		.append('div')
		.attr('class', 'd3-context-menu')
		.on('mouseleave', function(d, i) {
			// d3.select('.d3-context-menu').style('display', 'none');
		});

	// close menu
	d3.select('body').on('click.d3-context-menu', function() {
		// d3.select('.d3-context-menu').style('display', 'none');
	});

	// this gets executed when a contextmenu event occurs
	return function(data, index) {	
		var elm = this;

		d3.selectAll('.d3-context-menu').html('');
		var list = d3.selectAll('.d3-context-menu').append('ul');
		list.selectAll('li').data(menu(data)).enter()
			.append('li')
			.html(function(d) {
				var _html = $('<div></div>');

				switch (d.title){
                    // case "최상위그룹":
                    //     _html.append($('<img />').attr({ src: '/img/d3/menu/d3_bullet.png' }).css({"float": "left", "padding-right": "5px"}));
						// break;
                    // case "상위그룹":
                    //     _html.append($('<img />').attr({ src: '/img/d3/menu/menu_parent.svg' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "모드변경":
                    //     _html.append($('<img />').attr({ src: '/img/d3/menu/menu_mode.svg' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "그룹보기":
                    //     _html.append($('<img />').attr({ src: '/img/d3/menu/menu_group.svg' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "장비찾기":
                    //     _html.append($('<img />').attr({ src: '/img/d3/menu/menu_mng_search.svg' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "이미지 저장":
                    //     _html.append($('<img />').attr({ src: '/img/d3/menu/menu_img_save.svg' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "토폴로지 Export":
                    //     _html.append($('<img />').attr({ src: '/img/d3/menu/menu_topology_export.svg' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "초기화":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "추가":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "변경":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "이미지 등록":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "저장":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "환경설정":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "토폴로지 Import":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "Point추가":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "폴링":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "삭제":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "그룹이동":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "메모":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "회선추가":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
                    // case "정렬":
                    //     _html.append($('<img />').attr({ src: '/img/d3/icon/list_icon.png' }).css({"float": "left", "padding-right": "5px"}));
                    //     break;
					default:
                        _html.append($('<img />').attr({ src: '/img/d3/menu/d3_bullet.png' }).css({"float": "left", "padding": "5px"}));
						break;
				}

//				if(d.icon !== undefined) {


//				}
				_html.append($('<span></span>').html(d.title).css('float', 'left').css('font-size','12px'));
				if(d.childrenItems !== undefined && d.childrenItems != null && d.childrenItems.length > 0) {
					_html.append($('<img />').attr({ src: '/img/d3/menu/d3_arrow.png' }).css({ float: 'right',"padding-top": "7px","padding-right":"5px" }));
				}
//				console.log(_html.html());
				return _html.html();
			})
			.on('click', function(d, i) {
//				console.log("click");
				if(d.childrenItems !== undefined && d.childrenItems != null && d.childrenItems.length > 0) return;
				d.action(elm, data, index);
				d3.select('.d3-context-menu').style('display', 'none');
			})
			.on('mouseover', function(d, i) {
//				console.log("mouseover");
//				console.log(d);
//				console.log(i);
				try {
					d3.select(this.parentNode).select("ul").remove();
				} catch(e) {}
				try {
//				if(d.childrenItems === undefined || d.childrenItems == null) return;

                    var browserSize = {
                        width: window.innerWidth || document.body.clientWidth,
                        height: window.innerHeight || document.body.clientHeight
                    };
                    var menuSize = {
                        width: $('.d3-context-menu').width() + 10,
                        height: $('.d3-context-menu').height() + 10
                    };

                    var _left = d3.event.clientX + menuSize.width > browserSize.width? -153 : 153;

                    d3.select(this).append("ul").classed("menu_selected", true)
										// .style("left", (d3.event.pageX + d3.select(".d3-context-menu").attr("width")) + "px")
                    					// .style("top", (d3.event.pageY - 10) + "px")
						.style("left", _left + "px")
                        .style("font-size", "12px")
                        .selectAll("li")
                        .data(d.childrenItems)
                        .enter().append("li")
                        .html(function (d) {
                            var _html = $('<div></div>');
                            if (d.icon !== undefined) {
                                _html.append($('<img />').attr({src: '../img/ctxmenu/' + d.icon + '.png'}).css('float', 'left'));
                            }
                            _html.append($('<span></span>').html(d.title).css('float', 'left').css('padding-left', '5px'));
                            return _html.html();
                        })
                        .on("click", function (d, i) {
                            d.action(elm, data, index);
                            d3.select('.d3-context-menu').style('display', 'none');
                        })
                        .on('mouseover', function (d, i) {
                            d3.event.stopPropagation();
                        });
                } catch(e) {}
			})
			.on("mouseout", function(d, i) {
				try {
					// d3.select(this.parentNode).select("ul:not(.menu_selected)").remove();
				} catch(e) {}
//				if(d.hasOwnProperty("childrenItems") && d.childrenItems != null && d.childrenItems.length > 0) return;
			});

		// the openCallback allows an action to fire before the menu is displayed
		// an example usage would be closing a tooltip
		if (openCallback) openCallback(data, index);


		var browserSize = {
			width: window.innerWidth || document.body.clientWidth,
			height: window.innerHeight || document.body.clientHeight
		};
		var menuSize = {
			width: $('.d3-context-menu').width() + 10,
			height: $('.d3-context-menu').height() + 10
		};
		var _left = d3.event.clientX + menuSize.width > browserSize.width? browserSize.width - menuSize.width : d3.event.clientX,
			_top = d3.event.clientY + menuSize.height > browserSize.height? browserSize.height - menuSize.height : d3.event.clientY;

		// display context menu
		d3.select('.d3-context-menu')
			.style('left', _left + 'px')
			.style('top', _top + 'px')
			.style('display', 'block');

		d3.event.preventDefault();
		d3.event.stopPropagation();
	};
};