<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    /**
     * @파일설명 : 사이버침해대응지원센터 전자정부 상황판4
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
<div id="allStatusGrid">
    <div id="workStatus">
        <div class="gridTit">근무 현황</div>
        <div id="workGrid" class="statusGrid">
            <table style="border:1px solid #d9d9d9;">
                <colgroup>
                    <col width="25%">
                    <col width="15%">
                    <col width="25%">
                    <col width="35%">
                </colgroup>
                <tr>
                    <th>상황근무 현황</th>
                    <th id="totalCnt"></th>
                    <th>담당자</th>
                    <th>위탁요원</th>
                </tr>
                <tr>
                    <td class="textLeft" id="workCp1"></td>
                    <td id="workPs1">명</td>
                    <td id="workMng1"></td>
                    <td id="workCon1"></td>
                </tr>
                <tr class="backTrans">
                    <td class="textLeft" id="workCp2" ></td>
                    <td id="workPs2" >명</td>
                    <td id="workMng2" ></td>
                    <td id="workCon2"></td>
                </tr>
                <tr>
                    <td class="textLeft" id="workCp3" ></td>
                    <td id="workPs3" >명</td>
                    <td id="workMng3" ></td>
                    <td id="workCon3"></td>
                </tr>
            </table>
        </div>
    </div>
    <div id="actionStatus">
        <div class="gridTit">사이버위협 탐지/차단 현황</div>
        <div id="gridWidget">
            <div class="l_Widget">
                <div class="wtit">중앙행정기관 (탐지, 자동차단)</div>
                <div class="graphChart" id="gChart1" ></div>
            </div>
            <div class="r_Widget">
                <div class="wtit">지방자치단체 (탐지, 자동차단)</div>
                <div class="graphChart" id="gChart2"></div>
            </div>
        </div>
        <div id="actionGrid" class="statusGrid">
            <table style="border:1px solid #ececec;">
                <colgroup>
                    <col width="20%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                    <col width="8%">
                </colgroup>
                <tr>
                    <th rowspan="2" style="background:linear-gradient(#1c5177,#143f5e);">구분</th>
                    <th colspan="5" data-info="prpl">중앙행정기관 (국가정보자원관리원)</th>
                    <th colspan="5" data-info="grn">지방자치단체 (한국지역정보개발원)</th>
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
                <tr class="backFill">
                    <td>자동차단</td>
                    <td id="sum3"></td>
                    <td id="nirsCdA"></td>
                    <td id="nirsDdA"></td>
                    <td id="nirsHkA"></td>
                    <td id="nirsEtA"></td>
                    <td id="sum4"></td>
                    <td id="klidCdA"></td>
                    <td id="klidDdA"></td>
                    <td id="klidHkA"></td>
                    <td id="klidEtA"></td>
                </tr>
                <tr class="backFill">
                    <td>수동차단</td>
                    <td id="sum1"></td>
                    <td id="nirsCdM"></td>
                    <td id="nirsDdM"></td>
                    <td id="nirsHkM"></td>
                    <td id="nirsEtM"></td>
                    <td id="sum2"></td>
                    <td id="klidCdM"></td>
                    <td id="klidDdM"></td>
                    <td id="klidHkM"></td>
                    <td id="klidEtM"></td>
                </tr>
                <tr class="backFill">
                    <td>탐지</td>
                    <td id="sum5" ></td>
                    <td id="nirsCdD"></td>
                    <td id="nirsDdD"></td>
                    <td id="nirsHkD"></td>
                    <td id="nirsEtD"></td>
                    <td id="sum6"></td>
                    <td id="klidCdD"></td>
                    <td id="klidDdD"></td>
                    <td id="klidHkD"></td>
                    <td id="klidEtD"></td>
                </tr>
                <tr class="backTrans">
                    <td class="totalGrid">합계</td>
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
        <div class="networkStatus">
            <div class="gridTit">전자정부 네트워크 현황</div>
            <div id="networkGrid" class="statusGrid">
                <table style="border:1px solid #d9d9d9;" >
                    <colgroup>
                        <col width="22%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                    </colgroup>
                    <tr>
                        <th rowspan="2" style="background:linear-gradient(#1c5177,#143f5e);">구분</th>
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
                    <tr class="backFill">
                        <td style="letter-spacing:-3px;">트래픽량</td>
                        <td id="gtAv">G</td>
                        <td id="gtMax">G</td>
                        <td id="ctAv">G</td>
                        <td id="ctMax">G</td>
                        <td id="ssAv">MB</td>
                        <td id="ssMax">MB</td>
                    </tr>
                    <tr>
                        <td>결과</td>
                        <td colspan="2" id="gtRst">-</td>
                        <td colspan="2" id="ctRst">-</td>
                        <td colspan="2" id="ssRst">-</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="issueStatus">
            <div class="gridTit">전자정부 장애 현황</div>
            <div id="issueGrid" class="statusGrid">
                <table style="border:1px solid #d9d9d9;">
                    <colgroup>
                        <col width="12%">
                        <col width="17.6%">
                        <col width="17.6%">
                        <col width="17.6%">
                        <col width="17.6%">
                        <col width="17.6%">
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
                        <td rowspan="2" id="errSvr"></td>
                        <td rowspan="2" id="errNet"></td>
                        <td rowspan="2" id="errStr"></td>
                        <td rowspan="2" id="errBak"></td>
                        <td rowspan="2" id="errHom"></td>
                    </tr>
                    <tr></tr>
                </table>
            </div>
        </div>
    </div>
    <div id="boardStatus">
        <div class="l_board">
            <div class="b_Tit">상황전파 현황</div>
            <div class="brdTxtArea">
                <div class="inputTxt" id="noti1" ></div>
                <div class="inputTxt" id="noti2"></div>
            </div>
        </div>
        <div class="r_board">
            <div class="b_Tit">보안동향</div>
            <div class="brdTxtArea">
                <div class="inputTxt" id="secu1"></div>
                <div class="inputTxt" id="secu2" ></div>
            </div>
        </div>
    </div>
</div>