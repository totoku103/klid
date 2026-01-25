//  @파일설명 : 사이버침해대응지원센터 운영자용(관제실) > 주요 홈페이지 위변조 현황
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        forgeryHTML = require('text!./Admctrl_forgeryHTML.jsp');

    function Admctrl_forgeryController(id) {
        this.id = id || 'admctrl_forgery';
    }

    Admctrl_forgeryController.prototype = {
        getHTML: function () {
            return forgeryHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            node.select("g[data-key=KMgrCircleRed]")
                .attr("display", function(d) { return d.cntevtLevel > 0? "block" : "none"; });

            node.select("g[data-key=iconErr]")
                .attr("display", function(d) { return d.cnt > 0? 'block' : 'none'; });

            node.select("text[data-key=txtCnt]")
                .text(function(d) { return d3.format(",")(d.cnt); });
        },

        refresh__: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            var svgW = parseFloat(this.svg.attr("width")), ctrlId = this.id;
            var g = node.enter()
                .selectAppend("g", "node")
                .merge(node)
                .attr("class", "node")
                .attr("transform", function (d, idx) {
                    var xgap = svgW / 4, xcnt = idx % 4;
                    return "translate({0},{1})".substitute(xcnt * xgap, 0);
                });

            // back panel
            g.append("image")
                .classed("bgPanel", true)
                .attr("xlink:href", "/webdash/img/PanelSvg/ForgeryPanel.svg")
                .attr("width", 135)
                .attr("height", 177);

            // circle
            g.append("g")
                .classed("stateCircle", true)
                .append("ellipse")
                .classed("circleOutside", true)
                .attr("cx", 67.5).attr("cy", 54.852).attr("rx", 42.5).attr("ry", 14.262)
                .select(function(d) { return this.parentNode; })
                .append("ellipse")
                .classed("circleInside", true)
                .attr("stroke", function(d) { return d.evtLevel > 0 ? "#FF3C00" : "#00DEFF"})
                .attr("cx", 67.5).attr("cy", 54.852).attr("rx", 42.5).attr("ry", 14.262)
                .select(function(d) { return this.parentNode; })
                .append("path")
                .attr("opacity", 0.2)
                .attr("d", "M109.5,52.308c-0.063-7.778-18.926-14.025-42.115-13.952C44.193,38.428,25.438,44.797,25.5,52.578" +
                    "c0.064,7.788,18.926,14.033,42.113,13.961C90.807,66.464,109.566,60.095,109.5,52.308")
                .select(function(d) { return this.parentNode; })
                .append("path")
                .attr("d", "M27.384,51.912C27.444,59.343,45.46,65.31,67.61,65.239" +
                    "c22.149-0.069,40.071-6.153,40.007-13.586c-0.059-7.438-18.077-13.405-40.227-13.332C45.238,38.39,27.322,44.474,27.384,51.912")
                .attr("fill", function(d) {
                    return "url(#{0}_{1}Circle_1)".substitute(ctrlId, d.evtLevel > 0? 'Err' : 'Nor');
                })
                .attr("stroke", "#FFFFFF")
                .attr("stroke-width", 0.0687)
                .select(function(d) { return this.parentNode; })
                .append("path")
                .attr("d", "M107.617,48.531c-0.059-7.429-18.077-13.396-40.227-13.325" +
                    "c-22.151,0.067-40.068,6.152-40.007,13.583c0.061,7.439,18.076,13.407,40.227,13.335C89.764,62.054,107.682,55.971,107.617,48.531")
                .attr("fill", function(d) {
                    return "url(#{0}_{1}Circle_2)".substitute(ctrlId, d.evtLevel > 0? 'Err' : 'Nor');
                })
                .attr("opacity", function(d) { return d.evtLevel > 0? 0.75 : 0.55; })
                .select(function(d) { return this.parentNode; })
                .append("path")
                .attr("d", "M38.928,58.523c-7.673-2.567-11.917-6.024-11.945-9.731c-0.016-1.906,1.072-3.75,3.232-5.479" +
                    "c6.332-5.067,20.923-8.374,37.174-8.424l0.393-0.002c10.685,0,20.731,1.392,28.291,3.92c7.675,2.564,11.916,6.019,11.946,9.723" +
                    "c0.017,1.909-1.071,3.754-3.233,5.486c-6.329,5.067-20.921,8.375-37.174,8.427l-0.396,0.001" +
                    "C56.532,62.443,46.486,61.049,38.928,58.523z M67.393,35.522c-16.05,0.051-30.419,3.284-36.608,8.237" +
                    "c-2.004,1.604-3.014,3.295-3,5.027c0.059,7.179,17.749,13.02,39.431,13.02h0.394c16.052-0.05,30.419-3.283,36.605-8.239" +
                    "c2.008-1.605,3.017-3.299,3.002-5.033c-0.055-7.175-17.746-13.012-39.435-13.012H67.393z")
                .attr("fill", function(d) {
                    return "url(#{0}_{1}Circle_3)".substitute(ctrlId, d.evtLevel > 0? 'Err' : 'Nor');
                });

            // back panel
            g.append("image")
                .classed("bgPanel", true)
                .attr("xlink:href", function(d) {
                    var imgNm = '';
                    switch(d.id) {
                        case 1: imgNm = 'HomePanel'; break;
                        case 2: imgNm = 'NormalPanel'; break;
                        case 3: imgNm = 'BlockPanel'; break;
                        case 4: imgNm = 'VariPanel'; break;
                    }
                    return "/webdash/img/IconSvg/{0}{1}.svg".substitute(imgNm, d.evtLevel>0? 'Err' : '');
                })
                .attr("width", 135)
                .attr("height", 177);

            g.append("text")
                .attr("transform", "matrix(1 0 0 1 0 106.6484)")
                // .append("tspan")
                .attr("x", 0).attr("y", 0).attr("fill", "#FFFFFF").attr("font-size", 22).attr("text-anchor", "middle")
                .attr("dx", 67).attr("dy", 0)
                .text(function(d) { return d.name; })
                .call(this.wrap, 1);
            g.append("text")
                .attr("transform", "matrix(1 0 0 1 67.394 169.2549)")
                .attr("fill", "#FFFFFF").attr("font-size", 30).attr("text-anchor", "middle")
                .text(function(d) { return d3.format(",")(d.cnt); });

            // this.playAnaimation();
        },

        wrap: function(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.2, // ems
                    y = text.attr("y"),
                    dx = parseFloat(text.attr("dx")),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                if(words.length == 1) {
                    lineNumber = 1;
                    lineHeight = 0.5;
                }
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    // console.log(tspan.node().getComputedTextLength());
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineNumber++ * lineHeight + dy + "em").attr("dx", dx)
                            .attr("text-anchor", "middle").text(word);
                        // tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineNumber++ * lineHeight + dy + "em").attr("dx", 30).text(word);
                    }
                }
            });
        },

        getSvg: function() {
            if(this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            return this.svg;
        },

        resize: function() {
            var svg = this.getSvg();
            var parent = svg.node().parentNode;
            var scaleX = parent.offsetWidth / parseFloat(svg.attr("width")),
                scaleY = parent.offsetHeight / parseFloat(svg.attr("height")),
                svgW = parseFloat(svg.attr("width")) * scaleX,
                svgH = parseFloat(svg.attr("height")) * scaleY;
            svg
                .attr("width", svgW)
                .attr("height", svgH);
            
            svg.selectAll("g#{0}_circle > g".substitute(this.id))
                .attr("transform", function(d, i) {
                    return "translate({0},{1})".substitute(i * 60 + 100, 0); //circle 위치조절
                });
            svg.selectAll("g#{0}_LineBG".substitute(this.id)).attr("transform", "scale(1.5, 1)"); //background line 크기
            svg.selectAll("g#{0}_arrow".substitute(this.id)).attr("transform", "scale(1.5, 1)"); //arrow 크기
        },

        playAnaimation: function () {
            this.stopAnimation();

            // animation target
            var g = this.svg.selectAll("g.stateCircle");
            g.transition()
                .style("opacity", 0)
                .delay(1000)
                .transition()
                .style("opacity", 1)
                .delay(1000)
                .on("end", function repeat() {
                    d3.active(this)
                        .transition()
                        .style("opacity", 0)
                        .delay(1000)
                        .transition()
                        .style("opacity", 1)
                        .delay(1000)
                        .on("end", repeat);
                });
        },

        stopAnimation: function () {
            var g = this.svg.select("g.stateCircle");
            g.on("end", null);
        }
    };

    return Admctrl_forgeryController;
});
