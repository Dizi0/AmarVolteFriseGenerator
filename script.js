let friseInput = document.getElementById("inputBox");
let incrementer = 0;
let url = window.location.search.substr(1)
let encodedFriseContent = '';
friseInput.addEventListener("input", function (e) {
    generateFrise();
});

let itemArr = [];

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str));
}

function UnicodeDecodeB64(str) {
    return decodeURIComponent(atob(str));
}

function CopyMe(TextToCopy) {
    const TempText = document.createElement("input");
    TempText.value = TextToCopy;
    document.body.appendChild(TempText);
    TempText.select();

    document.execCommand("copy");
    document.body.removeChild(TempText);

    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function generateFrise(dataFromURL ='') {
    let frise = document.getElementById("frise");
    let friseContent

    if (dataFromURL === '') {
        friseContent = document.getElementById("friseInput").value;
    } else {
        friseContent = dataFromURL.replace('---' , ';');
        document.getElementById("inputBox").style.display = "none";
        document.getElementById("friseWrapper").classList.remove("wrapper");
        document.body.style.backgroundColor = "lime";
        document.title = "AmarVolte Frise OBS";
    }

    frise.innerHTML = "";

    encodedFriseContent = b64EncodeUnicode(friseContent.replace(';', '---'))
    friseContent = friseContent.split(";");

    friseContent.forEach((content) => {
        itemArr.push("item" + incrementer);
        frise.innerHTML += "<div onclick=selectCurrent('item"+incrementer +"') id=item"+incrementer+" class='item'>"+content +"</div>";
        frise.innerHTML += '<div style="border-left:1px solid grey;height:70px"></div>';
        ++incrementer;
    });
    frise.innerHTML +=
        '<div class="logo"><img class="av" src="./build/amarvolte.png" alt=""></div>';
    return true;
}

function generateFriseProd() {
    window.open(window.location.href +"?frisecontent=" + encodedFriseContent, 'Frise OBS', 'width=1600,height=200,frame=false,nodeIntegration=no,titleBarStyle=hiddenInset')
}

function selectCurrent(itemId) {
    itemArr.forEach((item) => {
        document.getElementById(item).classList.remove("current");
    });
    document.getElementById(itemId).classList.add("current");
}

function reset() {
    itemArr.forEach((item) => {
        document.getElementById(item).classList.remove("current");
    });

    itemArr = [];
    incrementer = 0;
    document.getElementById("frise").innerHTML = "";
    document.getElementById("friseInput").value = "";
}

if (url !== '') {
    let data = findGetParameter('frisecontent');
    data = UnicodeDecodeB64(data)
    generateFrise(data)
}



