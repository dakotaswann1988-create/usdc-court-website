// Redefine console for debug safety
if (! ("console" in window) || !("firebug" in console)) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group"
                 , "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i <names.length; ++i) window.console[names[i]] = function() {};
}

function setInputDefaultValue(input_id, input_value) {

//Setting the initial value via JS
$(input_id).val(input_value);

$(input_id).focus(function () {
  if ($(this).attr("value") == input_value) {
  $(this).val("");
}
}); //end focus function

$(input_id).blur(function () {
  if ($(this).attr("value") == "") {
    $(this).val(input_value);
  }

}); //end blur function
}