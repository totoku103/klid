//  @파일설명 : 사이버침해대응지원센터 운영자용(관제실) > 수동차단
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        manualDenyHTML = require('text!./brfext_manualDenyHTML.jsp');

    function Brfext_manualDenyController(id) {
        this.id = id || 'brfext_manualDeny';
    }

    Brfext_manualDenyController.prototype = {
        getHTML: function () {
            return manualDenyHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            this.svg.select("text#{0}_cnt1".substitute(this.id)).text(data.cnt1);
            this.svg.select("text#{0}_cnt2".substitute(this.id)).text(data.cnt2);
            this.svg.select("text#{0}_cnt3".substitute(this.id)).text(data.cnt3);
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

    return Brfext_manualDenyController;
});
