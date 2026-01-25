//  @파일설명 : 사이버 위기경보 > 등급변경정보
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        cyberUpdInfoHTML = require('text!./mois1_cyberUpdInfoHTML.jsp');

    function Mois1_cyberUpdInfoController(id) {
        this.id = id || 'mois1_cyberUpdInfo';
    }

    Mois1_cyberUpdInfoController.prototype = {
        getHTML: function () {
            return cyberUpdInfoHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            if(data.date == ""){//데이터 없을경우.
                this.svg.style("display", "none");
            }else if(data.date != ""){//데이터 있을경우.
                this.svg.style("display", "");
            }

            // 변경날짜
            this.svg.select("#{0}_date".substitute(this.id))
                .text(data.date);

            // 변경 전 등급
            this.svg.select("#{0}_before".substitute(this.id))
                .text(hmDashConf.getCyberAlertText(data.beforeLvl))
                .style("fill", hmDashConf.getCyberAlertColor(data.beforeLvl));

            // 변경 후 등급
            this.svg.select("#{0}_after".substitute(this.id))
                .text(hmDashConf.getCyberAlertText(data.afterLvl))
                .style("fill", hmDashConf.getCyberAlertColor(data.afterLvl));

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

    return Mois1_cyberUpdInfoController;
});
