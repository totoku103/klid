//  @파일설명 : 사이버침해대응지원센터 > 보안자료실
//

define(function (require) {

    function Local_securityBoardController(id) {
        this.id = id || 'local_securityBoard';
    }

    Local_securityBoardController.prototype = {
        getHTML: function () {

        },

        refresh: function (model, $ul) {
            var data = model.getData();
            $ul.find("li").remove();
            var $frag = $(document.createDocumentFragment());
            $.each(data, function(idx, item) {
                var li = $('<li></li>')
                            .append($('<span></span>').text((idx+1) + ". " + item.title))
                            .append($('<strong></strong>').text(item.ymd));
                $frag.append(li);
            });
            if(data.length) $ul.append($frag);
        }

    };

    return Local_securityBoardController;
});
