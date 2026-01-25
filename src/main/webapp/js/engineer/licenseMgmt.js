

var Main = {
        initVariable: function () {

        },

        observe: function () {

        },

        eventControl: function (event) {
            var curTarget = event.currentTarget;
            switch (curTarget.id) {

            }
        },

        initDesign: function () {
            $('#splitter').jqxSplitter({ width: '99.8%', height: '99.8%', orientation: 'vertical', resizable: false, splitBarSize: 0.5, theme: jqxTheme, panels: [{ size: '50%', collapsible: false }, { size: '100%' }] });
        },

        initData: function () {
            Main.search();
        },

        search: function () {
            Server.post("/api/engineer/licenseMgmt/getSvrLicense", {
                data: {}, success: function (result) {
                     $('#txtSvrLicenseKey').val(result.smsAgentCount);
                }
            });
        }
};

$(function () {
   Main.initVariable();
   Main.observe();
   Main.initDesign();
   Main.initData();
});