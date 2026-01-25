<%@page import="java.util.regex.*"%>
<%@ page language="java" contentType="text/html;charset=utf-8" isErrorPage="true" %>
<%@ page import="org.apache.log4j.Logger" %>
<%
    final Logger log = Logger.getLogger(this.getClass());
    log.error("GPKI PAGE ERROR");

    if(request == null) {
        log.error("request is null");
    }

	String errmsg = request.getParameter("errmsg") == null?exception.toString():request.getParameter("errmsg");
	
	//hex to string
	String convertValue = "";
	Pattern p = Pattern.compile("(0x([a-fA-F0-9]{2}([a-fA-F0-9]{2})?))");
    Matcher m = p.matcher(errmsg);

    StringBuffer sb = new StringBuffer();
    int hashCode = 0;
    while( m.find() ) {
        hashCode = Integer.decode("0x" + m.group(2));
        m.appendReplacement(sb, new String(Character.toChars(hashCode)));
    }
    m.appendTail(sb);
    convertValue = sb.toString();
	errmsg = convertValue;


    log.error("GPKI PAGE ERROR [" + errmsg +"]");
    final Object startPageObj = request.getSession().getAttribute("start-page");
    if(startPageObj == null) return;
    switch ((String)startPageObj) {
        case "sign-in-popup":
            log.error("error redirect sign in popop page");
            response.sendRedirect("/gpki/sign-in-popup.do");
            break;
        case "sign-up-popup":
            log.error("error redirect sign up popop page");
            response.sendRedirect("/gpki/sign-up-popup.do");
            break;
    }
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge;" />
	<title>GPKI 사용자용 표준보안API 에러페이지</title>
    <%@include file="./header.jsp" %>
	<script type="text/javascript">
	/* 	Logout(); */
	</script>
</head>

<body>
	<h1 style="margin:0 auto; text-align:center;">GPKI 사용자용 표준보안API 오류</h1>
	<table  cellspacing="0" cellpadding="0" style="width:500px; height:80px; margin:0 auto; border: 1px solid black;">
		<tr>
			<td style="background-color:#A198FE;  width: 90px; text-align:center;">
				<b>&nbsp;Message</b>
			</td>
			<td>
				&nbsp;<%=errmsg%>
			</td>
		</tr>
	</table>
</body>
</html>