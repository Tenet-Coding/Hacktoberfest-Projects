function clock(){
    var date = new Date();
    var Hours = date.getHours();
    var Min = date.getMinutes(); 
    var Sec = date.getSeconds();
    var Day = "AM";

    if(Hours == 0){
        Hours = 12;
    }

    if (Hours>12) {
        Hours -= 12;
        Day = "PM";
    }

    Hours = (Hours < 10) ? "0" + Hours : Hours;
    Min = (Min < 10) ? "0" + Min : Min;
    Sec = (Sec < 10) ? "0" + Sec : Sec;

    document.getElementById("hr").innerHtml = Hours + ' : ' + Min + ' : ' + Sec + ' ' + Day;
    document.getElementById("hr").textContent = Hours + ' : ' + Min + ' : ' + Sec + ' ' + Day;

    setTimeout(clock, 1000);
}

clock();
