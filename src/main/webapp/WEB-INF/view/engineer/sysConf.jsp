<%@ page import="com.klid.common.AppGlobal" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    /**
     * @파일설명 : 엔지니어 시스템설정 화면
     * @작성자 : jjung
     * @작성일 : 2016. 06. 30
     ************************************************************
     * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음
     ************************************************************
     * @업데이트로그
     */
%>
<script src="${pageContext.request.contextPath}/js/engineer/sysConf.js"></script>
<style>
<!--
	.eveLevelRow:first-child {
		margin-top: 5px;
	}
	
	.eveLevelRow:last-child {
		margin-bottom: 5px;
	}
	
	.eveLevelRow > span {
	 	margin-left: 15px;
	}
-->
</style>
<div class="content">
    <div class="contentsP10" style="top: 0px;">
        <div id="appWin" style="float: left;">
            <div>Application 설정</div>
            <div>
                <table>
                    <colgroup>
                        <col width="15%">
                        <col width="35%">
                        <col width="15%">
                        <col width="35%">
                    </colgroup>
                    <tr class="pop_grid">
                        <td class="pop_gridSub">사이트명</td>
                        <td>
                            <%--<div id="SITE_NAME" class="pop_combo1"></div>--%>
                            <div id="SITE_NAME"></div>
                        </td>
                        <td class="pop_gridSub">웹사이트명</td>
                        <td>
                            <%--<div id="WEB_SITE_NAME" class="pop_combo1"></div>--%>
                            <div id="WEB_SITE_NAME"></div>
                        </td>
                    </tr>

                    <tr class="pop_grid">
                        <td class="pop_gridSub">대시보드 포트</td>
                        <td><input type="text" id="DASH_PORT" class="pop_inputWrite" value="8082"/></td>
                        <td class="pop_gridSub">비밀번호암호화</td>
                        <td>
                            <div id="PWD_ENCR_USE" class="pop_combo1"></div>
                        </td>
                    </tr>
                    <tr class="pop_grid">
                        <td class="pop_gridSub">토폴로지권한사용</td>
                        <td>
                            <div id="TOPO_AUTH_USE" class="pop_combo1"></div>
                        </td>
                        <td class="pop_gridSub">분석설정 팝업사용</td>
                        <td>
                            <div id="APP_NETIS_POPUP" class="pop_combo1"></div>
                        </td>
                    </tr>
                    <!--
                    <tr class="pop_grid">
                        <td class="pop_gridSub">Oracle 버전</td>
                        <td>
                            <div id="ORACLE_VER" class="pop_combo1" style="float: left"></div>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    -->
                    <tr class="pop_grid">
                        <td class="pop_gridSub">업로드 경로</td>
                        <td><input type="text" id="UPLOAD_PATH" class="pop_inputWrite" readonly value="<%=AppGlobal.uploadPath%>"/></td>
                        <td class="pop_gridSub">업로드 용량제한(byte)</td>
                        <td><input type="text" id="UPLOAD_SIZE_LIMIT" class="pop_inputWrite" value="<%=AppGlobal.uploadSize%>"/></td>
                    </tr>
                    <tr class="pop_grid">
                        <td class="pop_gridSub">이벤트레벨 문구</td>
                        <td colspan="3">
                        	<p class="eveLevelRow">
	                        	<span>-정상 : <input type="text" id="EVT_LEVEL_0" class="pop_inputWrite" style="width:10%" /></span>
	                        	<span>-정보 : <input type="text" id="EVT_LEVEL_1" class="pop_inputWrite" style="width:10%" /></span>
	                        	<span>-주의 : <input type="text" id="EVT_LEVEL_2" class="pop_inputWrite" style="width:10%" /></span>
	                        	<span>-알람 : <input type="text" id="EVT_LEVEL_3" class="pop_inputWrite" style="width:10%" /></span>
                        	</p>
                        	<p class="eveLevelRow">
	                        	<span>-경보 : <input type="text" id="EVT_LEVEL_4" class="pop_inputWrite" style="width:10%" /></span>
	                        	<span>-장애 : <input type="text" id="EVT_LEVEL_5" class="pop_inputWrite" style="width:10%" /></span>
	                        	<span>-조치중 : <input type="text" id="EVT_LEVEL" class="pop_inputWrite" style="width:10%" /></span>
                        	</p>
                        </td>
                    </tr>
		
                </table>
            </div>
        </div>
        <!--
        <div id="delegateWin" style="clear: both; padding-top: 10px">
            <div>델리게이트엔진 설정</div>
            <div>
                <table>
                    <colgroup>
                        <col width="15%">
                        <col width="35%">
                        <col width="15%">
                        <col width="35%">
                    </colgroup>
                    <tr class="pop_grid">
                        <td class="pop_gridSub">IP</td>
                        <td><input type="text" id="DELEGATE_IP" class="pop_inputWrite"/></td>
                        <td class="pop_gridSub">PORT</td>
                        <td><input type="text" id="DELEGATE_PORT" class="pop_inputWrite"/></td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="itmonWin" style="clear: both; padding-top: 10px;">
            <div>스타셀 설정</div>
            <div>
                <table>
                    <colgroup>
                        <col width="15%">
                        <col width="35%">
                        <col width="15%">
                        <col width="35%">
                    </colgroup>
                    <tr class="pop_grid">
                        <td class="pop_gridSub">사용여부</td>
                        <td>
                            <div id="STARCELL_USE" class="pop_combo1"></div>
                        </td>
                        <td class="pop_gridSub">서비스URL</td>
                        <td><input type="text" id="STARCELL_SVC_URL" class="pop_inputWrite"/></td>
                    </tr>
                </table>
            </div>
        </div>
        -->
        <div style="clear: both; padding-top: 10px; width: 100%; height: 30px; text-align: right;">
            <button id="btnRefresh" class="p_btnRef"></button>
            <button id="btnSave" class="p_btnSave"></button>
        </div>
    </div>
</div>