<%@page import="org.apache.commons.io.FileUtils"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="flex.messaging.util.URLEncoder"%>
<%@page import="org.springframework.util.FileCopyUtils"%>
<%@page import="com.klid.common.AppGlobal"%>
<%@page import="java.io.FileInputStream"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%

 String filePath = request.getParameter("filePath");
 String fileName = URLEncoder.encode(request.getParameter("fileName"));
 String ext = ".xls";
 if(StringUtils.isBlank(filePath) || StringUtils.isBlank(fileName)) return;
 if(!StringUtils.isBlank(request.getParameter("fileExt"))) ext = request.getParameter("fileExt");

 response.setContentType("application/octet-stream");
 response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ext);
 response.setHeader("content-Transfer-Encoding", "binary");
 response.setHeader("Pragma", "no-cache");
 response.setHeader("Expires", "-1");
 
 ServletOutputStream sos = null;
 FileInputStream fis = null;
 File file = null;
 try {
	 out.clear();
	 pageContext.pushBody();
	 sos = response.getOutputStream();
	 file = new File(AppGlobal.homePath + filePath);
     System.out.printf(file.getPath());
     System.out.printf(file.getAbsolutePath());
	 fis = new FileInputStream(file.getAbsolutePath());
	 FileCopyUtils.copy(fis, sos);
 } catch(Exception e) {
	 
 } finally {
	 if(fis != null) fis.close();
	 if(sos != null) {
		 sos.flush();
		 sos.close();
	 }
	 if(file != null) file.delete();
 }
 
%>