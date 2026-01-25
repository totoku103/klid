//  @파일설명 : 지방자치단체 사이버위협 대응 현황 > 자동차단
//

define(function (require) {
    var d3 = require('d3'),
        autoDenyHTML = require('text!./mois3_autoDenyHTML.jsp');

    function Mois3_autoDenyController(id) {
        this.id = id || 'mois3_autoDeny';
    }

    Mois3_autoDenyController.prototype = {
        getHTML: function () {
            return autoDenyHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            this.svg.select("g.commaGrp").style("display", data > 1000 ? "block" : "none"); //콤마 show/hide
            var g = this.svg.select("g#{0}_txt".substitute(this.id)).selectAll("text").text('');
            if(data>100000){
                d3.select(g.nodes()[0]).text(data.toString().substr(0,1));
                d3.select(g.nodes()[1]).text(data.toString().substr(1,1));
                d3.select(g.nodes()[2]).text(data.toString().substr(2,1));
                d3.select(g.nodes()[3]).text(data.toString().substr(3,1));
                d3.select(g.nodes()[4]).text(data.toString().substr(4,1));
                d3.select(g.nodes()[5]).text(data.toString().substr(5,1));
                d3.select(g.nodes()[6]).text(data.toString().substr(6,1));
                return;
            }else if(data>10000){
                d3.select(g.nodes()[1]).text(data.toString().substr(0,1));
                d3.select(g.nodes()[2]).text(data.toString().substr(1,1));
                d3.select(g.nodes()[3]).text(data.toString().substr(2,1));
                d3.select(g.nodes()[4]).text(data.toString().substr(3,1));
                d3.select(g.nodes()[5]).text(data.toString().substr(4,1));
                return;
            }else if(data>1000){
                d3.select(g.nodes()[2]).text(data.toString().substr(0,1));
                d3.select(g.nodes()[3]).text(data.toString().substr(1,1));
                d3.select(g.nodes()[4]).text(data.toString().substr(2,1));
                d3.select(g.nodes()[5]).text(data.toString().substr(3,1));
                return;
            }else if(data>100){
                d3.select(g.nodes()[3]).text(data.toString().substr(0,1));
                d3.select(g.nodes()[4]).text(data.toString().substr(1,1));
                d3.select(g.nodes()[5]).text(data.toString().substr(2,1));
                return;
            }else if(data>10){
                d3.select(g.nodes()[4]).text(data.toString().substr(0,1));
                d3.select(g.nodes()[5]).text(data.toString().substr(1,1));
                return;
            }else if(data>1){
                d3.select(g.nodes()[5]).text(data.toString().substr(0,1));
                return;
            }
        }
    };

    return Mois3_autoDenyController;
});
