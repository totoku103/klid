//  @파일설명 : 사이버 위기경보 > Gauge
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        cyberAlertHTML = require('text!./mois1_cyberAlertHTML.jsp');

    function Mois1_cyberAlertController(id) {
        this.id = id || 'mois1_cyberAlert';
    }

    Mois1_cyberAlertController.prototype = {
        getHTML: function () {
            return cyberAlertHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            this.cyberLvl = model.getData();

            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            // 전체 off
            this.svg.selectAll("g.stepOn").style('display', 'none').classed("stepEnabled", false);
            // 활성화
            var stepOnGroup = d3.select(this.svg.selectAll("g.stepOn").nodes()[this.cyberLvl - 1])
                .style("display", "block")
                .classed("stepEnabled", true);
            var lvlColor = hmDashConf.getCyberAlertColor(this.cyberLvl);
            var lvlText = stepOnGroup.select("text").text();

            // 중앙 등급 표시
            d3.select("text#{0}_lvl".substitute(this.id))
                .text(this.cyberLvl)
                .style("fill", lvlColor);
            d3.select("text#{0}_lvlText".substitute(this.id))
                .text(lvlText)
                .style("fill", lvlColor);

            // 애니메이션
            this.playAnaimation();
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
                svgH = parseFloat(svg.attr("height")) * scaleY
            svg
                .attr("width", svgW)
                .attr("height", svgH);
//                .attr("transform", "translate({0}, {1})".substitute(svgW / 2, svgH / 2));
            // this.svg.select("g#mois1_cyberAlert_g").attr("transform", "scale({0},{1})".substitute(scaleX, scaleY));
        },

        playAnaimation: function () {
            this.stopAnimation();

            // animation target
            var g = this.svg.select("g.stepEnabled"),
                path = g.select("g:nth-child(1)").select("path"),
                text = g.select("text"),
                lvlColor = hmDashConf.getCyberAlertColor(this.cyberLvl),
                baseColor = "#ffffff",
                duration = 100;

            path.transition()
                .duration(duration)
                .style("fill", baseColor)
                .transition()
                .duration(duration)
                .style("fill", lvlColor)
                .on("end", function repeat() {
                    d3.active(this)
                        .transition()
                        .duration(duration)
                        .style("fill", baseColor)
                        .delay(1000)
                        .transition()
                        .duration(duration)
                        .style("fill", lvlColor)
                        .delay(1000)
                        .on("end", repeat);
                });
            text.transition()
                .duration(duration)
                .style("fill", lvlColor)
                .transition()
                .duration(duration)
                .style("fill", "#ffffff")
                .on("end", function repeat() {
                    d3.active(this)
                        .transition()
                        .duration(duration)
                        .style("fill", lvlColor)
                        .delay(1000)
                        .transition()
                        .duration(duration)
                        .style("fill", "#ffffff")
                        .delay(1000)
                        .on("end", repeat);
                });
        },

        stopAnimation: function () {
            var path = this.svg.selectAll("g.stepOn").selectAll("g:nth-child(1)").select("path");
            var text = this.svg.selectAll("g.stepOn").selectAll("text");
            path.on("end", null);
            text.on("end", null);
        }
    };

    return Mois1_cyberAlertController;
});
