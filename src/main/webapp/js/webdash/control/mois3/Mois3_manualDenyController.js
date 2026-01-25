//  @파일설명 : 지방자치단체 사이버위협 대응 현황 > 수동차단
//

define(function (require) {
    var d3 = require('d3'),
        manualDenyHTML = require('text!./mois3_manualDenyHTML.jsp');

    function Mois3_manualDenyController(id) {
        this.id = id || 'mois3_manualDeny';
    }

    Mois3_manualDenyController.prototype = {
        getHTML: function () {
            return manualDenyHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            this.svg.select("text#{0}_cnt1".substitute(this.id)).text(HmUtil.commaNum(data.cnt1));
            this.svg.select("text#{0}_cnt2".substitute(this.id)).text(HmUtil.commaNum(data.cnt2));
            this.svg.select("text#{0}_cnt3".substitute(this.id)).text(HmUtil.commaNum(data.cnt3));
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
                .attr("height", svgH)
        }
    };

    return Mois3_manualDenyController;
});
