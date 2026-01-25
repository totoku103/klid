//  @파일설명 : 사이버침해대응지원센터 대외용(브리핑용) > 수동차단
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        manualDenyHTML = require('text!./Extbrf_manualDenyHTML.jsp');

    function Extbrf_manualDenyController(id) {
        this.id = id || 'extbrf_manualDeny';
    }

    Extbrf_manualDenyController.prototype = {
        getHTML: function () {
            return manualDenyHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            this.svg.select("text#{0}__cnt1".substitute(this.id)).text(HmUtil.commaNum(data.receiptCnt));
            this.svg.select("text#{0}__cnt2".substitute(this.id)).text(HmUtil.commaNum(data.processCnt));
            this.svg.select("text#{0}__cnt3".substitute(this.id)).text(HmUtil.commaNum(data.completeCnt));
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
                    return "translate({0},{1})".substitute(i * 50, 0); //circle 위치조절
                });
            svg.selectAll("g#{0}_LineBG".substitute(this.id)).attr("transform", "scale(1.2, 1)"); //background line 크기
            svg.selectAll("g#{0}_arrow".substitute(this.id)).attr("transform", "scale(1.2, 1)"); //arrow 크기
        }
    };

    return Extbrf_manualDenyController;
});
