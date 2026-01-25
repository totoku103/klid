var HmUtil = {
		/** window.open() 팝업 */
		showPopup: function(url, frm, popNm, popW, popH) {
			var host = location.hostname.replace(/\./g, '_');
			popNm = popNm + host;
			var opts = [];
			opts.push('width=' + popW);
			opts.push('height=' + popH);
			opts.push('left=' + parseInt((screen.availWidth / 2) - (popW / 2)));
			opts.push('top=' + parseInt((screen.availHeight / 2) - (popH / 2)));
			opts.push('resizable=yes');
			opts.push('scrollbars=yes');
			opts.push('status=no');

			var win = window.open('', popNm, opts.join(','));
			if(win!=null && !win.closed)
				win.focus();
			frm.attr('method', 'POST');
			frm.attr('target', popNm);
			frm.attr('action', ctxPath + url);
			frm.submit();
			frm.empty();
			return win;
		},

		createPopup: function(url, frm, popNm, popW, popH, params) {
			frm.empty();
			if(params !== undefined) {
				$.each(params, function(key, value) {
					$('<input />', { type: 'hidden', id: key, name: key, value: value }).appendTo(frm);
				});
			}
			return this.showPopup(url, frm, popNm, popW, popH);
		},

		createFullPopup : function(url, frm, popNm,params) {
			frm.empty();
			var host = location.hostname.replace(/\./g, '_');
			popNm = popNm + host;
			if (params !== undefined && params !== null) {
				$('<input />', { type : 'hidden', id : 'dashLocal', name : 'dashLocal', value : params }).appendTo(frm);
			}
			var opts = [];
			opts.push('fullscreen=no');
			opts.push('resizable=yes');
			opts.push('scrollbars=yes');
			opts.push('status=no');

			window.open('', popNm, opts.join(',')).focus();
			frm.attr('method', 'POST');
			frm.attr('target', popNm);
			frm.attr('action', url);
			frm.submit();
            frm.empty();
		},

		/**
		 * 차트를 서버에 저장(export폴더)한 후 파일명을 리턴함.
		 * 엑셀에 차트를 삽입할때 사용!
		 * @param chart	차트Object
		 * @return 파일명
		 */
		saveChart: function(chart) {
			var fname = $.format.date(new Date(), 'yyyyMMddHHmmssSSS') + '.png';
			chart.jqxChart('saveAsPNG', fname, ctxPath + '/api/file/saveChart', true);
			return fname;
		},

		/**
		 * 차트를 png파일로 export
		 * @param chart
		 */
		exportChart: function(chart, fname) {
			chart.jqxChart('saveAsPNG', fname, ctxPath + '/api/file/exportChart');
		},

		/**
		 * Highchart export
		 */
		exportHighchart: function(chart, fname) {
			// chart export size를 조정하여 svg 추출
			var svg = chart.getSVG({
				exporting: {
		            sourceWidth: chart.chartWidth,
		            sourceHeight: chart.chartHeight
		        }
			});
		    var canvas = document.createElement('canvas');
		    canvg(canvas, svg); //svg -> canvas draw
			var imgData = canvas.toDataURL("image/png"); // png이미지로 변환 후 octect-stream으로 변환
			
			this.sendHiddenForm('/api/file/exportHighchart', { fname: fname, imgData: imgData });
		},
		
		sendHiddenForm: function(url, params) {
			var frm = $('#hForm');
			frm.empty();
			if (params !== undefined && params !== null) {
				$.each(params, function(key, value) {
					$('<input />', { type : 'hidden', id : key, name : key, value : value }).appendTo(frm);
				});
			}
			frm.attr('method', 'POST');
			frm.attr('target', 'hFrame');
			frm.attr('action', url);
			frm.submit();
			frm.empty();
		},
		
		/**
		 * Highchart를 png파일로 서버에 저장(export폴더)
		 */
		saveHighchart: function(chart, afterFunc, params) {
			var fname = $.format.date(new Date(), 'yyyyMMddHHmmssSSS') + '.png';
			// chart export size를 조정하여 svg 추출
			var svg = chart.getSVG({
				exporting: {
		            sourceWidth: chart.chartWidth,
		            sourceHeight: chart.chartHeight
		        }
			});
		    var canvas = document.createElement('canvas');
		    canvg(canvas, svg); //svg -> canvas draw
			var imgData = canvas.toDataURL("image/png"); // png이미지로 변환
			var ch_params={ fname: fname, imgData: imgData };
//			console.log("chart param = ",ch_params);
//			$.post('/file/saveHighchart.do', ch_params, 
//					function(result) {
//				console.log(result);
//						if(afterFunc!=null)
//							afterFunc(params);
//					}
//			);
			
			Server.post('/api/file/saveHighchart', {
				data: ch_params,
				success: function(result) { 
//					console.log(result);
					if(afterFunc!=null){//이미지 저장 후 바로 엑셀 출력시
//						console.log(fname);
						params.imgFile = fname;
						afterFunc(params);
					}
				} 
			});
			return fname;
		},

		exportCodeFile: function (url,params) {
            var loader = $('#comLoader');
            if(loader.length <= 0) {
                loader = $('<div id="comLoader" style="z-index: 100000"></div>');
                loader.appendTo('body');
            }
            loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '파일을 다운중입니다. 잠시만 기다려주세요.' });
            loader.jqxLoader('open');
            if(params == null) params = {};
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(params),
                success: function(data, status) {
                    loader.jqxLoader('close');
                    if(data.hasError) {
                        alert(data.errorInfo.message);
                        return;
                    }
                    $('#hForm').empty();
                    if(params !== undefined) {
                        $.each(params, function(key, value) {
                            $('<input />', { type: 'hidden', id: data.resultData.filePath, name: data.resultData.filePath, value: data.resultData.fileName }).appendTo($('#hForm'));
                        });
                    }
                    $('#hForm').attr('action', ctxPath + '/api/file/codeDownload');
                    $('#hForm').attr('method', 'post');
                    $('#hForm').attr('target', 'hFrame');
                    $('#hForm').submit();
                }
            });
        },
		
		/**
		 * 엑셀 export
		 * @param url
		 * @param params
		 */
		exportExcel: function(url, params) {
			var loader = $('#comLoader');
			if(loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '엑셀을 생성중입니다. 잠시만 기다려주세요.' });
			loader.jqxLoader('open');
			if(params == null) params = {};
			$.ajax({
				type: 'post',
				url: url,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(params),
				success: function(data, status) {
					loader.jqxLoader('close');
					if(data.hasError) {
						alert(data.errorInfo.message);
						return;
					}
					HmUtil.fileDown({ filePath: data.resultData.filePath, fileName: data.resultData.fileName });
				}
			});

//			$.post(url, params,
//					function(result) {
//						loader.jqxLoader('close');
//						if(result.hasError) {
//							alert(result.errorInfo.message);
//							return;
//						}
//						HmUtil.fileDown({ filePath: result.resultData.filePath, fileName: result.resultData.fileName });
//					}
//			);
		},


		/**
		 * 한글 export
		 * @param url
		 * @param params
		 */
		exportHwp: function(url, params) {
			var loader = $('#comLoader');
			if(loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '한글을 생성중입니다. 잠시만 기다려주세요.' });
			loader.jqxLoader('open');
			if(params == null) params = {};
			$.ajax({
				type: 'post',
				url: url,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(params),
				success: function(data, status) {
					loader.jqxLoader('close');
					if(data.hasError) {
						alert(data.errorInfo.message);
						return;
					}
					HmUtil.fileDown({ filePath: data.resultData.filePath, fileName: data.resultData.fileName, fileExt: data.resultData.fileExt });
				}
			});

	//			$.post(url, params,
	//					function(result) {
	//						loader.jqxLoader('close');
	//						if(result.hasError) {
	//							alert(result.errorInfo.message);
	//							return;
	//						}
	//						HmUtil.fileDown({ filePath: result.resultData.filePath, fileName: result.resultData.fileName });
	//					}
	//			);
		},

		downloadEmlCsv: function(url, params) {
			var loader = $('#comLoader');
			if(loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '양식 다운중입니다. 잠시만 기다려주세요.' });
			loader.jqxLoader('open');
			if(params == null) params = {};
			$.ajax({
				type: 'post',
				url: url,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(params),
				success: function(data, status) {
					loader.jqxLoader('close');
					if(data.hasError) {
						alert(data.errorInfo.message);
						return;
					}
					HmUtil.fileDown({ filePath: data.resultData.filePath, fileName: data.resultData.fileName, fileExt: data.resultData.fileExt });
				}
			});
		},

		/** jqxGrid excel export */
		exportGrid: function ($grid, filename, isAllExport, $params) {
            if(isAllExport === undefined) isAllExport = true;

			var groups = $grid.jqxGrid('columnGroups');
			var headerGrps = [];
            if (groups != null && groups.length > 0) {
                $.each(groups, function (idx, group) {
                    var _colspan = 0;
                    $.each(group.columns, function(gidx, gcol) {
                        if(!gcol.hidden) _colspan++;
                    });
                    headerGrps.push({text: group.text, name: group.name, colspan: _colspan});
                });
            }
			var records = $grid.jqxGrid('columns').records;
			var headers = [];
            $.each(records, function (idx, record) {
                if (record.datafield == null || record.hidden) return;
                var _cellsrenderer = null;
                if(record.cellsrenderer != null && record.cellsrenderer.prototype.hasOwnProperty('name')) {
                    _cellsrenderer = record.cellsrenderer.prototype.name();
                }
                headers.push({
                    text: record.text,
                    columngroup: record.columngroup,
                    datafield: record.displayfield != null ? record.displayfield : record.datafield,
                    cellsrenderer: _cellsrenderer,
                    width: record.width,
                    columntype: record.columntype
                });
            });
			var loader = $('#comLoader');
			if (loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({isModal: false, width: 300, height: 70, theme: jqxTheme, text: '엑셀을 생성중입니다. 잠시만 기다려주세요.'});
			loader.jqxLoader('open');

			$.ajax({
				type: 'post',
				url: '/api/file/exportGrid',
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify({
					filename: filename,
					headerGrps: headerGrps,
					header: headers,
					data: $grid.jqxGrid('getboundrows'),
					params: $params
				}),
				success: function (data, status) {
					loader.jqxLoader('close');
					if (data.hasError) {
						alert(data.errorInfo.message);
						return;
					}
					HmUtil.fileDown({filePath: data.resultData.filePath, fileName: data.resultData.fileName});
				}
			});
		},

		fileDown: function(params) {
			$('#hForm').empty();
			if(params !== undefined) {
				$.each(params, function(key, value) {
					$('<input />', { type: 'hidden', id: key, name: key, value: value }).appendTo($('#hForm'));
				});
			}
			$('#hForm').attr('action', ctxPath + '/api/file/fileDown');
			$('#hForm').attr('method', 'post');
			$('#hForm').attr('target', 'hFrame');
			$('#hForm').submit();
		},

		showLoader: function(msg) {
			var loader = $('#comLoader');
			if(loader.length <= 0) {
				loader = $('<div id="comLoader" style="z-index: 100000"></div>');
				loader.appendTo('body');
			}
			loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: msg || '잠시만 기다려주세요.' });
			loader.jqxLoader('open');
		},

		hideLoader: function() {
			var loader = $('#comLoader');
			if(loader.length > 0) {
				loader.jqxLoader('close');
			}
		},

		/**
		 * Unit1000 convert
		 * @param value
		 * @returns {String}
		 */
		convertUnit1000: function(value) {
			var retnVal = '';
			var result = '';
			if (value >= 0) {
		        if (value >= Math.pow(1000, 4)) {
		            result = Math.round((value / Math.pow(1000, 4)) * 100);
		            retnVal += (result / 100) + " T";
		        }
		        else if (value >= Math.pow(1000, 3)) {
		            result = Math.round((value / Math.pow(1000, 3)) * 100);
		            retnVal += (result / 100) + " G";
		        }
		        else if (value >= Math.pow(1000, 2)) {
		            result = Math.round((value / Math.pow(1000, 2)) * 100);
		            retnVal += (result / 100) + " M";
		        }
		        else if (value >= Math.pow(1000, 1)) {
		            result = Math.round((value / Math.pow(1000, 1)) * 100);
		            retnVal += (result / 100) + " K";
		        }
		        else {
			        result = Math.round(value * 100);
			        retnVal += (result / 100);
		        }
		    }
		    else {
		        value = -value;
		        if (value >= Math.pow(1000, 4)) {
		            result = Math.round((value / Math.pow(1000, 4)) * 100);
		            retnVal += "- " + (result / 100) + " T";
		        }
		        else if (value >= Math.pow(1000, 3)) {
		            result = Math.round((value / Math.pow(1000, 3)) * 100);
		            retnVal += "- " + (result / 100) + " G";
		        }
		        else if (value >= Math.pow(1000, 2)) {
		            result = Math.round((value / Math.pow(1000, 2)) * 100);
		            retnVal += "- " + (result / 100) + " M";
		        }
		        else if (value >= Math.pow(1000, 1)) {
		            result = Math.round((value / Math.pow(1000, 1)) * 100);
		            retnVal += "- " + (result / 100) + " K";
		        }
		        else {
			        result = Math.round(value * 100);
			        retnVal += "- " + (result / 100);
		        }
		    }
			return retnVal;
		},

		/**
		 * Unit1024 convert
		 * @param value
		 * @returns {String}
		 */
		convertUnit1024: function(value) {
			var retnVal = '';
			var result = '';
			if (value >= 0) {
		        if (value >= Math.pow(1024, 4)) {
		            result = Math.round((value / Math.pow(1024, 4)) * 100);
		            retnVal += (result / 100) + " T";
		        }
		        else if (value >= Math.pow(1024, 3)) {
		            result = Math.round((value / Math.pow(1024, 3)) * 100);
		            retnVal += (result / 100) + " G";
		        }
		        else if (value >= Math.pow(1024, 2)) {
		            result = Math.round((value / Math.pow(1024, 2)) * 100);
		            retnVal += (result / 100) + " M";
		        }
		        else if (value >= Math.pow(1024, 1)) {
		            result = Math.round((value / Math.pow(1024, 1)) * 100);
		            retnVal += (result / 100) + " K";
		        }
		        else {
			        result = Math.round(value * 100);
			        retnVal += (result / 100) + " B";
		        }
		    }
		    else {
		        value = -value;
		        if (value >= Math.pow(1024, 4)) {
		            result = Math.round((value / Math.pow(1024, 4)) * 100);
		            retnVal += "- " + (result / 100) + " T";
		        }
		        else if (value >= Math.pow(1024, 3)) {
		            result = Math.round((value / Math.pow(1024, 3)) * 100);
		            retnVal += "- " + (result / 100) + " G";
		        }
		        else if (value >= Math.pow(1024, 2)) {
		            result = Math.round((value / Math.pow(1024, 2)) * 100);
		            retnVal += "- " + (result / 100) + " M";
		        }
		        else if (value >= Math.pow(1024, 1)) {
		            result = Math.round((value / Math.pow(1024, 1)) * 100);
		            retnVal += "- " + (result / 100) + " K";
		        }
		        else {
			        result = Math.round(value * 100);
			        retnVal += "- " + (result / 100);
		        }
		    }
			return retnVal;
		},

		/**
		 * Object 복제
		 * @param obj
		 * @returns
		 */
		clone: function(obj) {
			if(obj == null || typeof(obj) != 'object') return obj;
			var newObj = obj.constructor();
			for(var key in obj) {
				if(obj.hasOwnProperty(key)) {
					newObj[key] = HmUtil.clone(obj[key]);
				}
			}
			return newObj;
		},

		/**
		 * 초단위를 년/월/일/시/분/초 로 변환
		 * @param value
		 * @returns {String}
		 */
		convertCTime: function(value) {
			var result = '';
			var time = value;
		    var year, day, hour, min, result = '';
		    if((60 * 60 * 24 * 365) <= time) {
		    	year = Math.floor(time / (60 * 60 * 24 * 365));
		    	time = time - ((60 * 60 * 24 * 365) * year);
		    	result += year + '년 ';
		    }
		    if ((60 * 60 * 24) <= time) {
		        day = Math.floor(time / (60 * 60 * 24));
		        time = time - ((60 * 60 * 24) * day);
		        result += day + '일 ';
		    }
		    if ((60 * 60) <= time) {
		        hour = Math.floor(time / (60 * 60));
		        time = time - ((60 * 60) * hour);
		        result += hour + '시 ';
		    }
		    if (60 <= time) {
		        min = Math.floor(time / 60);
		        time = time - (60 * min);
		        result += min + '분 ';
		    }

		    if (time != '' && time != 0 ) {
		    	if(isNaN(time)) time = 0;
		    	if (time < 0) time = 0;
		        result += time + '초 ';
		    }
		    else {
		    	result += '0초';
		    }
		    return result;
		},

		/**
		 * 밀리초를 년/월/일/시/분/초로 변환
		 */
		convertMilisecond: function(value) {
			return this.convertCTime(Math.ceil(value / 1000));
		},

		/**
		 * IP to Long
		 * @param value
		 * @returns
		 */
		convertIpToLong: function(value) {
			var d = value.split('.');
			return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
		},

		/**
		 * Long to IP
		 * @param value
		 * @returns
		 */
		convertLongToIp: function(value) {
			var d = value % 256;
			for(var i = 3; i > 0; i--) {
				value = Math.floor(value / 256);
				d = value % 256 + '.' + d;
			}
			return d;
		},

		/**
		 * Event Level to Custom Event Name
		 * @param value
		 * @returns
		 */
		convertEvtLevelToEvtName: function (value) {
			if (value === null) return '';
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
                    return value.toString();
            }
        },

		/**
		 * 천단위 콤마 함수		1000000 => 1,000,000
		 */
		commaNum: function(num) {
			//return num + '+'
			var len, point, str;
			num = num + "";
			point = num.length % 3;
			len = num.length;
			str = num.substring(0, point);
			while (point < len) {
				if (str != "") str += ",";
				str += num.substring(point, point + 3);
				point += 3;
			}
			return str;
		},

		/**
		 * UUID생성
		 * @returns
		 */
		generateUUID: function() {
		    var d = new Date().getTime();
		    var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		    });
		    return uuid;
		},

		/**
		 * <option> 태그 동적생성
		 * @param objSelect
		 * @param data
		 */
		createOptionTag: function(objSelect, data, strLabelField, strValueField){
			if(data == null || data.length == 0){
				objSelect.empty();
				return;
			}

			if(strLabelField === undefined) strLabelField = "label";
			if(strValueField === undefined) strValueField = "value";

			var options = '';
			for(var i = 0; i < data.length; i++){
				options += "<option value='" + data[i][strValueField]+ "'>" + data[i][strLabelField] + "</option>";
			}

			objSelect.html(options);
		},

		// 파일 첨부 목록 DOM 구성.
		attachFileList : function(returnData, flag, elementName) {

			var eleName = elementName == undefined ? "attachFileList" : elementName;
			var divEle = document.getElementById(eleName);

			if (divEle == null || divEle == undefined)
				return;

			var ulEle = document.createElement("ul");

			var i = 0;
			var cycleN = returnData.length;

			for (; i < cycleN; i++) {
				var liEle = document.createElement("li");
				var newDivEle = document.createElement("div");

				var aEle = document.createElement("a");
				aEle.setAttribute("href", ctxPath + "/api/file/download?fileNo=" + returnData[i].fileNo);
				aEle.innerHTML = returnData[i].originalFileName;

				newDivEle.appendChild(aEle);
				if (flag) {
					var aEle2 = document.createElement("a");
					aEle2.setAttribute("id", "fileNo" + returnData[i].fileNo);
					// aEle2.setAttribute("href", ctxPath + "/file/delete.do?fileNo=" + returnData[i].fileNo);
					aEle2.setAttribute("href", "#");
					aEle2.innerHTML = "&nbsp;<img src='../../img/popup/cancel_icon.png' >";

					newDivEle.appendChild(aEle2);

				}

				liEle.appendChild(newDivEle);
				divEle.appendChild(ulEle.appendChild(liEle));

				// X 버튼에 이벤트 등록..
				var _fileNo = returnData[i].fileNo;

				var clickEventElement = document.getElementById("fileNo" + _fileNo);

				// 파일 다운로드만 할경우는 id가 없어서 넘어간다...
				if (clickEventElement === null || clickEventElement === undefined)
					continue;

				clickEventElement.onclick = function() {
					var removeFileId = this.getAttribute('id').replace(/[^0-9]/g, "");
					$.ajax({
						type : "post",
						url : $('#ctxPath').val() + '/api/file/delete',
						data : {
							fileNo : this.getAttribute('id').replace(/[^0-9]/g, "")
						},
						dataType : "json",
						success : function(jsonData) {
							// var searchElement = document.getElementById("fileNo" + removeFileId);
							// searchElement.parentNode.removeChild(searchElement);
							document.getElementById("fileNo" + removeFileId).parentNode.parentNode.removeChild(document.getElementById("fileNo" + removeFileId).parentNode)
						}
					});
				}

			}
		},
		
		//사고접수용 첨부파일
		attachAccFileList : function(returnData, flag, elementName) {
			var eleName = elementName == undefined ? "attachFileList" : elementName;
			var divEle = document.getElementById(eleName);

			if (divEle == null || divEle == undefined)
				return;

			var ulEle = document.createElement("ul");

			var i = 0;
			var cycleN = returnData.length;

			for (; i < cycleN; i++) {
				var liEle = document.createElement("li");
				var newDivEle = document.createElement("div");

				var aEle = document.createElement("a");
				aEle.setAttribute("href", ctxPath + "/api/file/accDownload?fileNo=" + returnData[i].fileNo);
				aEle.innerHTML = returnData[i].originalFileName;

				newDivEle.appendChild(aEle);
				if (flag) {
					var aEle2 = document.createElement("a");
					aEle2.setAttribute("id", "fileNo" + returnData[i].fileNo);
					// aEle2.setAttribute("href", ctxPath + "/file/accDelete.do?fileNo=" + returnData[i].fileNo);
					aEle2.setAttribute("href", "#");
					aEle2.innerHTML = "&nbsp;<img src='../../img/popup/cancel_icon.png' >";

					newDivEle.appendChild(aEle2);

				}

				liEle.appendChild(newDivEle);
				divEle.appendChild(ulEle.appendChild(liEle));

				// X 버튼에 이벤트 등록..
				var _fileNo = returnData[i].fileNo;

				var clickEventElement = document.getElementById("fileNo" + _fileNo);

				// 파일 다운로드만 할경우는 id가 없어서 넘어간다...
				if (clickEventElement === null || clickEventElement === undefined)
					continue;

				clickEventElement.onclick = function() {
					if(!confirm("삭제 하시겠습니까?")) return;
					var removeFileId = this.getAttribute('id').replace(/[^0-9]/g, "");
					$.ajax({
						type : "post",
						url : $('#ctxPath').val() + '/api/file/accDelete',
						data : {
							fileNo : this.getAttribute('id').replace(/[^0-9]/g, "")
						},
						dataType : "json",
						success : function(jsonData) {
							// var searchElement = document.getElementById("fileNo" + removeFileId);
							// searchElement.parentNode.removeChild(searchElement);
							document.getElementById("fileNo" + removeFileId).parentNode.parentNode.removeChild(document.getElementById("fileNo" + removeFileId).parentNode)
						}
					});
				}

			}
		},

		attachHelpFileList : function(returnData, flag, elementName, typeName) {
			var eleName = elementName == undefined ? "attachFileList2" : elementName;
			var divEle = document.getElementById(eleName);

			if (divEle == null || divEle == undefined)
				return;

			var ulEle = document.createElement("ul");

			var i = 0;
			var cycleN = returnData.length;

			for (; i < 1; i++) {
				var liEle = document.createElement("li");
				var newDivEle = document.createElement("div");

				var aEle = document.createElement("a");
				aEle.setAttribute("href", ctxPath + "/api/file/codeDownload?code2=" + returnData.comCode2);
				aEle.innerHTML = typeName;

				newDivEle.appendChild(aEle);

				if(returnData.comCode3 != null){
                    var aEle2 = document.createElement("a");
                    //aEle2.setAttribute("id", "fileNo" + returnData[i].fileNo);
                    // aEle2.setAttribute("href", ctxPath + "/file/accDelete.do?fileNo=" + returnData[i].fileNo);
                    aEle2.setAttribute("href", "#");
                    //aEle2.innerHTML = "&nbsp;<img src='../../img/popup/cancel_icon.png' >";

                    newDivEle.appendChild(aEle2);

                    liEle.appendChild(newDivEle);
                    divEle.appendChild(ulEle.appendChild(liEle));
				}



				// X 버튼에 이벤트 등록..
				var _fileNo = returnData.comCode2;

				var clickEventElement = document.getElementById("fileNo" + _fileNo);

				// 파일 다운로드만 할경우는 id가 없어서 넘어간다...
				if (clickEventElement === null || clickEventElement === undefined)
					continue;

				clickEventElement.onclick = function() {
					var removeFileId = this.getAttribute('id').replace(/[^0-9]/g, "");
					$.ajax({
						type : "post",
						url : $('#ctxPath').val() + '/api/file/accDelete',
						data : {
							fileNo : this.getAttribute('id').replace(/[^0-9]/g, "")
						},
						dataType : "json",
						success : function(jsonData) {
							// var searchElement = document.getElementById("fileNo" + removeFileId);
							// searchElement.parentNode.removeChild(searchElement);
							document.getElementById("fileNo" + removeFileId).parentNode.parentNode.removeChild(document.getElementById("fileNo" + removeFileId).parentNode)
						}
					});
				}

			}
		},

		/**
		 * 글자를 원하는 카운트로 잘라서 리턴한다.
		 * @param value
		 * @param charCnt
		 * @returns
		 */
		substr: function(value, charCnt) {
			if(value === null || value.isBlank()) return "";
			if(value.length > charCnt) {
				return value.substring(0, charCnt) + '...';
			}
			else {
				return value;
			}
		},
		
		//string 14자리 날짜형태 변환
		parseDate : function(str) {
            if(str === null || str == ''){
                return "";
			}else{
                var y = str.substr(0, 4);
                var m = str.substr(4, 2);
                var d = str.substr(6, 2);
                var HH = str.substr(8, 2);
                var mm = str.substr(10, 2);
                var ss = str.substr(12, 2);

                return y + "-" + m + "-" + d + " " + HH +":" + mm + ":" + ss;
			}
	    }

};

/** elastic search */
var ES  = {
	defaultParam: { format: 'json'},
    connect: function (param) {
        var eshost = {
            host: $('#gEsIp').val() + ':' + $('#gEsPort').val(),
            log: 'info'
        };
        param = $.extend(eshost, param);
        return  new elasticsearch.Client(param);
    },
	/** connection 객체 확인 */
	checkConn: function (conn) {
        if (conn === undefined || conn === null)
            conn = ES.connect(null);
        return conn;
    },
	ping: function (conn, param, callback) {
		conn = this.checkConn(conn);
		var pingParam = {
            requestTimeout: Infinity
		};
		conn.ping($.extend(pingParam, param), callback);
		return conn;
    },
	search: function (conn, param, callback) {
		conn = this.checkConn(conn);
		conn.search(param, callback);
    },

    /** cat */
    catHealth: function (conn, param, callback) {
		conn = this.checkConn(conn);
		conn.cat.health($.extend(this.defaultParam, param), callback);
    },
    catIndices: function (conn, param, callback) {
        conn = this.checkConn(conn);
        conn.cat.indices($.extend(this.defaultParam, param), callback);
    }
};

/** ajax call */
var Server = (function() {
	return {
		post: function(url, params) {
			Server.ajax(url, 'post', params);
		},
		get: function(url, params) {
			Server.ajax(url, 'get', params);
		},
		ajax: function(url, method, params) {
			if(ctxPath === undefined) ctxPath = '';
			var ajaxOpts = {
					type: method.toUpperCase(),
					url: ctxPath + url,
					dataType: 'json',
					success: function(data, status) {
//						if($('body').hasClass('wait')) $('body').removeClass('wait');
						if(data.hasError) {
							if(params.error !== undefined) {
								params.error(data);
							}
							else {
                                alert(data.errorInfo.message);
							}
							return;
						}
						if(params.success !== undefined) {
							params.success(data.resultData, this.data);
						}
					},
					error: function(xhr) {
//						console.log(xhr);
//						if($('body').hasClass('wait')) $('body').removeClass('wait');
						//alert('처리 중 에러가 발생하였습니다.');
						if(params.error !== undefined) {
							params.error(xhr);
						}else{
							//alert('처리 중 에러가 발생하였습니다.');
						}
					}
			};
			if(method === 'post') {
				try {
					if(params.data) ajaxOpts.data = JSON.stringify(params.data);
					var o = params.data;
					if(o && typeof o === 'object' && o !== null) {
						ajaxOpts.contentType = 'application/json; charset=utf-8';
					}
				} catch(e) {}
			}
			else {
				if(params.data) ajaxOpts.data = params.data;
			}
			$.ajax($.extend(ajaxOpts, params.options));
		}
	};
})();


/**
 * CtxMenu.DEV		:	mngNo, devName, disDevName, devIp
 * CtxMenu.IF		:	mngNo, ifIdx, devName, disDevName, devIp, ifName, ifAlias
 * CtxMenu.ALARM	:	seqNo
 * CtxMenu.ALARM_HIST	: seqNo
 * CtxMenu.SVR		:	svrNo
 * CtxMenu.AP		:	apNo
 * CtxMenu.AP_CLIENT	:	apNo, apIdx, connId
 */
var CtxMenu = {
		NONE: 'none',	//없음
		COMM: 'comm', //공통
		DEV: 'dev',
		IF: 'if',
		SVR: 'svr',
		AP: 'ap',
		DEV10: 'dev10',
		AP_CLIENT: 'apClient',
		SYSLOG: 'syslog',
		L4: 'l4',
		L4_ALTEON: 'l4Alteon',
		STARCELL_SVR: 'starcellSvr',
		DOS_EVT: 'dosEvt',
		GRP_DETAIL: 'grpDetail',
		RACK: 'rackDetail',
    	TOPO_ERR_ACTION_GRID: 'errAction',
	    TICKET: 'evtTicket',
    	SECT: 'sectPerf',
    	DEV_ROUTE_MONIT: 'devRouteMonit',
		Filter: 'filter',
    	
    	/**기본highchart*/
    	createHighchart:function(chart,type,idx) {
            //pwindow체크
            if (type === CtxMenu.NONE)return;
            if (idx === null) idx = '';
            var menu = $('<div id="ctxmenu_' + type + idx + '"></div>');
            var ul = $('<ul></ul>');
            ul = CtxMenu.getMenu(ul, type);
            menu.append(ul).appendTo('body');

            //차트이벤트처리
            var context = {
                plotOptions: {
                    series: {
                        events: {
                            click: function (point) {
                                menu.jqxMenu('close');
                            },
                            contextmenu: function (point) {
                            	if (type === CtxMenu.DEV10) {
                                    chart.ctxData = point;
                                    $("#ctxmenu_" + type + idx).remove();
                                    menu = $('<div id="ctxmenu_' + type + idx + '"></div>');
                                    ul = $('<ul></ul>');
                                    if (chart.ctxData.srcElement.point.devKind1 === 'SVR')
                                        ul = CtxMenu.getMenu(ul, CtxMenu.SVR);
                                    else if (chart.ctxData.srcElement.point.devKind1 === 'DEV')
                                        ul = CtxMenu.getMenu(ul, CtxMenu.DEV);
                                    menu.append(ul).appendTo('body');
                                    menu.jqxMenu({
                                        width: 200,
                                        autoOpenPopup: false,
                                        mode: 'popup',
                                        theme: jqxTheme,
                                        popupZIndex: 99999
                                    })
                                        .on('itemclick', function (event) {
                                            CtxMenu.itemClick($(event.args)[0].id, chart, 'highchart');
                                        });
                                }

                                menu.jqxMenu('open', point.clientX, point.clientY);
                            }
                        }
                    }
                },
                chart: {
                    events: {
                        click: function (event) {
                            menu.jqxMenu('close');
                        }
                    }
                }
            };

            chart.update(context);

            //차트 더블클릭 이벤트 처리 (미구현 시) ---- 개선필요
			if (chart.options.plotOptions.series.events.dblclick === undefined) {
				if (type === CtxMenu.SVR) {
                    context = {
                        plotOptions: {
                            series: {
                                events: {
                                    dblclick: function (point) {
                                        chart.ctxData = point;
                                        CtxMenu.itemClick('cm_svr_detail', chart, 'highchart'); // 서버상세
                                    }
                                }
                            }
                        }
                    };
                    chart.update(context);
				} else  if (type === CtxMenu.DEV10) {
					context = {
                        plotOptions: {
                            series: {
                                events: {
                                    dblclick: function (point) {
                                        chart.ctxData = point;
                                        if (point.srcElement.point.devKind1 !== undefined && point.srcElement.point.devKind1 === 'DEV') {
                                            CtxMenu.itemClick('cm_dev_detail', chart, 'highchart'); // 장비상세
										} else  if (point.srcElement.point.devKind1 !== undefined && point.srcElement.point.devKind1 === 'SVR') {
                                            CtxMenu.itemClick('cm_svr_detail', chart, 'highchart'); // 서버상세
                                        }
                                    }
                                }
                            }
                        }
					};
                    chart.update(context);
				}
			}

			menu.jqxMenu({width:200,autoOpenPopup:false,mode:'popup',  theme: jqxTheme,popupZIndex:99999})
                .on('itemclick', function(event) {
                    CtxMenu.itemClick($(event.args)[0].id, chart, 'highchart');
                });
        },

   		 /**기본jqx그리드*/
		create: function(grid, type, idx) {
			// pwindow체크
			if(type === CtxMenu.NONE) return;
			if(idx === null) idx = '';
			var menu = $('<div id="ctxmenu_' + type + idx + '"></div>');
			var ul = $('<ul></ul>');
			ul=CtxMenu.getMenu(ul,type);

			var li = $('<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/op_tool.png" alt="op_tool"><span>차트도구</span></li>');
			li.append($('<ul><li id="cm_filter"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/filter.png" alt="filter"><span>필터</span></li>' +
								'<li id="cm_filterReset"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/filter_reset.png" alt="filter_reset"><span>필터초기화</span></li>' +
								'<li id="cm_colsMgr"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/op_tool.png" alt="op_tool"><span>컬럼관리</span></li>' +'</ul>'));

			if(type == 'filter'){
                ul.append(li);
                menu.append(ul).appendTo('body');
			}


			grid.on('contextmenu', function() {
				return false;
			})
			//sms발송 팝업의 경우 필터가 자동으로 on 상태	
			.on('bindingcomplete', function(event) {
                if(type == 'filter'){
                    menu.jqxMenu({ width: 200, autoOpenPopup: false, mode: 'popup', theme: jqxTheme, popupZIndex: 99999 })
                    CtxMenu.itemClick('cm_filter', grid, 'grid');
                }
			})
			.on('rowclick', function(event) {
              ///

				if(event.args.rightclick) {
                    grid.jqxGrid('selectrow', event.args.rowindex); // 우클릭시 row 선택을 위해

					// 임시처리 ... 복합처리 필요
					if (type == CtxMenu.DEV10) {
                        var rowidx = HmGrid.getRowIdx(grid);
                        if(rowidx === false) return;
                        var devKind1 = grid.jqxGrid('getrowdata', rowidx).devKind1;

                        $("#ctxmenu_" + type + idx).remove();
                        menu = $('<div id="ctxmenu_' + type + idx + '"></div>');
						ul = $('<ul></ul>');
						if (devKind1 === 'SVR') {
                            ul=CtxMenu.getMenu(ul,CtxMenu.SVR);
						} else if (devKind1 === 'DEV') {
                            ul=CtxMenu.getMenu(ul,CtxMenu.DEV);
						}
                        var li = $('<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/op_tool.png"><span>차트도구</span></li>');
                        li.append($('<ul><li id="cm_filter"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/filter.png"><span>필터</span></li>' +
                            '<li id="cm_filterReset"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/filter_reset.png"><span>필터초기화</span></li>' +
                            '<li id="cm_colsMgr"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/op_tool.png"><span>컬럼관리</span></li>' +'</ul>'));
                        ul.append(li);
                        menu.append(ul).appendTo('body');

                        menu.jqxMenu({ width: 200, autoOpenPopup: false, mode: 'popup', theme: jqxTheme, popupZIndex: 99999 })
                            .on('itemclick', function(event) {
                                CtxMenu.itemClick($(event.args)[0].id, grid, 'grid');
                            });
					}

					grid.jqxGrid('selectrow', event.args.rowindex);
                    var posX = parseInt(event.args.originalEvent.clientX) + 5 + $(window).scrollLeft();
                    var posY = parseInt(event.args.originalEvent.clientY) + 5 + $(window).scrollTop();
                    if($(window).height() < (event.args.originalEvent.clientY + menu.height() + 10)) {
                    	posY = $(window).height() - (menu.height() + 10);
                    }
                    menu.jqxMenu('open', posX, posY);
                    return false;
				}
			});
             if(type == 'filter'){
                 menu.jqxMenu({ width: 200, autoOpenPopup: false, mode: 'popup', theme: jqxTheme, popupZIndex: 99999 })
                     .on('itemclick', function(event) {
                         CtxMenu.itemClick($(event.args)[0].id, grid, 'grid');
                     });
             }
			/*menu.jqxMenu({ width: 200, autoOpenPopup: false, mode: 'popup', theme: jqxTheme, popupZIndex: 99999 })
				.on('itemclick', function(event) {
                    CtxMenu.itemClick($(event.args)[0].id, grid, 'grid');
				});*/

		},

		getMenu:function (ul, type) {
            switch(type) {
                case CtxMenu.DEV:
                    ul.append($('<li id="cm_dev_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>장비상세</span></li>'));
                    
                    if ($('#gSiteName').val() !== 'Samsung') {
                    	if($('#gEsUse').val() == "true"){
                            ul.append($('<li id="cm_dev_rawPerfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>장비성능그래프</span></li>'));
                        }else{
                        	ul.append($('<li id="cm_dev_perfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>장비성능그래프</span></li>'));
                        }
                    }else{
                    	ul.append($('<li id="cm_dev_perfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>장비성능그래프</span></li>'));

                    }
                    ul.append($('<li id="cm_dev_rtPerfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>실시간 장비성능 그래프</span></li>'));
                    if($('#gAppSecUnitPopupYn').val() == 'y') {
                        ul.append($('<li id="cm_dev_secUnitPerfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>초단위 장비성능</span></li>'));
                    }
                    ul.append($('<li id="cm_dev_jobReg"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dev_perf.png"><span>장비작업등록</span></li>'));
                    var li = $('<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/op_tool.png"><span>운영도구</span></li>');
                    li.append($('<ul><li id="cm_ping"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/ping.png"><span>Ping</span></li>' +
                        '<li id="cm_tracert"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/ping.png"><span>Tracert</span></li>' +
                        '<li id="cm_telnet"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/telnet.png"><span>Telnet</span></li>' +
                        '<li id="cm_ssh"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/ping.png"><span>SSH</span></li>' +
                        '<li id="cm_http"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/http.png"><span>Http</span></li>' +
                        '<li id="cm_https"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/https.png"><span>Https</span></li></ul>'));
                    ul.append(li);
//				var li = $('<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>RRD</span></li>');
//				li.append($('<ul><li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>CPU</span></li>' +
//									'<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>MEMORY</span></li>' +
//									'<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>응답시간</span></li></ul>'));
//				ul.append(li);
                    break;
                case CtxMenu.IF:
                	ul.append($('<li id="cm_if_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>회선상세</span></li>'));
                	
                	ul.append($('<li id="cm_dev_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>장비상세</span></li>'));
                    ul.append($('<li id="cm_dev_jobReg"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dev_perf.png"><span>장비작업등록</span></li>'));
                    ul.append($('<li id="cm_if_jobReg"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dev_perf.png"><span>회선작업등록</span></li>'));
                    
                    if ($('#gSiteName').val() !== 'Samsung') {
                    	if($('#gEsUse').val() == "true"){
                            ul.append($('<li id="cm_if_rawPerfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>회선성능그래프</span></li>'));
                        }else{
                        	ul.append($('<li id="cm_if_perfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>회선성능그래프</span></li>'));
                        }
                    }else{
                    	ul.append($('<li id="cm_if_perfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>회선성능그래프</span></li>'));	
                    }
                    ul.append($('<li id="cm_if_rtPerfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>실시간 회선성능 그래프</span></li>'));
                    if($('#gAppSecUnitPopupYn').val() == 'y') {
                        ul.append($('<li id="cm_if_secUnitPerfGraph"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>초단위 회선성능</span></li>'));
                    }
                    if ($('#gSiteName').val() !== 'Samsung') {
                        ul.append($('<li id="cm_if_trafficData"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>트래픽데이터</span></li>'));
                    }
                    var li = $('<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/op_tool.png"><span>운영도구</span></li>');
                    li.append($('<ul><li id="cm_ping"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/ping.png"><span>Ping</span></li>' +
                        '<li id="cm_tracert"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/ping.png"><span>Tracert</span></li>' +
                        '<li id="cm_telnet"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/telnet.png"><span>Telnet</span></li>' +
                        '<li id="cm_ssh"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/ping.png"><span>SSH</span></li>' +
                        '<li id="cm_http"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/http.png"><span>Http</span></li>' +
                        '<li id="cm_https"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/https.png"><span>Https</span></li></ul>'));
                    ul.append(li);
//				var li = $('<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>RRD</span></li>');
//				li.append($('<ul><li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>BPS</span></li>' +
//									'<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>PPS</span></li>' +
//									'<li><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>ERROR</span></li></ul>'));
//				ul.append(li);
                    break;
                case CtxMenu.SVR:
                    ul.append($('<li id="cm_svr_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>서버상세정보</span></li>'));
                    if ($('#gSiteName').val() !== 'Samsung') {
						if($('#gEsUse').val() == "true"){
							ul.append($('<li id="cm_svr_rawPerfChart"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>서버성능그래프(raw)</span></li>'));
						}
                    }
                    ul.append($('<li id="cm_svr_perfAnalysis"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>성능분석</span></li>'));
                    ul.append($('<li id="cm_svr_networkAnalysis"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>네트워크분석</span></li>'));
                   // ul.append($('<li id="cm_svr_secPerfAnalysis"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>초단위성능분석</span></li>'));
                    break;
                case CtxMenu.AP:
                    ul.append($('<li id="cm_ap_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>AP상세</span></li>'));
                    ul.append($('<li id="cm_ap_clientHist"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>클라이언트 이력</span></li>'));
                    break;
                case CtxMenu.AP_CLIENT:
                    ul.append($('<li id="cm_ap_clientDetail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>클라이언트 상세</span></li>'));
                    break;
                case CtxMenu.SYSLOG:
                    ul.append($('<li id="cm_syslog_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>Syslog 상세</span></li>'));
                    break;
                case CtxMenu.L4:
                    ul.append($('<li id="cm_l4_realSvrConStatus"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>Real Server 접속현황</span></li>'));
                    break;
                case CtxMenu.L4_ALTEON:
                    ul.append($('<li id="cm_l4_alteonSessStatusByIp"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>IP별 세션현황</span></li>'));
                    break;
                case CtxMenu.STARCELL_SVR:
                    ul.append($('<li id="itmon_svr_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>서버상세정보</span></li>'));
                    break;
                case CtxMenu.GRP_DETAIL:
                    ul.append($('<li id="grpDetail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>그룹상세정보</span></li>'));
                    break;
                case CtxMenu.DOS_EVT:
                    ul.append($('<li id="cm_dosevt_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>이벤트 상세</span></li>'));
                    break;
				case CtxMenu.RACK:
                    ul.append($('<li id="cm_rack_detail"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>Rack정보</span></li>'));
                    break;
                case CtxMenu.TOPO_ERR_ACTION_GRID:
                    ul.append($('<li id="cm_err_action"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/delete.png"><span>조치삭제</span></li>'));
                    break;
//                case CtxMenu.TICKET:
//                	ul.append($('<li id="cm_evtTicket"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/delete.png"><span>조치삭제</span></li>'));
//                	break;
                case CtxMenu.SECT:
                	ul.append($('<li id="cm_sect_perf"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/traffic_status.png"><span>이력그래프</span></li>'));
                	break;
                case CtxMenu.DEV_ROUTE_MONIT:
                	ul.append($('<li id="cm_route_monit"><img style="margin-right: 5px" src="' + ctxPath + '/img/ctxmenu/dtl_info.png"><span>경로 비교</span></li>'));
                	break;

            }
            return ul;
        },

        itemClick: function (id, item, type) {
			var params;
            // 그리드 사용
            var rowidx;
            var rowdata;
            var rowidxes;
            var _gridElementName;

            switch(id) {
                /** DEV */
                case 'cm_dev_detail': //장비상세
                	var _mngNo = -1;
					if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        _mngNo = item.jqxGrid('getrowdata', rowidx).mngNo || item.jqxGrid('getrowdata', rowidx).MNG_NO;
                        params = {
                            mngNo: _mngNo
                        };
					} else if (type === 'highchart') {
						_mngNo = item.ctxData.srcElement.point.mngNo;
                        params = {
                            mngNo: _mngNo
                        };
                    } else return;

                	if (params !== undefined || params !== '')
                    	HmUtil.createPopup('/main/popup/nms/pDevDetail.do', $('#hForm'), 'pDevDetail_'+_mngNo, 1300, 700, params);
                    break;
                case 'cm_dev_perfGraph': //장비성능그래프
                    if (type === 'grid'){
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                devIp: rowdata.devIp,
                                mngNo: rowdata.mngNo,
                                disDevName: rowdata.disDevName
                            };
                            // 그리드 엘리먼트 이름에 따라서 장비성능그래프 팝업의 검색 콤보 초기값 설정.
                            // 그리드 엘리먼트 이름으로 판단이 안될 경우 default 값 cpu
                            _gridElementName = item.selector.toUpperCase();
                            if(_gridElementName.indexOf('CPU') > 0){
                                params.type = '1';
                            }else if(_gridElementName.indexOf('MEM') > 0){
                                params.type = '2';
                            }else if(_gridElementName.indexOf('TEMP') > 0){
                                params.type = '5';
                            }else if(_gridElementName.indexOf('RESTIME') > 0){
                                params.type = '6';
                            }else if(_gridElementName.indexOf('SESSION') > 0){
                                params.type = '11';
                            }
                        } catch(e) {}
                    } else if (type === 'highchart') {
                        params = {
                            disDevName : item.ctxData.srcElement.point.devName,
                            devIp: item.ctxData.srcElement.point.devIp,
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
					} else return;

                    if (params !== undefined || params !== '') {
                        $.post(ctxPath + '/main/popup/nms/pDevPerfChart.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + '] 장비성능그래프', result, 900, 800);
                            }
                        );
                    }
                    break;
                case 'cm_dev_rawPerfGraph': //장비성능그래프 (raw)
                    if (type === 'grid'){
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                devIp: rowdata.devIp,
                                mngNo: rowdata.mngNo,
                                disDevName: rowdata.disDevName
                            };
                            // 그리드 엘리먼트 이름에 따라서 장비성능그래프 팝업의 검색 콤보 초기값 설정.
                            // 그리드 엘리먼트 이름으로 판단이 안될 경우 default 값 cpu
                            _gridElementName = item.selector.toUpperCase();
                            if(_gridElementName.indexOf('CPU') > 0){
                                params.type = '1';
                            }else if(_gridElementName.indexOf('MEM') > 0){
                                params.type = '2';
                            }else if(_gridElementName.indexOf('TEMP') > 0){
                                params.type = '5';
                            }else if(_gridElementName.indexOf('RESTIME') > 0){
                                params.type = '6';
                            }else if(_gridElementName.indexOf('SESSION') > 0){
                                params.type = '11';
                            }
                        } catch(e) {}
                    } else if (type === 'highchart') {
                        params = {
                            disDevName : item.ctxData.srcElement.point.devName,
                            devIp: item.ctxData.srcElement.point.devIp,
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    if (params !== undefined || params !== '') {
                        $.post(ctxPath + '/main/popup/nms/pDevRawPerfChart.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + '] 장비성능그래프', result, 900, 800);
                            }
                        );
                    }
                    break;
                case 'cm_dev_rtPerfGraph': //실시간 장비성능 그래프
                    if (type === 'grid'){
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                mngNo: rowdata.mngNo,
                                disDevName: rowdata.disDevName
                            };
                            // 그리드 엘리먼트 이름에 따라서 장비성능그래프 팝업의 검색 콤보 초기값 설정.
                            // 그리드 엘리먼트 이름으로 판단이 안될 경우 default 값 cpu
                            _gridElementName = item.selector.toUpperCase();
                            if(_gridElementName.indexOf('CPU') > 0){
                                params.type = '1';
                            }else if(_gridElementName.indexOf('MEM') > 0){
                                params.type = '2';
                            }else if(_gridElementName.indexOf('TEMP') > 0){
                                params.type = '5';
                            }else if(_gridElementName.indexOf('RESTIME') > 0){
                                params.type = '6';
                            }else if(_gridElementName.indexOf('SESSION') > 0){
                                params.type = '11';
                            }
                        } catch(e) {}
                    } else if (type === 'highchart') {
                        params = {
                            disDevName : item.ctxData.srcElement.point.devName,
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
					} else  return;

                    if (params !== undefined || params !== '') {
                        $.post(ctxPath + '/main/popup/nms/pRTimeDevPerfChart.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + ']  실시간 장비성능', result, 1100, 440);
                            }
                        );
                    }
                    break;
                case 'cm_dev_secUnitPerfGraph': //초단위 장비성능
                    if (type === 'grid'){
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                devIp: rowdata.devIp,
                                mngNo: rowdata.mngNo,
                                disDevName: rowdata.disDevName
                            };
                        } catch(e) {}
                    } else if (type === 'highchart') {
                        params = {
                            disDevName : item.ctxData.srcElement.point.devName,
                            devName : item.ctxData.srcElement.point.devName,
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
					} else return;

                    if (params !== undefined || params !== '') {
                        $.post(ctxPath + '/main/popup/nms/pSecUnitDevPerf.do',
                            params,
                            function (result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + '] 초단위 장비성능', result, 1100, 640);
                            }
                        );
                    }
                    break;
                case 'cm_dev_jobReg': //장비작업등록
                    if (type === 'grid'){
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        rowdata = item.jqxGrid('getrowdata', rowidx);
                        params = {
                            mngNo: rowdata.mngNo || rowdata.MNG_NO || 0,
                            devName: rowdata.devName || rowdata.DEV_NAME || 'null',
                            disDevName: rowdata.disDevName
                        };
                    } else if (type === 'highchart') {
                        params = {
                            disDevName : item.ctxData.srcElement.point.devName,
                            devName : item.ctxData.srcElement.point.devName,
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    if (params !== undefined || params !== '') {
                        $.post(ctxPath + '/main/popup/nms/pDevJobAdd.do',
                            params,
                            function (result) {
                                HmWindow.open($('#pwindow'), (params.disDevName || params.devName || '') + ' 장비작업등록', result, 645, 555);
                            }
                        );
                    }
                    break;
                case 'cm_ping': //Ping
                    if (type === 'grid'){
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        rowdata = item.jqxGrid('getrowdata', rowidx);
                        params = {
                            mngNo: rowdata.mngNo || rowdata.MNG_NO || 0
                        };
                    } else if (type === 'highchart') {
                        params = {
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    if (params !== undefined || params !== '') {
                        $.ajax({
                            url: ctxPath + '/main/popup/nms/pPing.do',
                            type: 'POST',
                            data: JSON.stringify(params),
                            contentType: 'application/json; charset=utf-8',
                            success: function (result) {
                                HmWindow.open($('#pwindow'), 'Ping', result, 605, 400);
                            }
                        });
                    }
                    break;
                case 'cm_telnet': //Telnet
                    if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if (rowidx === false) return;
                        rowdata = item.jqxGrid('getrowdata', rowidx);
                        params = {
										devIp: rowdata.devIp
						};
                    } else if (type === 'highchart') {
                        params = {
                            devIp: item.ctxData.srcElement.point.devIp
                        };
                    } else return;

                    // if (params !== undefined || params !== '')
                    //     ActiveX.telnet(params.devIp);
                    break;
                case 'cm_tracert': //Tracert
                    if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        params = item.jqxGrid('getrowdata', rowidx);
                    } else if (type === 'highchart') {
                        params = {
                            devIp: item.ctxData.srcElement.point.devIp
                        };
                    } else return;

                    // if (params !== undefined || params !== '')
                    // 	ActiveX.tracert(params.devIp);
                    break;
                case 'cm_ssh': //SSH
                    if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        params = item.jqxGrid('getrowdata', rowidx);
                    } else if (type === 'highchart') {
                        params = {
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    // if (params !== undefined || params !== '')
                    // 	ActiveX.ssh(params.devIp);
                    break;
                case 'cm_http': //Http
                    if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        params = item.jqxGrid('getrowdata', rowidx);
                    } else return;

                    // if (params !== undefined || params !== '')
                    // 	ActiveX.http(params.devIp);
                    break;
                case 'cm_https': //Https
                    if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        params = item.jqxGrid('getrowdata', rowidx);
                    } else return;

                    // if (params !== undefined || params !== '')
                    // 	ActiveX.https(params.devIp);
                    break;

                /** IF */
                case 'cm_if_detail': //회선상세
                	var _mngNo = -1, _ifIdx = -1;
					if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        
                        _mngNo = item.jqxGrid('getrowdata', rowidx).mngNo || item.jqxGrid('getrowdata', rowidx).MNG_NO;
                        _ifIdx = item.jqxGrid('getrowdata', rowidx).ifIdx || item.jqxGrid('getrowdata', rowidx).IF_IDX;
                        params = {
                            mngNo: _mngNo,
                            ifIdx: _ifIdx,
                            lineWidth: item.jqxGrid('getrowdata', rowidx).lineWidth || item.jqxGrid('getrowdata', rowidx).LINE_WIDTH
                        };
					} else if (type === 'highchart') {
						_mngNo = item.ctxData.srcElement.point.mngNo;
						_ifIdx = item.ctxData.srcElement.point.ifIdx;
						
                        params = {
                            mngNo: _mngNo,
                            ifIdx: _ifIdx,
                            lineWidth: item.ctxData.srcElement.point.lineWidth
                        };
                    } else return;

					if (params !== undefined || params !== '')
                    	HmUtil.createPopup('/main/popup/nms/pIfDetail.do', $('#hForm'), 'pIfDetail_'+_mngNo+"_"+_ifIdx, 1300, 700, params);
                    break;
                case 'cm_if_jobReg': //회선작업등록
                    if (type === 'grid') {
                        rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                        if(rowidx === false) return;
                        rowdata = item.jqxGrid('getrowdata', rowidx);
                        params = {
                            ifIdx: rowdata.ifIdx || rowdata.IF_IDX || 0,
                            ifName: rowdata.ifName || rowdata.IF_NAME || 'null',
                            mngNo : rowdata.mngNo || rowdata.MNG_NO || 0,
                            disDevName: rowdata.disDevName,
                            ifAlias: rowdata.ifAlias
                        };
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pIfJobAdd.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + ' - ' + params.ifName + '(' + params.ifAlias + ')] 회선작업등록', result, 645, 600);
                            }
                        );
					}
                    break;
                case 'cm_if_perfGraph': //회선성능그래프
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                devIp: rowdata.devIp,
                                mngNo: rowdata.mngNo,
                                ifIdx: rowdata.ifIdx,
                                devName: rowdata.disDevName,
                                ifName: rowdata.ifName,
                                ifAlias: rowdata.ifAlias
                            };
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pIfPerfChart.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.devName + ' - ' + params.ifName + '(' + params.ifAlias + ')] 회선성능그래프',  result, 900, 800);
                            }
                        );
                    }
                    break;
                case 'cm_if_rawPerfGraph': //회선성능그래프(raw)
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                devIp: rowdata.devIp,
                                mngNo: rowdata.mngNo,
                                ifIdx: rowdata.ifIdx,
                                devName: rowdata.disDevName,
                                ifName: rowdata.ifName,
                                ifAlias: rowdata.ifAlias
                            };
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pIfRawPerfChart.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.devName + ' - ' + params.ifName + '(' + params.ifAlias + ')] 회선성능그래프(raw)',  result, 900, 800);
                            }
                        );
                    }
                    break;
                case 'cm_if_rtPerfGraph': //실시간 회선성능 그래프
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                mngNo: rowdata.mngNo,
                                ifIdx: rowdata.ifIdx,
                                disDevName: rowdata.disDevName,
                                ifName: rowdata.ifName,
                                ifAlias: rowdata.ifAlias
                            };

                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pRTimeIfPerfChart.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + ' - ' + params.ifName +'(' + params.ifAlias + ')] 실시간 회선성능', result, 1000, 385);
                            }
                        );
                    }
                    break;
                case 'cm_if_secUnitPerfGraph': //초단위 회선성능
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                mngNo: rowdata.mngNo,
                                ifIdx: rowdata.ifIdx,
                                disDevName: rowdata.disDevName,
                                ifName: rowdata.ifName,
                                ifAlias: rowdata.ifAlias
                            };
                        } catch(e) {}
                    } else  return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pSecUnitIfPerf.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + ' - ' + params.ifName +'(' + params.ifAlias + ')] 초단위 회선성능', result, 1000, 610);
                            }
                        );
                    }
                    break;
                case 'cm_if_trafficData': //트래픽데이터
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                mngNo: rowdata.mngNo,
                                ifIdx: rowdata.ifIdx,
                                ifName: rowdata.ifName
                            };
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/tms/pTrafficData.do', $('#hForm'), 'pTrafficData', 1100, 645, params);
                    }
                    break;

                /** SVR */
                case 'cm_svr_detail': //서버상세정보
                	var _mngNo = -1;
                    if (type === 'grid') {
                        rowidxes = HmGrid.getRowIdxes(item, '선택된 데이터가 없습니다.');
                        if(rowidxes === false) return;
                        rowidx = item.jqxGrid('getselectedrowindex');
                        _mngNo = item.jqxGrid('getrowdata', rowidx).mngNo;
                        params = {};
                        params.mngNo = _mngNo;
                        params.devName = item.jqxGrid('getrowdata', rowidx).name;
                        params.devIp = item.jqxGrid('getrowdata', rowidx).devIp;
                    } else if (type === 'highchart') {
                    	_mngNo = item.ctxData.srcElement.point.mngNo;
						params = {
							mngNo: _mngNo
                        };
					} else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/sms/pServerDetailInfo.do', $('#hForm'), 'pServerAlarm_'+_mngNo, 1300, 700, params);
                    }
                    break;
				case 'cm_svr_rawPerfChart': //서버성능그래프(raw)
                    if (type === 'grid'){
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                devIp: rowdata.devIp,
                                mngNo: rowdata.mngNo,
                                disDevName: rowdata.disDevName
                            };
                            // 그리드 엘리먼트 이름에 따라서 장비성능그래프 팝업의 검색 콤보 초기값 설정.
                            // 그리드 엘리먼트 이름으로 판단이 안될 경우 default 값 cpu
                            _gridElementName = item.selector.toUpperCase();
                            if(_gridElementName.indexOf('CPU') > 0){
                                params.type = '1';
                            }else if(_gridElementName.indexOf('MEM') > 0){
                                params.type = '2';
                            }else if(_gridElementName.indexOf('TEMP') > 0){
                                params.type = '5';
                            }else if(_gridElementName.indexOf('RESTIME') > 0){
                                params.type = '6';
                            }else if(_gridElementName.indexOf('SESSION') > 0){
                                params.type = '11';
                            }
                        } catch(e) {}
                    } else if (type === 'highchart') {
                        params = {
                            disDevName : item.ctxData.srcElement.point.devName,
                            devIp: item.ctxData.srcElement.point.devIp,
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    if (params !== undefined || params !== '') {
                        $.post(ctxPath + '/main/popup/sms/pServerPerfChart.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.disDevName + '] 서버성능그래프(raw)', result, 1100, 650);
                            }
                        );
                    }
					break;
                case 'cm_svr_perfAnalysis': //성능분석
                    if (type === 'grid') {
                        rowidxes = HmGrid.getRowIdxes(item, '선택된 데이터가 없습니다.');
                        if(rowidxes === false) return;
                        rowidx = item.jqxGrid('getselectedrowindex');
                        params = {};
                        params.mngNo = item.jqxGrid('getrowdata', rowidx).mngNo;
                    } else if (type === 'highchart') {
                        params = {
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/sms/pServerPerfAnalysis.do', $('#hForm'), 'pServerPerfAnalysis', 1400, 760, params);
                    }
                    break;
                case 'cm_svr_networkAnalysis': //네트워크분석
                    if (type === 'grid') {
                        rowidxes = HmGrid.getRowIdxes(item, '선택된 데이터가 없습니다.');
                        if(rowidxes === false) return;
                        rowidx = item.jqxGrid('getselectedrowindex');
                        params = {};
                        params.mngNo = item.jqxGrid('getrowdata', rowidx).mngNo;
                    } else if (type === 'highchart') {
                        params = {
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/sms/pServerNetworkAnalysis.do', $('#hForm'), 'pServerNetworkAnalysis', 1400, 760, params);
                    }
                    break;
                case 'cm_svr_secPerfAnalysis': //초단위성능분석 (BMT용)
                    if (type === 'grid') {
                        rowidxes = HmGrid.getRowIdxes(item, '선택된 데이터가 없습니다.');
                        if(rowidxes === false) return;
                        rowidx = item.jqxGrid('getselectedrowindex');
                        params = {};
                        params.mngNo = item.jqxGrid('getrowdata', rowidx).mngNo;
                    } else if (type === 'highchart') {
                        params = {
                            mngNo: item.ctxData.srcElement.point.mngNo
                        };
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/sms/pServerSecPerfAnalysis.do', $('#hForm'), 'pServerSecPerfAnalysis', 1000, 700, params);
                    }
                    break;

                /** AP */
                case 'cm_ap_detail': //AP상세
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                apNo: rowdata.apNo,
                                apName: rowdata.apName
                            };
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/nms/pApDetail.do', $('#hForm'), 'pApDetail', 1280, 760, params);
                    }
                    break;
                case 'cm_ap_clientHist': //클라이언트 이력
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                apNo: rowdata.apNo,
                                apName: rowdata.apName
                            };
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pApClientHist.do', params,
                            function(result) {
                                HmWindow.open($('#pwindow'), params.apName + ' - 클라이언트 이력', result, 1000, 600);
                            }
                        );
                    }
                    break;
                case 'cm_ap_clientDetail': //클라이언트 상세
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                apNo: rowdata.apNo,
                                apIdx: rowdata.apIdx,
                                connIp: rowdata.connIp,
                                connMac: rowdata.connMac
                            };
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/nms/pApClientDetail.do', $('#hForm'), 'pApClientDetail', 1298, 420, params);
                    }
                    break;
                case 'cm_syslog_detail': //Syslog 상세
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                        } catch(e) {}
                    } else  return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pSyslogDetail.do',
                            rowdata,
                            function(result) {
                                HmWindow.open($('#pwindow'), 'Syslog 상세', result, 800, 400);
                            }
                        );
                    }
                    break;

                /** L4세션 */
                case 'cm_l4_realSvrConStatus': //Real Server 접속현황
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            params = item.jqxGrid('getrowdata', rowidx);
                            $.extend(params, {
                                date1: $('#date1').val(),
                                date2: $('#date2').val()
                            });
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pL4RealSvr.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' +params.devName + '] Real Server 접속현황', result, 1000, 650);
                            }
                        );
                    }
                    break;
                case 'cm_l4_alteonSessStatusByIp': //IP별 세션현황
                    if (type === 'grid') {
                        try {
                            params = HmGrid.getRowData(item);
                            if(rowdata === null) {
                                alert('선택된 데이터가 없습니다.');
                                return;
                            }
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/nms/pL4AlteonSessStatus.do',
                            { mngNo: params.mngNo, date1: $('#date1').val(), date2: $('#date2').val() },
                            function(result) {
                                HmWindow.open($('#pwindow'), '[' + params.devName + '] IP별 세션현황', result, 1000, 650);
                            }
                        );
                    }
                    break;

                /** STARCELL SVR */
                case 'itmon_svr_detail':
                    if (type === 'grid') {
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
                            params = {
                                invenId: rowdata.invenId,
                                agentIp: rowdata.agentIp,
                                invenName: rowdata.invenName
                            };
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/starcell/pItmonSvrDetail.do', $('#hForm'), 'pItmonSvrDetail', 1000, 650, params);
                    }
                    break;

                /** TMS */
                case 'cm_dosevt_detail':
                    if (type === 'grid') {
                        try {
                            params = HmGrid.getRowData(item);
                            if(params === null) {
                                alert('선택된 데이터가 없습니다.');
                                return;
                            }
                        } catch(e) {}
                    } else return;

                    if (params !== undefined || params !== ''){
                        $.post(ctxPath + '/main/popup/tms/pDosEvtData.do',
                            { evtNo: params.evtNo },
                            function(result) {
                                HmWindow.open($('#pwindow'), '이벤트 상세', result, 1000, 400);
                            }
                        );
                    }
                    break;

                /** traffic group detail */
                case 'grpDetail':
                    if (type === 'grid') {
                        try {
                            rowdata = HmGrid.getRowData(item);
                            if(rowdata === null) {
                                alert('선택된 데이터가 없습니다.');
                                return;
                            }
                            params = {grpNo: rowdata.grpNo};
                        } catch(e) {
                            console.log(e);
                        }
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/tms/pTrafficGroupDetail.do', $('#hForm'), 'pTrafficGroupDetail' + params.grpNo, 1000, 400, params);
                    }
                    break;

                /** RACK */
                case 'cm_rack_detail': //랙상세정보
                    if (type === 'grid') {
                        rowidxes = HmGrid.getRowIdxes(item, '선택된 데이터가 없습니다.');
                        if(rowidxes === false) return;
                        rowidx = item.jqxGrid('getselectedrowindex');
                        params = {};
                        params.mngNo = item.jqxGrid('getrowdata', rowidx).mngNo;
                    } else return;

                    if (params !== undefined || params !== ''){
                        HmUtil.createPopup('/main/popup/rack/pRackInfo.do', $('#hForm'), 'pRackInfo', 510, 700, item.jqxGrid('getrowdata', rowidx));
                    }
                    break;

                /** ERR_ACTION */
                case 'cm_err_action': //장애조치
                    if (type === 'grid') {
                        rowidxes = HmGrid.getRowIdxes(item, '선택된 데이터가 없습니다.');
                        if(rowidxes === false) return;
                        rowidx = item.jqxGrid('getselectedrowindex');
                        params = {};
                        params.mngNo = item.jqxGrid('getrowdata', rowidx).mngNo;
                    } else return;

                    if (params !== undefined || params !== ''){
                        var selectedrowindex = item.jqxGrid('getselectedrowindex');
                        var rowscount = item.jqxGrid('getdatainformation').rowscount;
                        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                            var id = item.jqxGrid('getrowid', selectedrowindex);
                            var commit = item.jqxGrid('deleterow', id);
                        }
                        alert('삭제되었습니다.');
                    }
                    break;
                    
                /** SECT */
                case 'cm_sect_perf': //이력 분석
                	var nodeName = '';
            		if (type === 'grid'){
                         try {
                             rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                             if(rowidx === false) return;
                             rowdata = item.jqxGrid('getrowdata', rowidx);
                             params = {
                                 nodeNo: rowdata.nodeNo,
                                 mngNo: rowdata.mngNo,
                                 nodeName: rowdata.nodeName,
                                 devName: rowdata.devName,
                                 dstDevName: rowdata.dstDevName,
                                 scIp: rowdata.fromIp,
                                 tgIp: rowdata.toIp
                             };
                             nodeName = rowdata.nodeName; 
                         } catch(e) {}
                     } else return;
                     if (params !== undefined || params !== '') {
                         $.post(ctxPath + '/main/popup/nms/pSectInfo.do',
                             params,
                             function(result) {
                                 HmWindow.open($('#pwindow'), '이력그래프 - '+nodeName, result, 1100, 570);
                             }
                         );
                     }
                    break;
                	
                /** 경로감시 */
                case 'cm_route_monit':
                	if (type === 'grid'){
                        try {
                            rowidx = HmGrid.getRowIdx(item, '선택된 데이터가 없습니다.');
                            if(rowidx === false) return;
                            rowdata = item.jqxGrid('getrowdata', rowidx);
//                            console.log(rowdata);
                            params = {
                        		routeNo: rowdata.routeNo,
                                mngNo: rowdata.mngNo
                            };
                        } catch(e) {}
                    } else return;
                	if (params !== undefined || params !== '') {
                        $.post(ctxPath + '/main/popup/nms/pRouteConf.do',
                            params,
                            function(result) {
                                HmWindow.open($('#pwindow'), '경로 비교', result, 1100, 500);
                            }
                        );
                    }
                	
                	break;
                /** 공통 */
                case 'cm_filter': //필터
                    item.jqxGrid('beginupdate');
                    if(item.jqxGrid('filterable') === false) {
                        item.jqxGrid({ filterable: true });
                    }
                    item.jqxGrid({ showfilterrow: !item.jqxGrid('showfilterrow') });
                    item.jqxGrid('endupdate');
                    break;
                case 'cm_filterReset': //필터초기화
                    item.jqxGrid('clearfilters');
                    break;
                case 'cm_colsMgr': //컬럼관리
                    $.post(ctxPath + '/main/popup/comm/pGridColsMgr.do',
                        function(result) {
                            HmWindow.open($('#pwindow'), '컬럼 관리', result, 300, 400, 'pwindow_init', item);
                        }
                    );
                    break;
            }
        }
};

/** jQuery extends */
$.extend({
	/** null check */
	isBlank: function(val) {
		var tmp = $.trim(val);
		if(tmp !== undefined && tmp != null && tmp.length > 0)
			return false;
		else
			return true;
	},

	isEmpty: function(obj) {
		if(obj !== undefined && obj != null)
			return false;
		else
			return true;
	},
	// param = ($('#ip), '아이피', byte))
	validateLength : function(obj, name, byte) {
		if (!obj instanceof Object) {
			console.log("인자값이 object가 아닙니다.");
			return false;
		}

		var objLength = obj.val().length;
		var objCon = obj.val();
		var i = 0;
		var resultLength = 0;

		for (; i < objLength; i++) {
			var _charASCII = objCon.charCodeAt(i);
			// 공백
			if (_charASCII == 32)
				resultLength += 0;
			// 숫자
			else if (_charASCII >= 48 && _charASCII <= 57)
				resultLength += 1;
			// 영어(대문자)
			else if (_charASCII >= 65 && _charASCII <= 90)
				resultLength += 2;
			// 영어(소문자)
			else if (_charASCII >= 97 && _charASCII <= 122)
				resultLength += 3;
			// 특수기호
			else if ((_charASCII >= 33 && _charASCII <= 47) || (_charASCII >= 58 && _charASCII <= 64) || (_charASCII >= 91 && _charASCII <= 96)
					|| (_charASCII >= 123 && _charASCII <= 126))
				resultLength += 4;
			// 한글
			else if ((_charASCII >= 12592) || (_charASCII <= 12687))
				resultLength += 5;
			else
				resultLength += 9;
		}

		if (resultLength > byte) {
			alert(name + "의 길이는 " + byte + "Byte를 넘을 수 없습니다.");
			return false;
		} else {
			return true;
		}
	},
	validateIp: function(strIP) {
    	var regExp = /^(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5])))$/;
		return regExp.test(strIP);
	},

	// 18.05.29] RouteHop에서 사용하는 IP 등록 형식 정규식
	validateIpRouteHop: function(strIP) {
    	var regExp = /^(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5])))$/;
    	// 'IP (IP)' 형식
    	var ip_regExp = /^(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5])))\s(\((((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5])))\))$/;
    	// 둘 중 하나의 형식이 맞으면 true 리턴
		return regExp.test(strIP)||ip_regExp.test(strIP);
	},

	// 2015-01-01 12:00, 2015-01-02 13:00
	validateDate : function(obj1, obj2) {
		if (!obj1 instanceof Object || !obj2 instanceof Object) {
			console.log("인자값이 object가 아닙니다.");
			return false;
		}

		if (obj1.val().length == 0 || obj2.val().length == 0) {
			return false;
		}
		if (obj1.val() >= obj2.val()) {
			alert('검색조건(기간)을 다시 확인해 주세요.');
			return false;
		}

		return true;
	},
	// 2015-01-01 13, 2015-01-01 15
	validateDateHours : function(obj1, obj2) {
		if (!obj1 instanceof Object || !obj2 instanceof Object) {
			console.log("인자값이 object가 아닙니다.");
			return false;
		}

		if (obj1.val().length == 0 || obj2.val().length == 0) {
			return false;
		}
		if (obj1.val() > obj2.val()) {
			alert('검색조건(기간)을 다시 확인해 주세요.');
			return false;
		} else {
			return true;
		}
	},

	// 2015-01-01 , 12:00, 2015-02-02, 13:00
	validateDateTime : function(date1, time1, date2, time2) {
		if (!date1 instanceof Object || !time1 instanceof Object || !date2 instanceof Object || !time2 instanceof Object) {
			console.log("인자값이 object가 아닙니다.");
			return false;
		}
		if (date1.val() > date2.val()) {
			alert('검색조건(날짜)을 다시 확인해 주세요.');
			return false;
		}
		if (date1.val() == date2.val()) {
			if (time1.val() >= time2.val()) {
				alert('검색조건(시간)을 다시 확인해 주세요.');
				return false;
			}
		}
	},

	restrictInput: function(obj, restrictChar) {
		var regexp = new RegExp(restrictChar, "g");
		obj.value = obj.value.replace(regexp, '');
	}

});

$.extend({

	requireInput: function(obj, preMsg) {
		if(obj.val().isBlank()) {
			alert(preMsg + ' 입력해주세요.');
			obj.focus();
			return false;
		}
		return true;
	}

});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
