<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    /**
     * @파일설명 : 사이버침해대응지원센터 대외실 > 침해 이벤트 건수
     * @작성자 : jjung
     * @작성일 : 2018. 11. 13
     ************************************************************
     * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음
     ************************************************************
     */
%>
<style type="text/css">
    .highcharts-title{
        width:500px !important;
        height:40px;
        line-height: 40px;
        top:0px  !important;
        background:url("/img/webdash/gridTit.svg") no-repeat top center;
        background-size: 385px 38px;
    }
</style>
<div class="TypeGrid">
    <div>
        <div class="TypeGridPanel"  id="#id_typeChart"  style="width:28%;height:360px;position:absolute;top:200px; border:1px solid #bdbdbd; margin-left: 5px;"></div>
    </div>
</div>