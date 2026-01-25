//  @파일설명 : 사이버침해대응지원센터 운영자용(관제실) > Map
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        mapHTML = require('text!./Admctrl_mapHTML.jsp'),
        mapItemHTML = require('text!./admctrl_mapItemHTML.htm');

    function Admctrl_mapController(id) {
        this.id = id || 'admctrl_map';
    }

    Admctrl_mapController.prototype = {
        getHTML: function () {
            return mapHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model) {
            var data = model.getData();
            if (this.svg == null)
                this.svg = d3.select("svg#{0}_svg".substitute(this.id));

            var node = this.svg.selectAll("g.node").data(data);
            node.exit().remove();

            node.enter()
                .appendSVG(mapItemHTML)
                .attr("transform", function (d, idx) {
                    //console.log(d);
                    return "translate({0},{1})".substitute(d.x, d.y);
                });

            node = this.svg.selectAll("g.node");
            node.select("text[data-key=countryNm]").text(function(d) { return d.name; });
            node.select("g[data-key=forgeryState]").attr("fill", function(d) { return d.forgeryEvt > 0? "#FF5943" : "#80EB46"; });
            node.select("g[data-key=healthCheckState]").attr("fill", function(d) { return d.hcEvt > 0? "#FF5943" : "#80EB46"; });
        },

        wrap: function(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.2, // ems
                    y = text.attr("y"),
                    dx = parseFloat(text.attr("dx")),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                if(words.length == 1) {
                    lineNumber = 1;
                    lineHeight = 0.5;
                }
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                   // console.log(tspan.node().getComputedTextLength());
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineNumber++ * lineHeight + dy + "em").attr("dx", dx)
                            .attr("text-anchor", "middle").text(word);
                        // tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineNumber++ * lineHeight + dy + "em").attr("dx", 30).text(word);
                    }
                }
            });
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

    return Admctrl_mapController;
});
