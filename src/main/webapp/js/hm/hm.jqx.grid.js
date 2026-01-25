var HmGrid = {
		/** get jqxGrid default options */
		getDefaultOptions : function($grid) {
			return {
				width : "99.8%",
				height : "99.8%",
				autoheight : false,		/* loading slow */
				autorowheight: false,		/* loading slow */
				theme : jqxTheme,
				pageable : true,
				pagermode: 'simple',
				columnsresize : true,
				showstatusbar : false,
				selectionmode : "singlerow",
				enabletooltips : true,
				columnsheight: 26,
				rowsheight: 22,
				filterrowheight: 30,
				toolbarheight : 30,
				sortable : true,
				altrows: false,
//				filterable: true,  				/* loading slow */
				enablebrowserselection : true,
				showpinnedcolumnbackground: false,
				showsortcolumnbackground : false,
				pagesize : 50,
				pagesizeoptions : [ "50","100", "500", "1000" ],
				localization : getLocalization('kr')
//				pagerrenderer : this.pagerrenderer
//				ready: function() {
//					$grid.jqxGrid({ filterable: true });
//				}
			};
		},

		/** create jqxGrid */
		create : function($grid, options, ctxmenuType, ctxmenuIdx) {
			var defOpts = this.getDefaultOptions($grid);

			// 그리드 헤더텍스트 정렬을 center로.. 처리
			try {
				$.each(options.columns, function(idx, value) {
					value.align = 'center';
				});
			} catch(e) {}
			$.extend(defOpts, options);
			$grid.jqxGrid(defOpts);
			if(ctxmenuType === undefined) ctxmenuType = CtxMenu.COMM;
			if(ctxmenuIdx === undefined) ctxmenuIdx = '';
			CtxMenu.create($grid, ctxmenuType, ctxmenuIdx);
		},

		/** data refresh */
		updateBoundData : function($grid, reqUrl) {
			$grid.jqxGrid("clearselection");
			var adapter = $grid.jqxGrid("source");
			if(adapter !== undefined) {
				if(adapter._source.url == null || adapter._source.url == "")
					adapter._source.url = reqUrl;

				if($grid.jqxGrid('filterable')) {
					$grid.jqxGrid("updatebounddata", "filter");
				}
				else {
					$grid.jqxGrid("updatebounddata");
				}

				// 상태바 표시상태일때 높이조절
				if($grid.jqxGrid("showstatusbar") == true) {
					var gridId = $grid.attr("id");
					setTimeout('HmGrid.setStatusbarHeight("' + gridId + '")', 500);
				}
			}
		},

		setLocalData: function($grid, data) {
			$grid.jqxGrid('source')._source.localdata = data;
			$grid.jqxGrid('updateBoundData');
		},

		/** 그리드 statusbar에 합계표현할때 height값이 맞지않아 틀어지는 현상 보완 */
		setStatusbarHeight: function(gridId) {
			$("#statusbar" + gridId).children().css("height", ($("#statusbar" + gridId).height() - 2));
		},


		/** 선택된 rowindex를 리턴 */
		getRowIdx: function($grid, msg) {
			var rowIdx = $grid.jqxGrid('getselectedrowindex');
			if(rowIdx === undefined || rowIdx === null || rowIdx == -1) {
				if(msg !== undefined) alert(msg);
				return false;
			}
			return rowIdx;
		},

		/** 선택된 rowindexes를 리턴 */
		getRowIdxes: function($grid, msg) {
			if($grid.jqxGrid('getboundrows').length == 0) {
				if(msg !== undefined) alert(msg);
				return false;
			}
			var rowIdxes = $grid.jqxGrid('getselectedrowindexes');
			if(rowIdxes === undefined || rowIdxes === null || rowIdxes.length == 0) {
				if(msg !== undefined) alert(msg);
				return false;
			}
			return rowIdxes;
		},

		/** 선택된 row의 data를 리턴 */
		getRowData: function($grid, rowIdx) {
			if(rowIdx === undefined) {
				rowIdx = $grid.jqxGrid('getselectedrowindex');
				if(rowIdx == -1) return null;
			}

			return $grid.jqxGrid('getrowdata', rowIdx);
		},

		/** 선택된 rows의 data를 리턴 */
		getRowDataList: function($grid, rowIdxes) {
			if(rowIdxes === undefined) {
				rowIdxes = $grid.jqxGrid('getselectedrowindexes');
				if(rowIdxes == null || rowIdxes.length == 0) return null;
			}

			var list = [];
			$.each(rowIdxes, function(idx, rowIdx) {
				list.push($grid.jqxGrid('getrowdata', rowIdx));
			});
			return list;
		},

		/** 선택된 row의 editing을 종료 */
		endRowEdit: function($grid) {
			var rowIdx = HmGrid.getRowIdx($grid);
			if(rowIdx !== false) {
				$grid.jqxGrid('endrowedit', rowIdx, false);
			}
		},

		/** ImageRenderer **/
		img16renderer: function(row, datafield, value){
			return '<img width="16" height="16" style="display: block; margin: auto; margin-top: 5px;" src="' + value + '"/>';
		},

		img128renderer: function(row, datafield, value){
			return '<img height="128" width="128" style="display: block; margin: auto; margin-top: 5px;" src="' + value + '"/>';
		},

		img200renderer: function(row, datafield, value){
			return '<img height="200" width="200" style="display: block; margin: auto; margin-top: 5px;" src="' + value + '"/>';
		},

		/** unit1000 */
		unit1000renderer: function (row, column, value) {
			var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
			cell += HmUtil.convertUnit1000(value);
		    cell += '</div>';
			return cell;
		},

		/** unit1024 */
		unit1024renderer: function (row, column, value) {
			var cell = '<div style="text-align: right; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;">';
			cell += HmUtil.convertUnit1024(value);
		    cell += '</div>';
			return cell;
		},

		/** 회선상태 */
		ifStatusrenderer: function(row, datafield, value) {
			if(value == null) return;
			var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
			switch(value.toUpperCase()) {
				case "ALIVE": cell += "<img src='" + ctxPath + "/img/Grid/IfStatus/alive.gif' alt='" + value + "' />"; break;
				case "DEAD": cell += "<img src='" + ctxPath + "/img/Grid/IfStatus/dead.gif' alt='" + value + "' />"; break;
				case "UNSET": cell += "<img src='" + ctxPath + "/img/Grid/IfStatus/unset.gif' alt='" + value + "' />"; break;
				default: return;
			}
			cell += "</div>";
			return cell;
		},

		/** 회선상태 */
		sensorStatusrenderer: function(row, datafield, value) {
			if(value == null) return;
			var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
			switch(value.toString()) {
			case "1": cell += "<img src='" + ctxPath + "/img/Grid/IfStatus/alive.gif' alt='" + value + "' />"; break;
			case "0": cell += "<img src='" + ctxPath + "/img/Grid/IfStatus/dead.gif' alt='" + value + "' />"; break;
			case "2": cell += "<img src='" + ctxPath + "/img/Grid/IfStatus/unset.gif' alt='" + value + "' />"; break;
			default: return;
			}
			cell += "</div>";
			return cell;
		},

		/** 장애등급 */
		evtLevelrenderer: function (row, datafield, value, defaultHTML) {
			//시작 테그만 빼고 삭제.
            defaultHTML = defaultHTML.replace(/\>.*\<\/div\>/, '') + '>';
			var _splitHTML = defaultHTML.split('"');
            for (var i = 0; i < _splitHTML.length; i++) {
                /**
				 * 브라우저 호환성 문제가 있으니 사용하지 마세요!!!
				 * String.prototype.incldues 함수는 Chrome41버전 이상, Firefox40이상, Safari9이상에서만 지원하며
				 * ie, Opera는 지원하지 않음.
                 */
                //if (_splitHTML[i].includes('class')) {
				if(_splitHTML[i].indexOf('class') != -1) {
                    _splitHTML[i + 1] += ' evtName';
                    switch (value.toString()) {
                        case "-1":
                        case "조치중":
                            _splitHTML[i + 1] += ' evt processing';
                            _splitHTML[_splitHTML.length -1] += $('#sEvtLevelMeasure').val() + '</div>';
                            break;
                        case "0":
                        case "정상":
                            _splitHTML[i + 1] += ' evt normal';
                            _splitHTML[_splitHTML.length -1] += $('#sEvtLevel0').val() + '</div>';
                            break;
                        case "1":
                        case "정보":
                            _splitHTML[i + 1] += ' evt info';
                            _splitHTML[_splitHTML.length -1] += $('#sEvtLevel1').val() + '</div>';
                            break;
                        case "2":
                        case "주의":
                            _splitHTML[i + 1] += ' evt warning';
                            _splitHTML[_splitHTML.length -1] += $('#sEvtLevel2').val() + '</div>';
                            break;
                        case "3":
                        case "알람":
                            _splitHTML[i + 1] += ' evt minor';
                            _splitHTML[_splitHTML.length -1] += $('#sEvtLevel3').val() + '</div>';
                            break;
                        case "4":
                        case "경보":
                            _splitHTML[i + 1] += ' evt major';
                            _splitHTML[_splitHTML.length -1] += $('#sEvtLevel4').val() + '</div>';
                            break;
                        case "5":
                        case "장애":
                             _splitHTML[i + 1] += ' evt critical';
                            _splitHTML[_splitHTML.length -1] += $('#sEvtLevel5').val() + '</div>';
                            break;
                        default:
                            return;
                    }
                }
            }
			return _splitHTML.join('"');
		},

		/** 토폴로지 장애등급 */
		topoEvtLevelrenderer: function (row, datafield, value, defaultHTML) {
			//시작 테그만 빼고 삭제.
			defaultHTML = defaultHTML.replace(/\>.*\<\/div\>/, '') + '>';
			var _splitHTML = defaultHTML.split('"');
			for (var i = 0; i < _splitHTML.length; i++) {
				if(_splitHTML[i].indexOf('class') != -1) {
					_splitHTML[i + 1] += ' evtName';
					switch (value.toString()) {
						case "-1":
						case "조치중":
							_splitHTML[i + 1] += ' evt processing';
							_splitHTML[_splitHTML.length -1] += $('#sEvtLevelMeasure').val() + '</div>';
							break;
						case "0": case "1": case "정상":
							_splitHTML[i + 1] += ' evt normal';
							_splitHTML[_splitHTML.length -1] += $('#sEvtLevel0').val() + '</div>';
							break;
						case "2":
						case "정보":
							_splitHTML[i + 1] += ' evt info';
							_splitHTML[_splitHTML.length -1] += $('#sEvtLevel1').val() + '</div>';
							break;
						case "3":
						case "주의":
							_splitHTML[i + 1] += ' evt warning';
							_splitHTML[_splitHTML.length -1] += $('#sEvtLevel2').val() + '</div>';
							break;
						case "4":
						case "알람":
							_splitHTML[i + 1] += ' evt minor';
							_splitHTML[_splitHTML.length -1] += $('#sEvtLevel3').val() + '</div>';
							break;
						case "5":
						case "경보":
							_splitHTML[i + 1] += ' evt major';
							_splitHTML[_splitHTML.length -1] += $('#sEvtLevel4').val() + '</div>';
							break;
						case "6":
						case "장애":
							_splitHTML[i + 1] += ' evt critical';
							_splitHTML[_splitHTML.length -1] += $('#sEvtLevel5').val() + '</div>';
							break;
						default:
							return;
					}
				}
			}
			return _splitHTML.join('"');
		},

		/** 헬스체크 */
		healthChkrenderer: function (row, datafield, value, defaultHTML) {
			//시작 테그만 빼고 삭제.
            defaultHTML = defaultHTML.replace(/\>.*\<\/div\>/, '') + '>';
			var _splitHTML = defaultHTML.split('"');
            for (var i = 0; i < _splitHTML.length; i++) {
                /**
				 * 브라우저 호환성 문제가 있으니 사용하지 마세요!!!
				 * String.prototype.incldues 함수는 Chrome41버전 이상, Firefox40이상, Safari9이상에서만 지원하며
				 * ie, Opera는 지원하지 않음.
                 */
                //if (_splitHTML[i].includes('class')) {
				if(_splitHTML[i].indexOf('class') != -1) {
                    _splitHTML[i + 1] += ' evtName';
                    switch (value.toString()) {
                        case "1":
                        case "정상":
                            _splitHTML[i + 1] += ' evt normal';
                            _splitHTML[_splitHTML.length -1] += value.toString() + '</div>';
                            break;
                        case "0":
                        case "장애":
                             _splitHTML[i + 1] += ' evt critical';
                            _splitHTML[_splitHTML.length -1] += value.toString() + '</div>';
                            break;
                        default:
                            return;
                    }
                }
            }
			return _splitHTML.join('"');
		},
    	evtLevelFilterRenderer: function (index, label, value) {
            switch (value.toString()) {
                case "-1":
                case "조치중":
                    return $('#sEvtLevelMeasure').val();
                case "0":
                case "정상":
                    return $('#sEvtLevel0').val();
                case "1":
                case "정보":
                    return $('#sEvtLevel1').val();
                case "2":
                case "주의":
                    return $('#sEvtLevel2').val();
                case "3":
                case "알람":
                    return $('#sEvtLevel3').val();
                case "4":
                case "경보":
                    return $('#sEvtLevel4').val();
                case "5":
                case "장애":
                    return $('#sEvtLevel5').val();
                default:
                    return label;
            }
        },

        healthChkFilterRenderer: function (index, label, value) {
            switch (value.toString()) {
                case "1":
                case "정상":
                    return "정상";
                case "0":
                case "장애":
                    return "장애";
                default:
                    return label;
            }
        },
        
		/** 게시판 상태 */
		boardStatusrenderer: function (row, datafield, value) {
			if(value == null) return;
			var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
			switch(value.toString()) {
			case "요청":
				cell += "<img src='" + ctxPath + "/img/Grid/apply.png' alt='" + value + "'/>";
				break;
			case "처리":
				cell += "<img src='" + ctxPath + "/img/Grid/check.png' alt='" + value + "'/>";
				break;
			default: return;
			}
			cell += "</div>";
			return cell;
		},

		/** 작업진행 상태 */
		jobFlagrenderer: function (row, datafield, value) {
			if(value == null) return;
			var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
			switch(value.toString()) {
			case "0": case "신청":
				cell += "<img src='" + ctxPath + "/img/Grid/JobFlag/apply.png' alt='" + value + "'/>";
				break;
			case "1": case "승인":
				cell += "<img src='" + ctxPath + "/img/Grid/JobFlag/confirm.png' alt='" + value + "'/>";
				break;
			default: return;
			}
			cell += "</div>";
			return cell;
		},

		/** 중요도 */
		jobLevelrenderer: function (row, datafield, value) {
			if(value == null) return;
			var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
			switch(value.toString()) {
			case "1": case "낮음":
				cell += "<img src='" + ctxPath + "/img/Grid/JobLevel/importance_1.png' alt='" + value + "'/>";
				break;
			case "2": case "보통":
				cell += "<img src='" + ctxPath + "/img/Grid/JobLevel/importance_2.png' alt='" + value + "'/>";
				break;
			case "3": case "높음":
				cell += "<img src='" + ctxPath + "/img/Grid/JobLevel/importance_3.png' alt='" + value + "'/>";
				break;
			default: return;
			}
			cell += "</div>";
			return cell;
		},

		/** 이벤트 지속시간 (second) */
		cTimerenderer: function (row, datafield, value) {
			var result = HmUtil.convertCTime(value);
		    return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + result + "</div>";
		},

		/** 시간 (milisecond) */
		milisecrenderer: function (row, datafield, value) {
			var result = HmUtil.convertMilisecond(value);
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + result + "</div>";
		},

		/** 컬럼값에 ms 단위 추가 */
        milisecTextrenderer: function (row, datafield, value) {
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + value +"ms</div>";
		},

		/** 이미지 장비타입 */
		imgDevkind1renderer: function(row, columnfield, value, defaulthtml, columnproperties) {
			var gridId = $(this.owner.wrapper).attr("id").replace("wrapper", "");
			if(gridId == null) return value;
			var imgUrl = $('#' + gridId).jqxGrid('getrowdata', row).devKind1ImgUrl;
			var cell = "<div style='margin-top: 2px; margin-left: 4px; margin-right: 2px;'>"
				+ "<img src='" + ($('#websvcUrl').val() + imgUrl) + "'>&nbsp;" + value
				+ "</div>";
			return cell;
		},

		/** 비밀번호 */
		pwdrenderer: function (row, datafield, value) {
			return "<div style='margin-top: 4px; margin-left: 5px' class='jqx-left-align'>**********</div>";
		},

		/** 컬럼값에  온도(℃) 추가 */
		temperaturerenderer: function (row, datafield, value) {
            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + value +"℃</div>";
		},

		/** 값 + comumntype을 사용  */
        customColumnTypererenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
        	//console.log(columnproperties.columntype);
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + value + columnproperties.columntype + "</div>";
		},

		/** ROW NO */
		rownumrenderer: function (row, datafield, value) {
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + (row + 1) +"</div>";
		},

		/** 천단위 자릿수 콤마 표현 */
		commaRenderer: function(row, datafield, value) {
        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) +"</div>";
		},
		commaRendererCenter: function(row, datafield, value) {
			return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + HmUtil.commaNum(value) +"</div>";
		},

		/** 사용자 계정상태 */
		usrStaterenderer: function (row, datafield, value) {
			var cell = "<div style='margin-top: 4px; margin-left: 5px' class='jqx-left-align'>";
			switch(value.toString()) {
			case "0": cell += "정지"; break;
			case "1": cell += "승인"; break;
			case "2": cell += "대기"; break;
			case "3": cell += "잠김"; break;
			}
			cell += "</div>";
			return cell;
		},

		/** 장비종류1 */
		devKind1renderer: function (row, datafield, value) {
			var cell = "<div style='margin-top: 4px; margin-left: 5px' class='jqx-left-align'>";
			switch(value.toString()) {
				case "DEV": cell += "장비"; break;
				case "SVR": cell += "서버"; break;
				default: cell += value.toString(); break;
			}
			cell += "</div>";
			return cell;
		},

		/** AP 상태 */
		apStatusrenderer: function (row, datafield, value) {
			if(value == null) return;
			var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
			switch(value.toUpperCase()) {
				case "UP": cell += "<img src='" + ctxPath + "/img/Grid/ApStatus/ap_up.png' alt='" + value + "' />"; break;
				case "DOWN": cell += "<img src='" + ctxPath + "/img/Grid/ApStatus/ap_down.png' alt='" + value + "' />"; break;
				default: break;
			}
			cell += "</div>";
			return cell;
		},

		/** progressbar */
		progressbarrenderer:function (row, column, value) {
			var cellWidth = 100;
			try {
				cellWidth = parseInt($(this)[0].width);
			} catch(e) {}
			
			var cell = '<div style="margin-top:4px; text-align: center;">';
			cell += '<div style="background: #37B8EF; position: relative; width: ' + (cellWidth/100*value) + 'px; height: 16px;"></div>';
			cell += '<div style="margin-left: 5px; position: relative; top: -15px;">' + value.toString() + '%' + '</div>';
			cell += '</div>';
			return cell;
		},

		/** SNMP Version */
		snmpVerrenderer: function (row, datafield, value) {
			var cell = "<div style='margin-top: 4px; margin-left: 5px' class='jqx-left-align'>";
			switch(value.toString()) {
			case "1": cell += "Ver1"; break;
			case "2": cell += "Ver2"; break;
			case "3": cell += "Ver3"; break;
			}
			cell += "</div>";
			return cell;
		},


		/** title */
		titlerenderer: function(toolbar, title, elemId) {
			var container = $('<div style="margin: 5px;"></div>');
			var span;
			if(elemId !== null && elemId !== undefined) {
				span = $('<span style="float: left; font-weight: bold; margin-top: 5px; margin-right: 4px;" id="' + elemId + '">' + title + '</span>');
			}
			else {
				span = $('<span style="float: left; font-weight: bold; margin-top: 5px; margin-right: 4px;">' + title + '</span>');
			}
			toolbar.empty();
	    	toolbar.append(container);
	    	container.append(span);
		},

		/** flow 수집여부 */
		tmsFlowRenderer: function(row, datafield, value) {
			var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
			switch(value.toString()) {
			case "Y":
				cell += "<img src='" + ctxPath + "/img/Grid/TmsFlow/yes.png' alt='" + value + "'/>";
				break;
			case "N":
				cell += "<img src='" + ctxPath + "/img/Grid/TmsFlow/no.png' alt='" + value + "'/>";
				break;
			}
			cell += "</div>";
			return cell;
		},

		/**============================================
		 * aggregatesrenderer
		 ============================================*/
		agg_unit1024sumrenderer: function(aggregates) {
			var value = aggregates['sum'];
			if(isNaN(value)) value = 0;
			return '<div style="float: right; margin: 4px; overflow: hidden;">' + HmUtil.convertUnit1024(value) + '</div>';
		},

		agg_unit1000sumrenderer: function(aggregates) {
			var value = aggregates['sum'];
			if(isNaN(value)) value = 0;
			return '<div style="float: right; margin: 4px; overflow: hidden;">' + HmUtil.convertUnit1000(value) + '</div>';
		},

		agg_sumrenderer: function(aggregates) {
			var value = aggregates['sum'];

			//if(!isNaN(value)) value = 0;
			return '<div style="font-size:20px;float: right; margin: 4px; overflow: hidden;">총 : <b>' + HmUtil.commaNum(value) + '</b>건</div>';
		},

		/**============================================
		 * header renderer
		 ============================================*/
		ckheaderRenderer: function(header) {
			return '<div style="margin: 4.5px 4px 4.5px 4px; text-align: center; overflow: hidden; padding-bottom: 2px; -ms-text-overflow: ellipsis;">' +
						'<div class="ckheader" style="float: left; margin: 0 auto;"></div>' +
				 		'<span style="cursor: default; -ms-text-overflow: ellipsis;">' + header + '</span>' +
			 		'</div>';
		},

		ckheaderRendered: function(element, grid, datafield) {
			var ckobj = $(element).children('.ckheader');
			ckobj.jqxCheckBox({ theme: jqxTheme, width: 16, height: 16, hasThreeStates: false })
				.on('change', function(event) {
					var _newval = event.args.checked? 1 : 0;
					var _list = grid.jqxGrid('getdisplayrows');
					if(_list == null || _list.length == 0) return;
					grid.jqxGrid('beginupdate');
					// 데이터 변경 후 sort이벤트가 발생하여 강제해제
					grid.jqxGrid('setcolumnproperty', datafield, 'sortable', false);
					$.each(_list, function(idx, value) {
						grid.jqxGrid('setcellvalue', value.visibleindex, datafield, _newval);
					});
					grid.jqxGrid('endupdate');
					// 데이터 변경 후 sort이벤트가 발생하여 강제해제 해지..
					setTimeout(function() { grid.jqxGrid('setcolumnproperty', datafield, 'sortable', true); }, 500);
				});
			return true;
		},

		/**============================================
		 * validation
		 ============================================*/
        requireIpValidation: function(cell, value) {
            if($.isBlank(value)) {
                return { result: false, message: 'IP를 입력해주세요.' };
            }
            if(!$.validateIp(value)) {
                return { result: false, message: 'IP형식이 유효하지 않습니다.' };
            }
            return true;
        },

		portValidation: function(cell, value) {
            if(value.toString().length > 5) {
                return { result: false, message: '0~99999사이의 값을 입력해주세요.' };
            }
            return true;
		}

};

