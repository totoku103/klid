//  @파일설명 : 홈페이지 위변조 및 모니터링 현황 > 중앙행정기관
//

define(function (require) {
    var d3 = require('d3'),
        regionHTML = require('text!./mois2_regionHTML.jsp'),
        sysErrorItemHTML = require('text!./Mois2_regionIconHTML.htm');

    function Mois2_regionController(id) {
        this.id = id || 'mois2_region';
    }

    Mois2_regionController.prototype = {
        getHTML: function () {
            return regionHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));
            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            node.enter()
                .appendSVG(sysErrorItemHTML)
                .attr("transform", function (d, idx) {
                    return "translate({0},{1})".substitute(d.x, d.y);
                });

            node = this.svg.selectAll("g.node");
            //위변조 표시.   // 장애색상 표시 (정상: #4795EA, 장애:#FF3329, 없음:#a6a6a6)*/
            node.select("g[data-key=forgeryState]").attr("fill", function(d) { return d.evtLevel2 > 1 ? '#FF3329': d.evtLevel2 == "" ? '#a6a6a6':'#4795EA';  });
            //모니터링 표시.   // 장애색상 표시 (정상: #80EB45, 장애:#FFFF21, 없음:#a6a6a6)
            node.select("g[data-key=healthCheckState]").attr("fill", function(d) { return d.evtLevel > 1 ? '#FFFF21': d.evtLevel == "" ? '#a6a6a6':'#80EB45'; });

            // CI
            node.append("image")
                .attr("xlink:href", function (d) {
                    return "/img/webdash/ci/{0}.svg".substitute(d.imgName);
                })
                .attr("width", 32.5)
                .attr("height", 28)
                .attr("x", 12)
                .attr("y", 13.75);

            // 지역명
            node.append("text")
                .attr("transform", "matrix(1 0 0 1 42.8398 36.9121)")
                .style("fill", "#303030")
                .style("font-family", "맑은 고딕")
                .style("font-size", "17pt")
                .style("font-weight", "bold")
                .text(function (d) {
                    return d.name;
                });
        }
    };

    return Mois2_regionController;
});
