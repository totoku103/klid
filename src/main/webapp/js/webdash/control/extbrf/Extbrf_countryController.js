//  @파일설명 : 사이버침해대응지원센터 대외용(브리핑) > 국가별 공격현황
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        d3selection = require('d3selection'),
        countryHTML = require('text!./Extbrf_countryHTML.jsp');

    function Extbrf_countryController(id) {
        this.id = id || 'extbrf_country';
    }

    Extbrf_countryController.prototype = {
        getHTML: function () {
            return countryHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model, dbData) {
            var data = model.getData();

            if (this.svg == null) {
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));
            }
            //refresh 되자 않아 처리.
            this.svg.selectAll("circle.node").remove();

            var node = this.svg.selectAll("circle.node").data(data);
            node.exit().remove();

            node.enter()
                .selectAppend("circle", "node")
                .classed("node", true)
                .sort(function(a, b){
                    $.each(dbData, function (index, data) {
                        if(a.countryCd  == data.nationCd){
                            a.sort = 2
                        }
                        if(b.countryCd  == data.nationCd){
                            b.sort = 2
                        }
                    })
                    return a.sort - b.sort
                })
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", function(d, idx) {
                    var attTop5Yn = 'N';
                    $.each(dbData, function (index, data) {
                        if(d.countryCd  == data.nationCd){
                            attTop5Yn = 'Y';
                        }
                    })
                    if(attTop5Yn == 'Y'){
                        return 39 + (50 - (idx%5 * 15));
                    }else{
                        return 15
                    }
                })
                .attr("fill", function(d, idx) { //채우기 색
                    var attTop5Yn = 'N';
                    $.each(dbData, function (index, data) {
                        //console.log(d.countryCd+"  :: "+data.nationCd)
                        if(d.countryCd  == data.nationCd){
                            attTop5Yn = 'Y';
                        }
                    })
                    if(attTop5Yn == 'Y'){
                        return 'rgba(255,0,0,0.5)'
                    }else{
                        return 'rgba(29,255,93,0.5)'
                    }
                })
                .attr("stroke", function(d, idx) { //테두리
                    var attTop5Yn = 'N';
                    $.each(dbData, function (index, data) {
                        if(d.countryCd  == data.nationCd){
                            attTop5Yn = 'Y';
                        }
                    })
                    if(attTop5Yn == 'Y'){
                        return 'rgba(255,0,0,0.9)'
                    }else{
                        return 'rgba(29,255,93,0.9)'
                    }
                })
                .attr("stroke-width", 2)
                .attr("data-key", function(d, idx) {
                    var attTop5Yn = 'N';
                    $.each(dbData, function (index, data) {
                        if(d.countryCd  == data.nationCd){
                            attTop5Yn = 'Y';
                        }
                    })
                    if(attTop5Yn == 'Y'){
                        return "attTopY";
                    }
                });

            var g = this.svg.selectAll("circle[data-key=attTopY]");

            hmDashConf.animation.playCircleAnimation(g,d3);
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

    return Extbrf_countryController;
});
