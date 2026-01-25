<%@page import="com.klid.common.AppGlobal"%>
<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page import="javax.imageio.ImageIO" %>
<%@ page import="java.awt.image.BufferedImage" %>
<%@ page import="java.io.*" %>
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Arrays" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // 업로드 디렉토리 경로
    String topPath = AppGlobal.uploadPath;

    System.out.println("zzzzzzzzzzzzzzz : " + topPath);

    String uploadDir = "D:/work/webdash/KoreaExpress/src/main/webapp/img/d3/bg";
    // 미리보기할 첨부파일 이미지
    String fileNm = "MapSeoul.png";
    // img 태그에 바인딩할 base64encoding data
    String base64Encoded = null;
    ArrayList<String> allowExtensions = new ArrayList<String>(
            Arrays.asList(new String[]{"JPG", "JPEG", "PNG", "GIF", "BMP"}));

    try {
        // 파일의 절대경로를 생성하여 파일객체 생성
        File file = new File(uploadDir + File.separator + fileNm);
        // 파일 존재여부 확인 & 파일인지 확인
        if(file.exists() && file.isFile()) {
            String extension = fileNm.substring(fileNm.lastIndexOf(".")+1).toUpperCase();
            System.out.println("Extension : " + extension);
            // 허용확장자인지 체크
            if(allowExtensions.contains(extension)) {
                FileInputStream fis = new FileInputStream(file);
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                byte[] buf = new byte[1024];
                try {
                    for (int readNum; (readNum = fis.read(buf)) != -1;) {
                        //Writes to this byte array output stream
                        bos.write(buf, 0, readNum);
//                        System.out.println("read " + readNum + " bytes,");
                    }
                } catch (IOException ex) {
                    // Logger.getLogger(ConvertImage.class.getName()).log(Level.SEVERE, null, ex);
                }

                byte[] bytes = bos.toByteArray();

                // byte[]로 읽어들인 이미지파일을 base64 인코딩한다. 이후 img 태그에 인코딩된 이미지를 바인딩한다.
                byte[] encodeBase64 = Base64.encodeBase64(bytes);
                base64Encoded = new String(encodeBase64, "UTF-8");

                System.out.println(base64Encoded);

            }
        }
        else {
            throw new Exception("이미지 파일이 아니거나 허용 확장자가 아닙니다.");
        }
    } catch(Exception e) {
        e.printStackTrace();
    }
%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>Netis.v3.6.0</title>

<!-- hamon -->
<%@include file="/inc/inc.jsp"%>

<body style="background:#f8f8f8; min-width: 1280px; min-height: 900px;">
<div id="header">
    <%@include file="/inc/header.jsp"%>
</div>
<script>
    function pInfoWindow_init(data) {
        $.ajax({
            type : "post",
            url :$('#ctxPath').val() + '/main/sec/qnaBoard/getBoardContents.do',
            data : "boardNo="+$('#boardNo').val(),
            dataType : "json",
            success : function(jsonData) {

                var resultData = jsonData.resultData.contents;
                var b = (jsonData.resultData.topPath)
                console.log(jsonData.resultData.attachFile);
                var a = jsonData.resultData.attachFile[0].athPath;
                console.log(b);
                var filePath = b + athPath + '//' + fileName
            }
        });
    }

</script>
<div>
    <img src="data:image/jpg;base64, <%=base64Encoded%>" id="img_preview">
</div>

</body>
</html>