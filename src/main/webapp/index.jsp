<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    /**
     * @파일설명 : 전자정부 사이버보안 종합현황
     * @작성자 : jjung
     * @작성일 : 2018. 10. 30
     ************************************************************
     * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음
     ************************************************************
     */
%>
<!DOCTYPE html>
<html>
<head>
    <title>Hamon Topology</title>
    <%@include file="/inc/inc.jsp" %>
    <meta charset="utf-8"/>

    <script src="${pageContext.request.contextPath}/lib/d3/d3.v4.min.js"></script>
    <script src="${pageContext.request.contextPath}/webdash/js/hm.dash.util.js"></script>
    <link rel="stylesheet" href="main.css">
    <style>
        .chart div {
            font: 10px sans-serif;
            background-color: steelblue;
            text-align: right;
            padding: 3px;
            margin: 1px;
            color: white;
        }
    </style>
</head>
<body>

   <div class="chart" style="width: 200px; height: 600px"></div>


<script>

    function init() {
        var projection = d3.geoMercator()
            .scale(1920)
            .rotate([-0.25, 0.25, 0])
            .center([139.0032936, 36.3219088]);

        var path = d3.geoPath().projection(projection);

        var map = d3.select("body")
            .append("svg")
            .attr("width", 960)
            .attr("height", 500);

        d3.json("gunma.geojson", drawMaps);
    }


    function init_gradient() {
        var data = [56, 72, 20, 95, 80, 57, 120, 140, 150, 170, 190, 200];
        //
        // var main_xScale = d3.scale.linear().range(0, 200);
        // var main_yScale = d3.scale.ordinal().rangeRoundBands([0, 200], 0.4, 0);
        //
        // main_xScale.domain([0, d3.max(data, function(d) { return d.value; })]);
        // main_yScale.domain(data.map(function(d, i) { return i; }));

        d3.select('.chart').append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', function (d) {
                return d + 'px';
            })
            .attr('height', function (d) {
                return 30 + 'px';
            })
            .attr("x", 0)
            .attr("y", function(d, i) {
                return (i * 30) + (i*10) + 'px';
            })
            .style("fill", "url(#gradient-rainbow-main)")
            .text(function (d) {
                return d;
            });

        createGradient("gradient-rainbow-main", "100%");
    }

    //Create a gradient
    function createGradient(idName, endPerc) {

        var defs = d3.select("svg").append("defs");

        var coloursRainbow = ["#5091BA", "#FFC500", "#EE7C37", "#EB2549"];

        defs.append("linearGradient")
            .attr("id", idName)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", endPerc).attr("y2", "0%")
            .selectAll("stop")
            .data(coloursRainbow)
            .enter().append("stop")
            .attr("offset", function(d,i) { return i/(coloursRainbow.length-1); })
            .attr("stop-color", function(d) { return d; });
    }//createGradient


    $(function() {
        init();
    });

</script>

</body>
</html>