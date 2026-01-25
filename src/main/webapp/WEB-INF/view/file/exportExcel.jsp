<%@page import="org.springframework.util.FileCopyUtils"%>
<%@page import="com.klid.common.AppGlobal"%>
<%@page import="java.io.FileInputStream"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%
 request.setCharacterEncoding("utf-8");
 response.setCharacterEncoding("utf-8");
 response.setContentType("image/jpeg");
 response.setHeader("Content-Disposition", "attachment; filename=\"test.jpeg\"");
 response.setHeader("Pragma", "no-cache");
 response.setHeader("Cache-Control", "no-cache");
 out.print("<meta http-equiv=\"Content-Type\" content=\"image/jpeg; charset=utf-8\">");
 
//  ServletOutputStream sos = null;
//  FileInputStream fis = null;
//  try {
// 	 out.clear();
// 	 pageContext.pushBody();
// 	 sos = response.getOutputStream();
// 	 sos.flush();
// 	 sos.close();
//  } catch(Exception e) {
	 
//  } finally {
// 	 if(fis != null) fis.close();
// 	 if(sos != null) {
// 		 sos.flush();
// 		 sos.close();
// 	 }
//  }
 
%>

<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<style type="text/css">
 body {font-family:tahoma;font-size:12px}
 table {padding:2px;border-spacing:0px;font-family:tahoma;font-size:12px;border-collapse:collapse}
 td {text-align:center}
</style>
</head>
<body>
<% out.print(request.getParameter("excel_data")); %>
</body>
</html>
