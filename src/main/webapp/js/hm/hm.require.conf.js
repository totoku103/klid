// requirejs 공통 설정

requirejs.config({
    baseUrl: '/js',
    paths: {
        jquery: '../lib/jquery/jquery-1.12.4.min',
         'd3': '/webjars/d3js/5.5.0/d3',
        //'d3': '../lib/d3/d3.v4.min',
         'hmDashConf' : 'hm/hm.dash.conf',
        'd3selection' : 'hm/hm.d3',
        //'text': '../lib/require/text',
        'text' : '/webjars/requirejs-text/2.0.15/text',
        'DateFormat': '../lib/jquery/jquery-dateFormat',
        'marquee': '../lib/jquery/jquery.marquee.min'
    },
    shim: {
        'd3selection' : {
            deps: ['d3'],
            exports: 'd3.selection'
        }
    }
});


require(['d3selection']);