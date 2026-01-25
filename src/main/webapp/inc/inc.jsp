<%@page import="com.klid.common.AppGlobal"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="X-UA-Compatible" content="IE=Edge,Chrome=1" />

<!-- stylesheet -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jqx.hamon.css" />

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jqx.ui-hamon-gray.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/netis.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/button.css" />

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/popup.css" />


<!-- js library -->
<script src="${pageContext.request.contextPath}/lib/jquery/jquery-1.12.4.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/jquery/jquery-dateFormat.js"></script>
<script src="${pageContext.request.contextPath}/lib/jquery/jquery.form.js"></script>
<script src="${pageContext.request.contextPath}/lib/jquery/jquery-migrate-1.2.1.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/jquery/jquery.marquee.min.js"></script>

<script src="${pageContext.request.contextPath}/lib/DOMPurify-3.3.0/purify.min.js"></script>
<script>
DOMPurify.setConfig({
    ALLOWED_TAGS: [
        'div', 'span', 'br', 'p', 'b', 'i', 'u',
        'ul', 'ol', 'li',
        'table', 'thead', 'tbody', 'tfoot',
        'tr', 'td', 'th'
    ],
    ALLOWED_ATTR: ['style'],
    RETURN_TRUSTED_TYPE: false,
});
</script>
<!-- layout -->
<%--<script src="${pageContext.request.contextPath}/lib/gridster/jquery.gridster.min.js"></script>--%>
<%--<link rel="stylesheet" href="${pageContext.request.contextPath}/lib/gridster/jquery.gridster.min.css"/>--%>

<!-- jqwidgets -->
<script src="${pageContext.request.contextPath}/lib/jqwidgets/jqx-all.js"></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/localization.js'></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/jqxcore.js'></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/jqxdatetimeinput.js'></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/jqxcalendar.js'></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/globalization/globalize.js'></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/globalization/globalize.culture.ko-KR.js'></script>


<!-- highchart -->
<script src="${pageContext.request.contextPath}/webjars/highcharts/10.3.3/highcharts.js"></script>
<script src="${pageContext.request.contextPath}/webjars/highcharts/10.3.3/highcharts-more.js"></script>
<script src="${pageContext.request.contextPath}/webjars/highcharts/10.3.3/modules/solid-gauge.js"></script>
<script src="${pageContext.request.contextPath}/webjars/highcharts/10.3.3/modules/no-data-to-display.js"></script>

<script src="${pageContext.request.contextPath}/webjars/highcharts/10.3.3/highcharts-3d.js"></script>
<script src="${pageContext.request.contextPath}/webjars/highcharts/10.3.3/modules/exporting.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/highchartscustomEvents.js"></script>

<script src="${pageContext.request.contextPath}/lib/megamenu/jquery.hoverIntent.minified.js"></script>
<script src="${pageContext.request.contextPath}/lib/megamenu/jquery.dcmegamenu.1.3.4.min.js"></script>

<!-- svg to canvas library -->
 <script src="${pageContext.request.contextPath}/lib/canvg/rgbcolor.js"></script>
<script src="${pageContext.request.contextPath}/lib/canvg/StackBlur.js"></script>
<script src="${pageContext.request.contextPath}/lib/canvg/canvg.js"></script>

<!-- hamon -->
<script src="${pageContext.request.contextPath}/js/hm/master.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.prototype.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.resource.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.util.js"></script>

<script src="${pageContext.request.contextPath}/js/hm/hm.comm.popup.js"></script>

<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.grid.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.window.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.tree.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.treegrid.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.date.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.dropdownbtn.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.dropdownlist.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.jqx.chart.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/hm.highchart.js"></script>
<script src="${pageContext.request.contextPath}/js/hm/jquery.base64.js"></script>

<!--sms -->
<script src="${pageContext.request.contextPath}/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
<script src="${pageContext.request.contextPath}/webjars/vertx3-eventbus-client/3.9.4/vertx-eventbus.js"></script>

<!--require -->
<script src="${pageContext.request.contextPath}/webjars/requirejs/2.3.7/require.min.js"></script>

<!-- placeholder -->
<script src="${pageContext.request.contextPath}/js/hm/placeholders.jquery.min.js"></script>