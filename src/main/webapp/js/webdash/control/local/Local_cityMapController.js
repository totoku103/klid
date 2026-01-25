//  @파일설명 : 사이버침해대응지원센터 > 지도
//

define(function (require) {
    var d3 = require('d3'),
        cityMapHTML = require('text!./local_cityMapHTML.jsp'),
        cityItemHTML = require('text!./Local_cityMapIconHTML.htm');

    function Local_cityMapController(id) {
        this.id = id || 'local_cityMap';
    }

    Local_cityMapController.prototype = {
        getHTML: function () {
            return cityMapHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model, localCd) {
            var data = model.getData(localCd);
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            node.enter()
                .appendSVG(cityItemHTML)
                .attr("transform", function (d, idx) {
                    return "translate({0},{1})".substitute(d.x, d.y);
                });

            //도시명
            node = this.svg.selectAll("g.node");
            node.select("text[data-key=cityName]")
                .text(function (d) {
                    return d.name;
                })
                .classed('cityName', true);

            node.select("g[data-key=evtGroup1]").attr("fill", function(d) { return d.evt1 > 0? '#FF0000' : '#80EB46'});
            node.select("g[data-key=evtGroup2]").attr("fill", function(d) { return d.evt2 > 0? '#FF0000' : '#80EB46'});

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
                svgH = parseFloat(svg.attr("height")) * scaleY
            svg
                .attr("width", svgW)
                .attr("height", svgH);
        },

        setCityMap: function(localCd) {
            var imgNm = null, posY = 0;
            switch(localCd) {
                case 10: imgNm = 'Seoul'; posY = 80; break;
                case 20: imgNm = 'Busan'; posY = 80; break;
                case 30: imgNm = 'Daegu'; posY = 69; break;
                case 40: imgNm = 'Incheon'; posY = 10; break;
                case 50: imgNm = 'Gwangju'; posY = 218; break;
                case 60: imgNm = 'Daejeon'; posY = 141; break;
                case 70: imgNm = 'Ulsan'; posY = 155; break;
                case 80: imgNm = 'Gyeonggi'; posY = 30; break;
                case 90: imgNm = 'Gangwon'; posY = 107; break;
                case 100: imgNm = 'Chungbuk'; posY = 103; break;
                case 110: imgNm = 'Chungnam'; posY = 152; break;
                case 120: imgNm = 'Jeonbuk'; posY = 219; break;
                case 130: imgNm = 'Jeonnam'; posY = 80; break;
                case 140: imgNm = 'Gyeongbuk'; posY = 36; break;
                case 150: imgNm = 'Gyeongnam'; posY = 117; break;
                case 160: imgNm = 'Jeju'; posY = 232; break;
                case 170: imgNm = 'Sejong'; posY = 38; break;
                default:
                    return;
            }
            this.getSvg()
                .style("background", 'url("/img/webdash/SvgMap/{0}.svg") no-repeat'.substitute(imgNm))
                .style("background-position-y", posY + 'px');
        }
    };

    return Local_cityMapController;
});
