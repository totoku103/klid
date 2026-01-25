//  @파일설명 : 사이버침해대응지원센터 > 기관별 상세현황
//

define(function (require) {
    var d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        cityMapHTML = require('text!./local_cityMapHTML.jsp');

    function Local_cityMapController(id) {
        this.id = id || 'local_cityMap';
    }

    Local_cityMapController.prototype = {
        getHTML: function () {
            return cityMapHTML.replace(/\#id/ig, this.id);
        },

        refresh: function (model, $table) {
            var data = model.getData();
            $table.find("tr").not(':first').remove();

            var $frag = $(document.createDocumentFragment());
            var indexCnt = data.length;

            var totalCntSum = 0;
            var procCntSum = 0;
            var compCntSum = 0;
            var sumPer = 0;

            $.each(data, function(idx, item) {
                var tr = $('<tr></tr>')
                            .append($('<td></td>', {title: item.name}).text(item.name))
                            .append($('<td></td>').text(HmUtil.commaNum(item.totalCnt)))
                            .append($('<td></td>').text(HmUtil.commaNum(item.procCnt)))
                            .append($('<td></td>').text(HmUtil.commaNum(item.compCnt)))
                            .append($('<td></td>', {class: 'statusBar'})
                                .append($('<div></div>', {class: 'p_bar'})
                                    .append($('<div></div>', {class: 'nullBg'})
                                        .append($('<div></div>', {class: 'fillBar', style: 'width: {0}%'.substitute(item.procRate)}))))
                                .append($('<span></span>', {class: 'p_txt'}).text(item.procRate + '%')));


                totalCntSum = totalCntSum +  Number(item.totalCnt);
                procCntSum = procCntSum +  Number(item.procCnt);
                compCntSum = compCntSum +  Number(item.compCnt);
                if (compCntSum ==0 ) {
                    sumPer = 0;
                } else {
                    sumPer = parseInt((Number(compCntSum) /  Number(totalCntSum) ) *100) ;
                }
                    /*if(idx === (indexCnt - 1) * 1){
                        tr = $('<tr></tr>')
                    .append($('<td></td>', {title: '합계'}).text('합계'))
                            .append($('<td></td>', {id: 'test'}).text(HmUtil.commaNum(totalCntSum)))
                            .append($('<td></td>').text(HmUtil.commaNum(procCntSum)))
                            .append($('<td></td>').text(HmUtil.commaNum(compCntSum)))
                            .append($('<td></td>', {class: 'statusBar'})
                                .append($('<div></div>', {class: 'p_bar'})
                                    .append($('<div></div>', {class: 'nullBg'})
                                        .append($('<div></div>', {class: 'fillBar', style: 'width: {0}%'.substitute(sumPer)}))))
                                .append($('<span></span>', {class: 'p_txt'}).text(sumPer + '%')));
                    }//if*/

                $frag.append(tr);

            });

            var tr = $('<tr></tr>')
                .append($('<td></td>', {title: '합계'}).text('합계'))
                .append($('<td></td>', {id: 'test'}).text(HmUtil.commaNum(totalCntSum)))
                .append($('<td></td>').text(HmUtil.commaNum(procCntSum)))
                .append($('<td></td>').text(HmUtil.commaNum(compCntSum)))
                .append($('<td></td>', {class: 'statusBar'})
                    .append($('<div></div>', {class: 'p_bar'})
                        .append($('<div></div>', {class: 'nullBg'})
                            .append($('<div></div>', {class: 'fillBar', style: 'width: {0}%'.substitute(sumPer)}))))
                    .append($('<span></span>', {class: 'p_txt'}).text(sumPer + '%')));
            $frag.append(tr);

            if(data.length) $table.append($frag);
        }

    };

    return Local_cityMapController;
});
