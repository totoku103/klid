//  @파일설명 : 운영자용 관제실 > 침해카운트
//

define(function (require) {
    var d3 = require('d3'),
        evtCntHTML = require('text!./Admctrl_evtCntHTML.jsp');

    function Admctrl_evtCntController(id) {
        this.id = id || 'admctrl_evtCnt';
    }

    Admctrl_evtCntController.prototype = {
        getHTML: function () {
            return evtCntHTML.replace(/\#id/ig, this.id);
        },

        refreshInciType: function (model) {
            var data = model.getInciData();
            var $table = $('#{0}_inciType'.substitute(this.id));
            $table.find("tr").remove();
            var $frag = $(document.createDocumentFragment());
            var totalCnt = 0;

            // console.log(data);

            $.each(data, function(idx, item) {
                totalCnt += item.evtCnt;
                var tr = $('<tr></tr>')
                            .append($('<td></td>', {class: 'TblTit', style: 'letter-spacing: -4px;'}).text(item.name || ''))
                            .append($('<td></td>', {class: 'ThrNum'}).text(HmUtil.commaNum(item.evtCnt)));
                $frag.append(tr);
            });
            if(data.length) $table.append($frag);
            else $table.append($('<tr></tr>')); // 접수데이터가 옆으로 밀리는 현상때문에 추가
            $('#{0}_inciCnt'.substitute(this.id)).text(HmUtil.commaNum(totalCnt));
        },

        refreshTbzledge: function (model) {
            var data = model.getTbzledgeData();
            var $table = $('#{0}_tbzledge'.substitute(this.id));
            $table.find("tr").not(':first').remove();
            var $frag = $(document.createDocumentFragment());
            $.each(data, function(idx, item) {
                var tr = $('<tr></tr>')
                    .append($('<td></td>').text(item.type))
                    .append($('<td></td>').text(HmUtil.commaNum(item.totalCnt)))
                    .append($('<td></td>').text(HmUtil.commaNum(item.completeCnt)))
                    .append($('<td></td>').text(HmUtil.commaNum(item.processCnt)));
                $frag.append(tr);
            });
            if(data.length) $table.append($frag);
            $('#{0}_tbzledgeCnt'.substitute(this.id)).text(HmUtil.commaNum(data[0].totalCnt));
        }

    };

    return Admctrl_evtCntController;
});
