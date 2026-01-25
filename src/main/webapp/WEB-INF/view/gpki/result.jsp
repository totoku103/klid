<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <%@include file="./header.jsp" %>
</head>
<body>
<input type="hidden" id="type" name="type" value="${param.type}">
<input type="hidden" id="code" name="code" value="${param.code}">
<input type="hidden" id="message" name="message" value="${param.message}">
<script>
    console.log("result loading")
    document.addEventListener('DOMContentLoaded', () => {
        console.log("DOMContentLoaded")
        // Logout();
        const element = document.getElementById('message');
        const decodeMessage = decodeURIComponent(escape(atob(element.value)));
        alert(decodeMessage)
        window.close();
    })

    let send = false;
    window.addEventListener('beforeunload', () => {
         console.log("beforeunload")
        if (window.opener && !window.opener.closed) {
            if (send) return;

            const tE = document.getElementById('type');
            const decodeType = decodeURIComponent(escape(atob(tE.value)));

            const cE = document.getElementById('code');
            const decodeCode = decodeURIComponent(escape(atob(cE.value)));

            const mE = document.getElementById('message');
            const decodeMessage = decodeURIComponent(escape(atob(mE.value)));

            send = true;
            window.opener.postMessage({
                type: decodeType,
                code: decodeCode,
                message: decodeMessage
            }, window.location.origin);
        }
    });
</script>
</body>
</html>
