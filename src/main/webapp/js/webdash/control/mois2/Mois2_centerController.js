//  @파일설명 : 홈페이지 위변조 및 모니터링 현황 > 중앙행정기관
//

define(function (require) {
    var d3 = require('d3'),
        centerHTML = require('text!./mois2_centerHTML.jsp'),
        centerItemHTML = require('text!./Mois2_centerIconHTML.htm');

    function Mois2_centerController(id) {
        this.id = id || 'mois2_center';
    }

    Mois2_centerController.prototype = {
        getHTML: function () {
            return centerHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            node.enter()
                .appendSVG(centerItemHTML)
                .attr("transform", function (d, idx) {
                    var xcnt = idx % 4, ycnt = Math.floor(idx / 4);
                    var divW = 808 / 4, divGap = 13;
                    var posX = xcnt * (808 / 4) + (xcnt != 0 ? divGap * xcnt : 0), posY = ycnt * 85 + (ycnt * 40);
                    return "translate({0},{1})".substitute(posX, posY);
                });

            //행정기관명
            node = this.svg.selectAll("g.node");
            node.select("text[data-key=centerName]")
                .style("font-size", function (d) {
                    return d.name.length >= 9 ? '10pt' : '14pt'
                })
                .text(function (d) {
                    return d.name;
                })
                .classed('panelBoxTitle', true);

            //모니터링 표시
            // 장애색상 표시 (정상: #80eb45, 장애:#FFFF22, 없음:#a6a6a6)*/
            node.select("g[data-key=centerState]").attr("fill", function(d) { return d.evtLevel > 1 ? '#FFFF22': d.evtLevel2 == "" ? '#a6a6a6':'#80eb45';  });

        }
    };

    return Mois2_centerController;
});
