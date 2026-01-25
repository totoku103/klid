<%@ page import="com.klid.common.LoginString" %>
<!DOCTYPE html>
<html>

<head>
	<title>알림메시지</title>
<link rel="stylesheet" type="text/css" href="/css/error.css">
	<script type="text/javascript">
		function gotoHome() {
			location.href = 'https://ctrs.lcsc.go.kr' +  <%LoginString.getPath();%>;
		}
	</script>
</head>

<body>
	<div class="message_area">
		<div class="message_box">
			<h1>페이지를 찾을 수 없습니다.</h1>
			<div class="message_div">
				<div>
					<h2>알립니다.</h2>
					<p>
						잘못된 접근으로 인해<br>정상적으로 처리되지 못했습니다.
					</p>

				</div>
			</div><!-- END class="message_div" -->
			<div class="message_btn">
				<a href="javascript: gotoHome()"><img alt="첫화면으로 이동" src="/img/error/btnFirstPage.gif" title="첫화면으로 이동" /></a>
			</div>
		</div>
	</div>
</body>
</html>