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
        <img src="<c:url value="/img/webdash/ThrEvt001.png"/>" alt="이미지" style="width:110px; height:auto;">
        <div class="ThrEvt001">
            <div id="#id_inciCnt"></div>
        </div>
    </div>
    <div class="ThrEvt02">
        <img src="<c:url value="/img/webdash/ThrEvt002.png"/>" alt="이미지" style="width:110px; height:auto;">
        <div class="ThrEvt002">
            <div id="#id_tbzledgeCnt"></div>
        </div>
    </div>
</div>
<div class="ThrGrid">
    <div style="width:100%; height:337px;">
        <div class="ThrGridPanel">
            <div class="ThrTable" style="width:100%;">
                <table id="#id_inciType" style="width:34%; float:left;">
                    <colgroup>
                        <col width="100px">
                        <col width="100px">
                    </colgroup>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>
                <table id="#id_tbzledge" style="width:66%; float:left;">
                    <colgroup>
                        <col width="102px">
                        <col width="102px">
                        <col width="102px">
                        <col width="102px">
                    </colgroup>
                    <tr>
                        <td>구분</td>
                        <td>계</td>
                        <td>완료</td>
                        <td>진행</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>