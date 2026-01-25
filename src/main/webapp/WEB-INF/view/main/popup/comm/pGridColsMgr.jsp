<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="p_div" class="p_contentsP5">
	<div style="text-align: center; float: left; margin-right: 10px; position: relative;">
		<form> 
			<label>전체</label>
			<input type="checkbox" style="float: left; margin-top: 4px"  onClick="this.value=checkAll(this.form.list)"> 
		</form> 
	</div>	
	<div style="height: 285px;; ">
		<div id="p_colListBox"></div>
		</div>
</div>

<div style=" text-align: center; margin-bottom: 10px; margin-top: 33px;">
		<button id="pbtnClose_comm" type="button" class="p_btnClose"></button>
</div>
<script>
	var p_grid, p_cols;
	var checkflag = false;
	
	function pwindow_init(grid) {
		p_grid = grid;
		p_cols = grid.jqxGrid('columns').records;
		// checked 속성이 존재하지 않으면 true로 설정
		$.each(p_cols, function(idx, value) {
			if(value.checked === undefined) {
				var isVisible = p_grid.jqxGrid('iscolumnvisible', value.datafield);
				value.checked = isVisible;
			}
		});
        $("#p_colListBox").jqxListBox({ source: p_cols, width: '100%', height: '100%', checkboxes: true, displayMember: 'text', valueMember: 'datafield' })
        	.on('checkChange', function(event) {
	            if (event.args.checked) {
	            	var idx =event.args.item.index;
	            	p_cols[idx].checked=true;            	
	            }
	            else {
	            	var idx =event.args.item.index;
	            	p_cols[idx].checked=false;
	            }
        	});
        
        $('#pbtnClose_comm').click(function() {
            //pwindow_closeHandler();
            pwindow_applyHandler();
		});
        $('#pbtnApply_comm').click(function() {
        	pwindow_applyHandler();
		});
	}
	
	function pwindow_closeHandler() {
		var _pwin = $($('#p_div').parent().parent().parent());
		HmWindow.close(_pwin);
	}
	
	function pwindow_applyHandler() {
		p_grid.jqxGrid('beginupdate');
		$.each(p_cols, function(idx, value) {
			var isVisible = p_grid.jqxGrid('iscolumnvisible', value.datafield);
			if(value.checked && isVisible == false) {
				p_grid.jqxGrid('showcolumn', value.datafield);
			}
			else if(value.checked == false && isVisible == true) {
				p_grid.jqxGrid('hidecolumn', value.datafield);
			}
		});
		p_grid.jqxGrid('endupdate');
		pwindow_closeHandler();
	}
	
	function checkAll(field) {
		if (checkflag == false) {
			$("#p_colListBox").jqxListBox('checkAll');
			checkflag = true;
		} else {
			$("#p_colListBox").jqxListBox('uncheckAll'); 
		  	checkflag = false; 
		}
	}
</script>