<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<style>
    table {
        width: 100%;
        border: 1px solid #989898;
    }
    th, td {
        border: 1px solid #989898;
        text-align: center;
    }
</style>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/sys/riskMgmt.js"></script>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<div id="section">
    <div id="loc">
        <%@include file="/inc/loc.jsp" %>
    </div>
    <div class="content">
        <div class="contentsP10" style="top: 0">
            <div id="topSplitter">
                <div>
                    <div class="searchBox searchBox2">
                        <div class="searchBtn">
                            <button id="btnEdit" type="button" class="p_btnChange" style="border:none;"></button>
                        </div>
                    </div>
                    <table >
                        <colgroup>
                            <col width="100">
                            <col width="165">
                            <col width="100">
                            <col width="125">
                            <col width="100">
                            <col width="150">
                        </colgroup>
                        <tr class="pop_grid pop_first">
                            <th class="pop_gridSub" style="width: 20%;">구분</th>
                            <th class="pop_gridSub" style="width: 10%;">정상</th>
                            <th class="pop_gridSub" style="width: 10%;">관심</th>
                            <th class="pop_gridSub" style="width: 10%;">주의</th>
                            <th class="pop_gridSub" style="width: 10%;">경계</th>
                            <th class="pop_gridSub" style="width: 10%;">심각</th>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="" value="위협지수" readonly="readonly" style="border: none; text-align: center" title="riskVal">
                            </td>
                            <td>
                                <input type="text" id="basis1" value="1" readonly="readonly" style="border: none; text-align: center" title="basis1">
                            </td>
                            <td>
                                <input type="text" id="basis2" value="2" readonly="readonly" style="border: none; text-align: center" title="basis2">
                            </td>
                            <td>
                                <input type="text" id="basis3" value="3" readonly="readonly" style="border: none; text-align: center" title="basis3">
                            </td>
                            <td>
                                <input type="text" id="basis4" value="4" readonly="readonly" style="border: none; text-align: center" title="basis4">
                            </td>
                            <td>
                                <input type="text" id="basis5" value="5" readonly="readonly" style="border: none; text-align: center" title="basis5">
                            </td>
                        </tr>
                        <tr>
                            <td style="widtd: 20%; border: none;">

                            </td>
                            <td style="widtd: 10%; text-align: center; border: none;">
                                <button id="history1" type="button" class="p_btnHistory" style="border:none;"></button>
                            </td>
                            <td style="widtd: 10%; text-align: center; border: none;">
                                <button id="history2" type="button" class="p_btnHistory" style="border:none;"></button>
                            </td>
                            <td style="widtd: 10%; text-align: center; border: none;">
                                <button id="history3" type="button" class="p_btnHistory" style="border:none;"></button>
                            </td>
                            <td style="widtd: 10%; text-align: center; border: none;">
                                <button id="history4" type="button" class="p_btnHistory" style="border:none;"></button>
                            </td>
                            <td style="widtd: 10%; text-align: center; border: none;">
                                <button id="history5" type="button" class="p_btnHistory" style="border:none;"></button>
                            </td>
                        </tr>
                    </table>
                    <%--<div class="p_btnPos" style="margin-top: 20px;">
                        <button id="btnEdit" type="button" class="p_btnChange" style="border:none;"></button>
                    </div>--%>
                </div>


                <div id="hisoryDiv" style="display: none">
                    <div class="pop_gridTitle">
                        <img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> [<span class="riskName"></span>] 위협등급 변경 이력
                    </div>
                    <div style="position: absolute; left: 0px; top: 30px; right: 0px; bottom: 0px">
                        <div class="searchBox" style="height: 40px;">
                            <div>
                                <p style="margin-top: 5px;">
                                    ※ 위협지수 범위: <strong class="fileColor">[ <span id="riskValues"></span> ] </strong> 점.
                                    <br>
                                    ※ 이벤트 케이스의 발생 점수에 합이 해당 위협지수 범위안에 속하면 <strong class="fileColor">[<span class="riskName"></span>] </strong> 경보가 발생 합니다.
                                </p>
                            </div>
                        </div>
                        <div class="searchBox searchBox2">
                            <div class="searchBtn">
                                <button id="btnWrite" type="button" class="p_btnHistoryAdd" style="border:none;"></button>
                                <button id="btnHistoryDel" type="button" class="p_btnDel"></button>
                            </div>
                        </div>
                        <div class="content" style="margin-top: 50px;">
                            <div id="historyGrid" ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>