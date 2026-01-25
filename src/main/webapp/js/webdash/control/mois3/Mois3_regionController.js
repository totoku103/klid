//  @파일설명 : 지방자치단체 사이버위협 대응 현황 > 지방자치단체
//

define(function (require) {
    var d3 = require('d3'),
        regionHTML = require('text!./mois3_regionHTML.jsp');

    function Mois3_regionController(id) {
        this.id = id || 'mois3_region';
    }

    Mois3_regionController.prototype = {
        getHTML: function () {
            return regionHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            var g = node.enter()
                .append("g")
                .merge(node)
                .attr("class", "node")
                .attr("transform", function (d, idx) {
                    return "translate({0},{1})".substitute(d.x, d.y);
                });


            g.append("image")
                .attr("xlink:href", "/img/webdash/manualBox.svg")
                .attr("width", 152)
                .attr("height", 88);

            // CI
            g.append("image")
                .attr("xlink:href", function (d) {
                    return "/img/webdash/ci/{0}.svg".substitute(d.imgName);
                })
                .attr("width", 40.5)
                .attr("height", 38)
                .attr("x", 22)
                .attr("y", 5.75);

            // 지역명
            g.append("text")
                .attr("transform", "matrix(1 0 0 1 62.3398 34.1172)")
                .style("fill", "#303030")
                .style("font-family", "맑은 고딕")
                .style("font-size", "22pt")
                .style("font-weight", "bold")
                .text(function (d) {
                    return d.name;
                });
            var cntGrp = g.append("g")
                .classed("cntGrp", true);

            //숫자
            cntGrp
                .append("text").attr("transform", 'matrix(1 0 0 1 10.7676 76.1172)')
                .style("fill", '#A9DDD6')
                .attr("x", 17)
                .attr("dy", 0)
                .attr("class", "cntText")
                .text(function (d, idx) {
                    return d.cnt1;
                });
            cntGrp
                .append("text")
                .attr("transform", 'matrix(1 0 0 1 58.7676 76.1172)')
                .style("fill", '#6CD8D0')
                .attr("class", "cntText")
                .attr("x", 17)
                .attr("dy", 0)
                .text(function (d, idx) {
                    return d.cnt2;
                });
            cntGrp
                .append("text")
                .attr("transform", 'matrix(1 0 0 1 108.0176 76.1172)')
                .style("fill", '#15F9CC')
                .attr("x", 17)
                .attr("dy", 0)
                .attr("class", "cntText")
                .text(function (d, idx) {
                    return d.cnt3;
                });
        }
    };

    return Mois3_regionController;
});
