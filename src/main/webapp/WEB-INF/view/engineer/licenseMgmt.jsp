<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="${pageContext.request.contextPath}/js/engineer/licenseMgmt.js"></script>
<div class="contentsP10">
    <div id="splitter" style="position: relative;">
        <div>
            <div class="pop_gridTitle" style="padding-left: 10px"><img alt="bullet" src="../../img/MainImg/customer_bullet.png">SMS License</div>
            <div class="searchBtn">
                <button id="btnSvrSave" type="button" class="p_btnSave"></button>
            </div>
            <div style="position: absolute; top: 30px; width: 99%" class="tableBorder">
                <table>
                    <tr class="pop_grid" >
                        <td class="pop_gridSub">License Key</td>
                        <td>
                            <textarea id="txtSvrLicenseKey" style="width: 98.5%; height: 200px; resize: none" class="pop_input1 p_border"></textarea>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <div class="pop_gridTitle" style="padding-left: 10px"><img alt="bullet" src="../../img/MainImg/customer_bullet.png">NMS License</div>
            <div class="searchBtn">
                <button id="btnNmsSave" type="button" class="p_btnSave"></button>
            </div>
            <div class="content" style="top: 40px">

            </div>
        </div>
    </div>
</div>