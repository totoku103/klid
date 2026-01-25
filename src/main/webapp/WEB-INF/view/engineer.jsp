<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
	/**
	 * @파일설명 : 엔지니어 설정 메인화면
	 * @작성자 : jjung
	 * @작성일 : 2016. 08. 20
	 ************************************************************
	 * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음 
	 ************************************************************
	 * @업데이트로그
	 */
%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp"%>
<%@include file="/inc/header.jsp"%>
<body>
<input type="hidden" id="p_isAuth" value="N" />
<div class="contentsP10" id="content" style="display: none">
	<div id="menu">
		<ul>
			<li>설정
				<ul style="width: 100px;">
					<li><a href="javascript: Engineer.gotoPage('menuMgmt.do', '메뉴설정')">메뉴설정</a></li>
					<%--<li><a href="javascript: Engineer.gotoPage('sysConf.do', '시스템설정')">시스템설정</a></li>
					<li><a href="javascript: Engineer.gotoPage('collectorConf.do', '수집기설정')">수집기설정</a></li>--%>
					<li><a href="javascript: Engineer.gotoPage('menuGrpMgmt.do', '메뉴권한설정')">메뉴권한설정</a></li>
					<li><a href="javascript: Engineer.gotoPage('encrySync.do', '사고암호화설정')">암호화싱크</a></li>
				</ul>
			</li>
			<li>회원초기화
				<ul style="width: 100px;">
					<li><a href="javascript: Engineer.gotoPage('passReset.do', '메뉴설정')">비번초기화</a></li>
				</ul>
			</li>
			<%--<li>그룹관리
				<ul style="width: 100px">
					<li><a href="javascript: Engineer.gotoPage('defGrpConf.do', '기본그룹관리')">기본그룹관리</a></li>
					<li><a href="javascript: Engineer.gotoPage('authGrpConf.do', '권한그룹관리')">권한그룹관리</a></li>
				</ul>
			</li>
			<li>서버관리
				<ul style="width: 130px">
					<li><a href="javascript: Engineer.gotoPage('agentVrsConf.do', '에이전트버전관리')">에이전트버전관리</a></li>
				</ul>
			</li>
			<li>관리
				<ul style="width: 130px">
					<li><a href="javascript: Engineer.gotoPage('licenseMgmt.do', '라이센스관리')">라이센스관리</a></li>
					<li><a href="javascript: Engineer.gotoPage('versionMgmt.do', '버전관리')">버전관리</a></li>
				</ul>
			</li>
			<li>Tool
				<ul style="width: 130px">
					<li><a href="javascript: Engineer.gotoPage('elasticSearchEditor.do', 'Elastic Search')">Elastic Search</a></li>
				</ul>
			</li>--%>
		</ul>
	</div>
	<div style="padding: 5px;">
		<label id="menuTxt" class="pageSubTitle" style="padding-left: 15px; font-weight: bold; font-size: 12pt"></label>
	</div>
	<div style="position: absolute; left: 0; top: 70px; right: 0; bottom: 0; border: 1px solid #eee">
		<div id="contents"></div>
	</div>
</div>
<div id="pEngwindow" style="position: absolute;">
	<div><h1>관리자 인증</h1></div>
	<div id="pwindowContent">
		<div class="tableBorder">
			<table>
				<tr class="pop_grid pop_borderline">
					<td class="pop_gridSub">관리자 패스워드</td>
					<td><input type="password" id="mgrPwd" name="mgrPwd" class="pop_input" autocomplete="off"  formmethod="post" onkeyup="keyuphandler(event)"/></td>
				</tr>
			</table>
		</div>
		<div style="text-align:center; margin-top:10px;">
			<input id="pbtnAuth" type="button" value="인증">
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
$(function() {
	$('#pEngwindow').jqxWindow({ width: 300, height: 120, closeButtonSize: 40,
		initContent: function() {
			$('#mgrPwd').focus();
		}	
	}).jqxWindow('open');
	
	$('#pbtnAuth').click(function() {
		/*Server.post('/code/authEngineer.do', {
			data: { mgrPwd: $('#mgrPwd').val() },
			success: function(result) {
				if(result == 'Y') {
					$('#p_isAuth').val('Y');
					alert('인증되었습니다.');
					$('#pEngwindow').jqxWindow('destroy');
					$.getScript('/js/engineer.js');
				}
				else {
					alert('인증에 실패하였습니다.');
					$('#mgrPwd').focus();
				}
			}
		});*/
        $('#pEngwindow').jqxWindow('destroy');
        $.getScript('/js/engineer.js');
	});
});

function keyuphandler(event) {
	if(event.keyCode == 13) $('#pbtnAuth').click();
}
</script>
</html>