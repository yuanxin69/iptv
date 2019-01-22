var xmlData;
var selectedTimelineOption = 0;

$(document).ready(function() {
    loadSettings();
});

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(a, "text/xml");
            xmlData = xml;
            var epgTimeLine = parseInt(xml.getElementsByTagName("epg-time-line")[0].childNodes[0].nodeValue);
            selectOption(epgTimeLine);
            $("#loading-container").fadeOut(300);
        }
    });
}

function selectOption(option) {
    selectedTimelineOption = option;
    if (option == 0) {
        $("#epg-channels").find(".radio-inner").css("display", "block");
        $("#all-channels").find(".radio-inner").css("display", "none");
    } else if (option == 1) {
        $("#epg-channels").find(".radio-inner").css("display", "none");
        $("#all-channels").find(".radio-inner").css("display", "block");
    }
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    xmlData.getElementsByTagName("epg-time-line")[0].childNodes[0].nodeValue = selectedTimelineOption;
    var fd = new FormData();
    fd.append("settings", new XMLSerializer().serializeToString(xmlData));
    $.ajax({
        type: 'POST',
        url: SERVER_URL+'update-settings.php',
        data: fd,
        processData: false,
        contentType: false,
        success: function(a) {
            $("#loading-container").fadeOut(300);
        }
    });
}