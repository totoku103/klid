<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    /**
     * @파일설명 : 사이버침해대응지원센터 운영자용(관제실) > 침해 이벤트 건수
     * @작성자 : jjung
     * @작성일 : 2018. 11. 13
     ************************************************************
     * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음
     ************************************************************
     */
%>

<div class="ThrPanel">
    <div class="ThrEvt01">
        <img src="<c:url value="/img/webdash/ThrEvt001.png"/>" alt="이미지" style="width:170px; height:auto;">
        <div class="ThrEvt001">
            <div id="#id_inciCnt">0</div>
        </div>
    </div>
    <div class="ThrEvt02">
        <img src="<c:url value="/img/webdash/ThrEvt002.png"/>" alt="이미지" style="width:170px; height:auto;">
        <div class="ThrEvt002">
            <div id="#id_tbzledgeCnt">0</div>
        </div>
    </div>
</div>
<div class="TypeGrid">
    <div style="width:100%; height:462px;">
        <div class="TypeGridPanel"  id="#id_typeChart"  style="width:99%;height:250px;position:absolute;top:105px;margin-left: 2.5px;"></div>
    </div>
</div>