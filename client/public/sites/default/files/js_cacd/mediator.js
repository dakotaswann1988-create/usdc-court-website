
    function htmlEncode(value) {
        return $j('<div/>').text(value).html();
    }

    function htmlDecode(value) {
        return $j('<div/>').html(value).text();
    }
    function scrollTo(e, offset) {
        offset = $j.isNumeric(offset) ? offset : 0;
        var yScroll = ($j.isNumeric(e)? e: (e ? e.offset().top - 100 : 0)) + offset;
        if (yScroll < 0) yScroll = 0;
        $j('html, body').animate({ scrollTop: yScroll }, 'fast');
    }
    function formatPhone(phone) {
        var result = phone;
        if (phone) {
            phone = phone.toString().replace(/[^0-9]/g, '');
            if (phone && phone.length == 10) {
                result = '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 10);
            }
        }
        return result;
    }
    function JoinCounty(ary) {
        var display = "";
        if (ary) {
            ary = ary.sort(function (a, b) { if (a.MediationCounty.Name < b.MediationCounty.Name) return -1; else if (a.MediationCounty.Name > b.MediationCounty.Name) return 1; else return 0; });
            $j.each(ary, function (i, row) {
                if (row && row.MediationCounty && row.MediationCounty.Name) {
                    display = display + "<li>" + row.MediationCounty.Name + "</li>";
                }
            });
            display = "<ul>" + display + "</ul>";
        }
        return display;
    }

    function JoinAoe(ary) {
        var display = "";
        if (ary) {
            ary = ary.sort(function (a, b) { if (a.AreaOfExpertise.Description < b.AreaOfExpertise.Description) return -1; else if (a.AreaOfExpertise.Description > b.AreaOfExpertise.Description) return 1; else return 0; });
            $j.each(ary, function (i, row) {
                if (row && row.AreaOfExpertise && row.AreaOfExpertise.Description) {
                    display = display + row.AreaOfExpertise.Description + ', ';
                }
            });
        }
        display = display.replace(/^(, )+|(, )+$/g, '');
        //console.log(display);
        return display;
    }
    function isInt(value) {
        return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
    }

