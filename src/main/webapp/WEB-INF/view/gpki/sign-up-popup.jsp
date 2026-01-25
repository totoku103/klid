<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.sql.*, java.io.*, java.net.*, java.util.*" %>
<%@ include file="./gpkisecureweb.jsp" %>
<%@ page import="com.gpki.servlet.GPKIHttpServletResponse" %>
<%
    String challenge = gpkiresponse.getChallenge();
    String sessionid = gpkirequest.getSession().getId();
    String url = javax.servlet.http.HttpUtils.getRequestURL(request).toString();
    url = url.replaceAll("http://", "https://");
    session.setAttribute("currentpage", url);
    session.setAttribute("start-page", "sign-up-popup");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge;"/>
    <title>GPKI 사용자용 표준보안API</title>
    <%@include file="./header.jsp" %>
    <script type="text/javascript">
        initSecureSession(true);
        document.body.onload = function () {
            gpkiReload();

            setTimeout(function () {
                Login(this, popForm, true);
            }, 1000);
        }

        window.addEventListener("message", (event) => {
            if (event.origin !== location.origin) return;
            if (event.data && event.data.type === "gpki:close") {
                window.close();
            }
        });
    </script>
</head>
<body>
<div>
    <div id="gpkiOnload"></div>
    <form action="/gpki/register.do" method="post" name="popForm" id="popForm">
        <select id="keysec" style="display: none;">
            <option value="1" selected="selected">가상 키보드</option>
            <option value="0">사용하지 않음</option>
        </select>
        <input type="hidden" name="challenge" value="<%=challenge%>"/>
        <input type="hidden" name="sessionid" id="sessionid" value="<%=sessionid%>"/>
    </form>
</div>
</body>
</html>