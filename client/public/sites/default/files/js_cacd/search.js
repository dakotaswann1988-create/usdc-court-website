var _url = "apps.cacd.uscourts.gov/cm-api/v3/attorneys";

if(location.protocol == "https:" ){
    _url = "https://" + _url;
}else{
    _url = "http://" + _url;
}

//console.log(_url);

Vue.filter('toDateFormat', function (value) {
    if (!value) return;
    value = value.toString();
    var date = new Date(value);

    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

});

Vue.filter('toDateTimeFormat', function (value) {
    if (!value) return;
    value = value.toString();
    var date = new Date(value);
    var _month = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)));
    var _date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
    var _hours = ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()));
    var _ampm = _hours >= 12 ? 'PM' : 'AM';
    _hours = _hours % 12;
    _hours = _hours ? _hours : 12; // 0 hour will be converted to 12
    var _minutes = ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));
    var _seconds = ((date.getSeconds() > 9) ? date.getSeconds() : ('0' + date.getSeconds()));

    return _month + '/' + _date + '/' + date.getFullYear() + '  ' + _hours + ':' + _minutes + ':' + _seconds + ' ' + _ampm;

});

Vue.filter('toCurrencyFormat', function (value) {
    var val = (value / 1).toFixed(2);
    return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

var appAttySearch = new Vue({
    el: "#appAttySearch",
    mounted: function (){
        //this.getlist();
    },
    data: {
        title: '',
        perpage: 20,
        currentpage: 0,
        lastname: null,
        firstname: null,
        bar: null,
        total: null,
        list: null,
        loading: null,
        ispagerclicked: null,
        pager: {
            first: 0,
            current: null,
            previous: null,
            next: null,
            last: null,
            pageblockstart: null,
            pageblockend: null,
        },
    },
    methods: {
        gt: function(s, t){
            return s > t;
        },
        gte: function(s, t){
            return s >= t;
        },
        lt: function(s, t){
            return s < t;
        },
        lte: function(s, t){
            return s <= t;
        },
        eq: function(s, t){
            return s == t;
        },
        clear: function(){
            this.firstname = null;
            this.lastname = null;
            this.bar = null;
            this.list = null;
            this.loading = false;
            this.ispagerclicked = null;
            this.currentpage = 0;
            this.perpage = 20;
        },
        search: function() {
            this.list = null;
            this.currentpage = 0;
            this.perpage = 20;
            this.getlist();
        },
        isBarEmpty: function() {
            return this.bar ? (this.bar.trim() == "" ? true : false) : true;
        },
        getlist: function (e) {

            var parenthis = this;

            parenthis.loading = true;

            var isbar = this.bar ? (this.bar.trim() == "" ? false: true) : false;
            
            if(!this.bar && !this.lastname && !this.firstname){
                this.list = null;
                parenthis.loading = false;
                parenthis.ispagerclicked = null;
                return;
            }
            
            var _s_url = _url 
                + "?perpage=" + parenthis.perpage  // perpage
                + "&currentpage=" + parenthis.currentpage // currentpage
                + (isbar ? "&bar=" + parenthis.bar : '') // bar
                + (isbar ? '' : (parenthis.lastname == null ? '' : "&lastname=" + parenthis.lastname)) // lastname
                + (isbar ? '' : (parenthis.firstname == null ? '' : "&firstname=" + parenthis.firstname)) // firstname
                + (parenthis.pstatus == null ? '' : "&pstatus=" + parenthis.pstatus) // pstatus
                ;

            
            HttpGet(
                _s_url,
                function (data) {
                    
                    parenthis.currentpage = data.currentpage;
                    parenthis.total = data.total_num;
                    if(data.total_num > 0)
                        parenthis.list = data.data;
                    else
                        parenthis.list = null;
                    //
                    parenthis.pagerinit();
                    
                    parenthis.loading = false;
                    parenthis.ispagerclicked = null;
                    
                    // debug
                    // parenthis.setinfo("The media registration data have been imported.");
                },
                function (error) {
                    //
                    parenthis.seterror("An error has occurred." + " (" + error + ")");
                }
            );
        },
        pagerinit: function () {
            var pager_length = 10;
            var pager_shift = 4;

            // e.g., perpage: 5, total: 5 => 0/5=0, 1/5=0. 2/5=0, 3/5=0, 4/5=0, 5/5=1 but "5/5" case should also return 0
            var _last_item = Math.floor((this.total > 0 ? (this.total - 1) : 0) / this.perpage);

            var _pag_block_pos = Math.floor(this.currentpage / pager_length); // integer division

            var _pag_block_start = this.total > 0 ? (this.currentpage > pager_shift ? (this.currentpage - pager_shift) : (_pag_block_pos * pager_length)) : 0;
            var _pag_block_end = (_pag_block_start + pager_length);
            var _prev = this.currentpage > 0 ? this.currentpage - 1 : 0;
            var _next = this.currentpage < _last_item ? this.currentpage + 1 : _last_item;

            this.pager.first = 0;
            this.pager.current = this.currentpage;
            this.pager.previous = _prev;
            this.pager.next = _next;
            this.pager.last = _last_item;
            this.pager.pageblockstart = _pag_block_start;
            this.pager.pageblockend = _pag_block_end;
        },
        pagerclick: function (index) {

            this.currentpage = index;
            this.ispagerclicked = true;
            this.getlist();
        },
        range: function () {

            let start = this.pager.pageblockstart;
            let end = this.pager.pageblockend > this.pager.last ? this.pager.last+1 : this.pager.pageblockend;
            
            let iterator = [];
            for (let i = start; i < end; i++) {
                iterator.push(i);
            }

            return iterator;
        }
    }
});

//
function HttpGet(url, func, func1) {
    $.ajax({
        type: "GET",
        cache: false,
        url: url
    })
    .success(function (data) {
        func(data);
    })
    .error(function (request, status, error) {
        if (func1 == null) {
            if (request.responseText)
                alert(request.responseText);
            else
                alert(error);
        } else {
            if (request.responseText)
                func1(request.responseText);
            else
                func1(error);
        }
    });
}
