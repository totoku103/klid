<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.klid.webapp.common.SessionManager" %>
<%
    //String auth = SessionManager.getUser().getAuth().toUpperCase();
    String auth = "1";
%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/mois/dashConfig.js"></script>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm">
    <%if (auth.equals("SYSTEM") || auth.equals("ADMIN")) {%>
    <input type="hidden" id="auth" name="auth" value="SYSTEM"/>
    <%} %>
    <div id="section">
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>
        <div class="newBox">
            <div class="searchBox">
                <div id="groupType" style="float: left; margin-left: 5px;"></div>
                <div>
                    <label>일자:</label>
                    <div id="datTime" style="float: left" class="pop_combo1" ></div>
                </div>
                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn" style="border:none;"></button>
                    <button id="btnWrite" type="button" class="p_btnSave" style="border:none;"></button>
                </div>
            </div>
        </div>
            <div id="dashGrid">
                <input type="hidden" id="addType" name="addType"/>
                <div id="workStatus">
                    <div class="gridTit">근무 현황</div>
                    <div id="workGrid" class="statusGrid">
                        <table style="border:1px solid #d9d9d9;">
                            <colgroup>
                                <col width="15%">
                                <col width="5%">
                                <col width="30%">
                                <col width="50%">
                            </colgroup>
                            <tr>
                                <th>상황근무 현황</th>
                                <th id="totalCnt"></th>
                                <th>담당자</th>
                                <th>위탁요원</th>
                            </tr>
                            <tr>
                                <td class="textLeft"><input type="text" style="width:80%;" id="workCp1" maxlength="50"  ></td>
                                <td><input type="text" style="width:40px;" id="workPs1" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)">명</td>
                                <td><input type="text" style="width:80%;" id="workMng1" maxlength="500" ></td>
                                <td><input type="text" style="width:80%;" id="workCon1" maxlength="500"></td>
                            </tr>
                            <tr>
                                <td class="textLeft"><input type="text" style="width:80%;" id="workCp2" maxlength="50" ></td>
                                <td><input type="text" style="width:40px;" id="workPs2" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)">명</td>
                                <td><input type="text" style="width:80%;" id="workMng2"  maxlength="500"></td>
                                <td><input type="text" style="width:80%;" id="workCon2"  maxlength="500"></td>
                            </tr>
                            <tr>
                                <td class="textLeft"><input type="text" style="width:80%;" id="workCp3" maxlength="50" ></td>
                                <td><input type="text" style="width:40px;" id="workPs3" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)">명</td>
                                <td><input type="text" style="width:80%;" id="workMng3"  maxlength="500"></td>
                                <td><input type="text" style="width:80%;" id="workCon3"  maxlength="500"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="actionStatus">
                    <div class="gridTit">사이버위협 탐지/차단 현황</div>
                    <div id="actionGrid" class="statusGrid">
                        <table style="border:1px solid #ececec;">
                            <colgroup>
                                <col width="5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                                <col width="9.5%">
                            </colgroup>
                            <tr>
                                <th rowspan="2" style="background:#0a73a7;">구분</th>
                                <th colspan="5" data-info="prpl">중앙행정기관(국가정보자원관리원)</th>
                                <th colspan="5" data-info="grn">지방자치단체(한국지역정보개발원)</th>
                            </tr>
                            <tr>
                                <td data-info="prpl">(소계)</td>
                                <td data-info="prpl">악성코드</td>
                                <td data-info="prpl">DDos</td>
                                <td data-info="prpl">해킹</td>
                                <td data-info="prpl">기타</td>
                                <td data-info="grn">(소계)</td>
                                <td data-info="grn">악성코드</td>
                                <td data-info="grn">DDos</td>
                                <td data-info="grn">해킹</td>
                                <td data-info="grn">기타</td>
                            </tr>
                            <tr>
                                <td>자동차단</td>
                                <td id="sum3"></td>
                                <td><input type="text" style="width:80%;" id="nirsCdA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsDdA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsHkA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsEtA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td id="sum4"></td>
                                <td><input type="text" style="width:80%;"  id="klidCdA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;"  id="klidDdA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;"  id="klidHkA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)" ></td>
                                <td><input type="text" style="width:80%;"  id="klidEtA" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                            </tr>
                            <tr>
                                <td>수동차단</td>
                                <td id="sum1"></td>
                                <td><input type="text" style="width:80%;" id="nirsCdM" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsDdM" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsHkM" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsEtM" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td id="sum2"></td>
                                <td><input type="text" style="width:80%;" id="klidCdM" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="klidDdM"onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)" ></td>
                                <td><input type="text" style="width:80%;" id="klidHkM" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="klidEtM" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                            </tr>
                            <tr>
                                <td>탐지</td>
                                <td id="sum5" ></td>
                                <td><input type="text" style="width:80%;" id="nirsCdD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsDdD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsHkD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="nirsEtD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td id="sum6"></td>
                                <td><input type="text" style="width:80%;" id="klidCdD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="klidDdD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="klidHkD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                <td><input type="text" style="width:80%;" id="klidEtD" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                            </tr>
                            <tr>
                                <td class="totalGrid" style="background:#d8d8d8;">합계</td>
                                <td id="sum7"></td>
                                <td id="niraSum1" ></td>
                                <td id="niraSum2" ></td>
                                <td id="niraSum3" ></td>
                                <td id="niraSum4" ></td>
                                <td id="sum8"></td>
                                <td id="klidSum1"></td>
                                <td id="klidSum2"></td>
                                <td id="klidSum3"></td>
                                <td id="klidSum4"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="elecGovernment">
                    <div class="networkStatus" style="width:49%;">
                        <div class="gridTit">전자정부 네트워크 현황</div>
                        <div id="networkGrid" class="statusGrid">
                            <table style="border:1px solid #d9d9d9;" >
                                <colgroup>
                                    <col width="5%">
                                    <col width="15.8%">
                                    <col width="15.8%">
                                    <col width="15.8%">
                                    <col width="15.8%">
                                    <col width="15.8%">
                                    <col width="15.8%">
                                </colgroup>
                                <tr>
                                    <th rowspan="2">구분</th>
                                    <th colspan="2" data-info="prpl">국통망(최대 10G)</th>
                                    <th colspan="2" data-info="grn">센터망(최대 2G)</th>
                                    <th colspan="2" data-info="org">소속기관(최대 1G)</th>
                                </tr>
                                <tr>
                                    <td>평균값</td>
                                    <td>최대값</td>
                                    <td>평균값</td>
                                    <td>최대값</td>
                                    <td>평균값</td>
                                    <td>최대값</td>
                                </tr>
                                <tr>
                                    <td style="letter-spacing:-3px;">트래픽량</td>
                                    <td><input type="text" style="width:50%;" id="gtAv" onKeyUp="return floatkeyCheck(event)" onblur="return floatkeyCheck(event)"> G</td>
                                    <td><input type="text" style="width:50%;" id="gtMax" onKeyUp="return floatkeyCheck(event)" onblur="return floatkeyCheck(event)"> G</td>
                                    <td><input type="text" style="width:50%;" id="ctAv" onKeyUp="return floatkeyCheck(event)" onblur="return floatkeyCheck(event)"> G</td>
                                    <td><input type="text" style="width:50%;" id="ctMax" onKeyUp="return floatkeyCheck(event)" onblur="return floatkeyCheck(event)"> G</td>
                                    <td><input type="text" style="width:50%;" id="ssAv" onKeyUp="return floatkeyCheck(event)" onblur="return floatkeyCheck(event)"> MB</td>
                                    <td><input type="text" style="width:50%;" id="ssMax" onKeyUp="return floatkeyCheck(event)" onblur="return floatkeyCheck(event)"> MB</td>
                                </tr>
                                <tr>
                                    <td style="background:#d8d8d8;">결과</td>
                                    <td colspan="2">
                                        <select name="result" id="gtRst">
                                            <option value="" selected="selected">선택</option>
                                            <option value="1">양호</option>
                                        </select>
                                    </td>
                                    <td colspan="2">
                                        <select name="result" id="ctRst">
                                            <option value="" selected="selected">선택</option>
                                            <option value="1">양호</option>
                                        </select>
                                    </td>
                                    <td colspan="2">
                                        <select name="result" id="ssRst">
                                            <option value="" selected="selected">선택</option>
                                            <option value="1">양호</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="issueStatus" style="width:49%;">
                        <div class="gridTit">전자정부 장애 현황</div>
                        <div id="issueGrid" class="statusGrid">
                            <table style="border:1px solid #d9d9d9;">
                                <colgroup>
                                    <col width="5%">
                                    <col width="19%">
                                    <col width="19%">
                                    <col width="19%">
                                    <col width="19%">
                                    <col width="19%">
                                </colgroup>
                                <tr>
                                    <th rowspan="2">구분</th>
                                    <th rowspan="2">서버</th>
                                    <th rowspan="2">네트워크/보안</th>
                                    <th rowspan="2">스토리지</th>
                                    <th rowspan="2">백업/기타</th>
                                    <th rowspan="2">홈페이지</th>
                                </tr>
                                <tr></tr>
                                <tr>
                                    <td rowspan="2">수량</td>
                                    <td rowspan="2"><input type="text" style="width:80%;" id="errSvr" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                    <td rowspan="2"><input type="text" style="width:80%;" id="errNet" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                    <td rowspan="2"><input type="text" style="width:80%;" id="errStr" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                    <td rowspan="2"><input type="text" style="width:80%;" id="errBak" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                    <td rowspan="2"><input type="text" style="width:80%;" id="errHom" onKeyUp="return numkeyCheck(event)" onblur="return numkeyCheck(event)"></td>
                                </tr>
                                <tr></tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="noticeAlarm">
                    <div class="condition" style="width:49%;">
                        <div class="gridTit">상황전파 현황</div>
                        <div class="statusGrid">
                            <table style="border:1px solid #d9d9d9;">
                                <tr>
                                    <td style="width:5%; background:#0a73a7; color:#fff; border-top:none;"><span>1 </span></td>
                                    <td style="width:95%; border-top:none;"><input type="text" style="width:99%;" id="noti1" maxlength="500" ></td>
                                </tr>
                                <tr>
                                    <td style="width:5%; background:#0a73a7; color:#fff;"><span>2 </span></td>
                                    <td style="width:95%;"><input type="text" style="width:99%;" id="noti2" maxlength="500" ></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="security" style="width:49%;">
                        <div class="gridTit">보안동향</div>
                        <div  class="statusGrid">
                            <table style="border:1px solid #d9d9d9;">
                                <tr>
                                    <td style="width:5%; background:#0a73a7; color:#fff; border-top:none;"><span>1 </span></td>
                                    <td style="width:95%; border-top:none;"><input type="text" style="width:99%;" id="secu1" maxlength="500" ></td>
                                </tr>
                                <tr>
                                    <td style="width:5%; background:#0a73a7; color:#fff;"><span>2 </span></td>
                                    <td style="width:95%;"><input type="text" style="width:99%;" id="secu2" maxlength="500" ></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</form>
</body>
</html>