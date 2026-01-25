<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>알림메시지</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-type"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/error.css">
    <script type="text/javascript">
        function goHomePage() {
            location.href = location.origin;
        }

        function goPreviousPage() {
            window.history.back()
        }
    </script>
    <style>
        .btn-error-page {
            display: inline-block;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: bold;
            color: #fff;
            text-decoration: none;
            background: linear-gradient(to bottom, #4aaef7, #2a82c9); /* 파란색 그라데이션 */
            border: 1px solid #1e5f96; /* 테두리 */
            border-radius: 4px; /* 모서리 살짝 둥글게 */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* 그림자 */
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6); /* 글자 그림자 */
            cursor: pointer;
        }

        .btn-error-page:hover {
            background: linear-gradient(to bottom, #5bb7f9, #348cd3); /* hover 시 조금 더 밝게 */
            cursor: pointer;
        }
    </style>
</head>

<body>
<div class="message_area">
    <div class="message_box">
        <h1>페이지를 찾을 수 없습니다.</h1>
        <div class="message_div">
            <div>
                <h2>알립니다!!!!</h2>
                <p>
                    잘못된 접근으로 인해<br>정상적으로 처리되지 못했습니다.
                </p>
                <%--                  모델에  redirectMessage 값이 있으면 출력 --%>
                <c:if test="${not empty redirectMessage}">
                    <p>- ${redirectMessage}</p>
                </c:if>


            </div>
        </div>
        <div class="message_btn">
            <c:choose>
                <c:when test="${empty redirectMessage}">
                    <div id="button-first-page" onclick="goHomePage()" class="btn-error-page">첫 화면으로 이동</div>
                </c:when>
                <c:otherwise>
                    <div id="button-before-page" onclick="goPreviousPage()" class="btn-error-page">전 화면으로 이동</div>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</div>
</body>
</html>