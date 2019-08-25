let taRank = 0;
let txt = "";
let url = "";

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    txt = request.source;

    chrome.tabs.query({
        active:true,
        currentWindow:true
    },function(tabs){
        url = tabs[0].url;

        detectSite(url);
    })
  }
});

$(".start").click(function(){
    if($(".site").attr("id")==="impact"){
        parse_impact.init();
    }else{
        alert("임팩트 사이트가 아닙니다.");
    }
});

function onWindowLoad() {

    var config = {
        apiKey: "AIzaSyABH2VmW1UPj97OI_uIgoKM7fvUCvt5FsQ",
        authDomain: "impact-a1a08.firebaseapp.com",
        databaseURL: "https://impact-a1a08.firebaseio.com",
        projectId: "impact-a1a08",
        storageBucket: "impact-a1a08.appspot.com",
        messagingSenderId: "128816292858",
        appId: "1:128816292858:web:8a8360cb327b1039"
    };
    firebase.initializeApp(config);

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
      });
}

window.onload = onWindowLoad;


function detectSite(url){
    if(url.indexOf("impact.com")>-1){
        $(".site").html("임팩트 감지되었습니다.")
        $(".site").attr("id","impact");
    }else{
        $(".site").html("여행정보 사이트가 감지되지 않습니다.")
    }
}
