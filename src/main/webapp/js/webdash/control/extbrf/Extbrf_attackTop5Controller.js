//  @파일설명 : 사이버침해대응지원센터 대외용(브리핑) > 국가별 공격현황
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        d3selection = require('d3selection'),
        countryHTML = require('text!./Extbrf_attackTop5HTML.jsp');

    function Extbrf_attackTop5Controller(id) {
        this.id = id || 'extbrf_attackTop5';
    }

    Extbrf_attackTop5Controller.prototype = {
        getHTML: function () {
            return countryHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();

            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            if(data.length > 0){
                $.each(data, function (index, data) {
                    $("#nationNm_"+index).text(data.nationNm);
                    $("#attCnt_"+index).text(HmUtil.commaNum(data.attCnt));
                })
            }

            /*$('.gridData g').each(function(idx) {
                console.log(this)

            })*/
            //this.svg.select("#{0}_after".substitute(this.id))
           ;
            //var node = this.svg.selectAll("g.node").data(data);
            //node.exit().remove();


            /*node.enter()
                .selectAppend("circle", "node")
                .classed("node", true)
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", function(d, idx) {return idx>= 30? 39 + (50 - (idx%5 * 15)) : 15; })
                .attr("fill", function(d, idx) {
                    console.log(d)
                    return idx >= 30? 'rgba(255,0,0,0.5)' : 'rgba(29,255,93,0.5)'; })
                .attr("stroke", function(d, idx) {

                    return idx >= 30? 'rgba(255,0,0,0.9)' : 'rgba(29,255,93,0.9)'; })
                .attr("stroke-width", 2);*/

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
        }
    };

    return Extbrf_attackTop5Controller;
});
