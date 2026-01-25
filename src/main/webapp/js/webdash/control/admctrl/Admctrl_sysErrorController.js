//  @파일설명 : 사이버침해대응지원센터 운영자용(관제실) > 시스템 장애현황
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        sysErrorHTML = require('text!./Admctrl_sysErrorHTML.jsp'),
        sysErrorItemHTML = require('text!./Admctrl_sysErrorItemHTML.htm');

    function Admctrl_sysErrorController(id) {
        this.id = id || 'admctrl_sysError';
        this.direction = -1;
    }

    Admctrl_sysErrorController.prototype = {
        getHTML: function () {
            return sysErrorHTML.replace(/\#id/ig, this.id);
        },

        refresh__: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            var svgW = parseFloat(this.svg.attr("width")),
                svgH = parseFloat(this.svg.attr("height")),
                ctrlId = this.id;
            var g = node.enter()
                .selectAppend("g", "node")
                .merge(node)
                .attr("class", "node")
                .attr("transform", function (d, idx) {
                    var xgap = svgW / 4, ygap = svgH / 4,
                        xcnt = idx % 4, ycnt = Math.floor(idx / 4);
                    return "translate({0},{1})".substitute(xcnt * xgap, ycnt * ygap);
                });

            g.selectAll("*").remove();

            g.append("image")
                .classed("bgPanel", true)
                .attr("xlink:href", function(d) {
                    return "/webdash/img/PanelSvg/{0}.svg".substitute(d.evtLevel>0? "SysBlkPnlErr" : "SysBlkPnl");
                })
                .attr("width", 128)
                .attr("height", 122);

            // 지역명
            g.append("text")
                .attr("x", 0)
                .attr("y", 92.5752)
                .attr("dy", 0)
                // .attr("transform", "matrix(1 0 0 1 32.1509 92.5752)")
                .style("fill", "#FFFFFF")
                .style("font-size", "17pt")
                .text(function(d) { return d.name; })
                .call(this.wrap, 1);
        },

        refresh: function(model) {
            var data = model.getData();

            if(this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            this.svg.selectAll("g.node").remove();

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            var svgW = parseFloat(this.svg.attr("width")),
                svgH = parseFloat(this.svg.attr("height"));
            node.enter()
                .appendSVG(sysErrorItemHTML)
                .attr("transform", function (d, idx) {
                    var xgap = svgW / 4, ygap = svgH / 5,
                        xcnt = idx % 4, ycnt = Math.floor(idx / 4);
                    if(d.id < 17) { //16개 먼저표시.
                        return  "translate({0},{1})".substitute(xcnt * xgap, ycnt * ygap);
                    }else{
                        var xgap =svgW / 5, ygap = svgH / 5,
                            xcnt = idx % 4, ycnt = Math.floor(idx / 4);
                        if(d.id == 21){ //마지막 데이터.
                            xcnt = 4;
                            ycnt = 4;
                        }
                        return  "translate({0},{1})".substitute(xcnt * xgap, ycnt * ygap);
                    }
                });
            var g = this.svg.selectAll("g.node");
            // 지역명
            g.select("text[data-key=sysName]").text(function(d) { return d.name; });
            // 장애표시
            g.select("g[data-key=KMgrCircleError]")
                .attr("display", function(d) {return d.evt > 0? 'display' : 'none'; });
            g.select("g[data-key=SvrError]")
                .attr("display", function(d) { return d.evt > 0? 'display' : 'none'; });
            // .call(this.wrap, 1);

            hmDashConf.animation.playDisplayAnaimation(this.svg.selectAll("g[data-key=KMgrCircleError]"),d3);

            /**
             * animation test source
             * 지우지 마세요!
             **/
            // hmDashConf.animation.lightCircleTransition(this.svg, this.svg.selectAll("g.lightCircle"));
            // hmDashConf.animation.lightRectTransition(this.svg.selectAll("g[data-key=CircleLight]"));
        },

        wrap: function(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
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
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineNumber++ * lineHeight + dy + "em").attr("dx", 64)
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
        },

    };

    return Admctrl_sysErrorController;
});
