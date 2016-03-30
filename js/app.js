var word = {
    entry: "",
    letters:function(){
        var letters = [];
        letters = this.entry.split('');
        return letters;
    },
    indices:function(){
        var indices = [];
        var litterae = this.letters();
        for (var i = 0; i < this.letters().length; i += 1){
            var index = letterNumber(litterae[i]) + (i + 1);
            indices[i] = index;
        }
        return indices;
    }
};

var count = 0;

var numberAt = 1;

var words = ["secret", "embezzling", "life", "embezzlement"];

var next = 0;

$(document).ready(function(){
    $(".next").hide();
    var secret = Object.create(word);
    secret.entry = "secret";
    var arr = [];
    arr = secret.indices();
    for (var i = 0; i < arr.length; i += 1) {
        $("#code").append("<li>" + arr[i] + "</li>");
    }
    $("#enter-target").mousedown(function(){
        $(".epigram").hide();    
        $(".intro").hide();
        quizzing();
    });
    $("#next").mousedown(function(){
        // console.log("next");
        $(".next").hide();
        $("#gess").empty();
        count = 0;
        numberAt = 1;
        next++;
        quizzing();
    });
});

function quizzing(){
    // $(".gess").show();
    var quiz = Object.create(word);
    // console.log("next "+next);
    quiz.entry = words[next];
    // console.log(quiz.entry);
    // $("#gess").append("<tr id=\"sequence\"></tr>")
    $("#gess").append("<tr id=\"letters\"></tr>");
    var arrLetters = [];
    arrLetters = quiz.letters();
    var o = arrLetters.length - numberAt;
    var arrIndices = [];
    arrIndices = quiz.indices();
    $("#gess").append("<tr id=\"code\"></tr>");
    $("tr#letters").append("<td>" + arrLetters[0] + "</td>");
    $("tr#code").append("<td>" + arrIndices[0] + "</td>");
    // console.log(numberAt);
    innerCircle(o, numberAt, quiz);
    $("tr#letters").append("<td>" + arrLetters[o] + "</td>");
    $("tr#code").append("<td>" + arrIndices[o] + "</td>");
   
}

function letterNumber(littera){
    var alphaomega = "abcdefghijklmnopqrstuvwxyz";
    var place = alphaomega.indexOf(littera);
    return place + 1;
}

function checkIn(enPut, quiz){
    // console.log("checkIn called");
    var letters = quiz.letters();
    if (!enPut){
        alert("no input, try again");
    }
    else{
        if (enPut == letters[numberAt]){
            // console.log("correct");
            numberAt++;
            if (numberAt == (letters.length/2)){
                finishQuiz(quiz)
            }
            else {
                // console.log(numberAt);
                addRest(quiz);
            }
        }
        else {
            alert("Try again");
        }
    }
}

function addRest(quiz){
    var letters = quiz.letters();
    var indices = quiz.indices();
    var start = numberAt - 1;
    // console.log(start);
    // console.log("number at"+numberAt);
    var end = letters.length - numberAt;
    // console.log("end" + end);
    for (var l = 0; l < 1; l++){
        $("td#letterIn").remove();
        $("<td>" + letters[start] + "</td>").insertAfter("tr#letters>td:nth-child("+start+")");
        $("tr#code>td:nth-child("+numberAt+")").remove();
        $("<td>" + indices[start] + "</td>").insertAfter("tr#code>td:nth-child("+start+")");
        $("tr#letters>td:nth-child("+(end + 1)+")").remove();
        $("<td>"+letters[end]+"</td>").insertBefore("tr#letters>td:nth-child("+(end + 1)+")");
        $("tr#code>td:nth-child("+(end + 1)+")").remove();
        $("<td>"+ indices[end] + "</td>").insertBefore("tr#code>td:nth-child("+(end + 1)+")");
    }
    innerCircle(end, numberAt, quiz);
}

function finishQuiz(quiz){
    var letters = quiz.letters();
    var indices = quiz.indices();
    var start = numberAt - 1;
    // console.log(start);
    // console.log("number at"+numberAt);
    var end = letters.length - numberAt;
    // console.log("end" + end);
    for (var l = 0; l < 1; l++){
        $("td#letterIn").remove();
        $("<td>" + letters[start] + "</td>").insertAfter("tr#letters>td:nth-child("+start+")");
        $("tr#code>td:nth-child("+numberAt+")").remove();
        $("<td>" + indices[start] + "</td>").insertAfter("tr#code>td:nth-child("+start+")");
        $("tr#letters>td:nth-child("+(end + 1)+")").remove();
        $("<td>"+letters[end]+"</td>").insertBefore("tr#letters>td:nth-child("+(end + 1)+")");
        $("tr#code>td:nth-child("+(end + 1)+")").remove();
        $("<td>"+ indices[end] + "</td>").insertBefore("tr#code>td:nth-child("+(end + 1)+")");
    }
    $(".next").show();
    
}

function innerCircle(end, numberCurrent, quiz){
    console.log("quiz letters and indices "+ quiz.letters()+ " "+quiz.indices());
    console.log("end minus current number "+ (end - numberCurrent)+" ");
    var start = numberCurrent;
    if (count == 0){
        for (var k = 0; k < (end - numberCurrent); k++) {
            if (k == 0){
                // e.g. s(e=k)---t
                $("<td id=\"letterIn\"></td>").insertAfter("tr#letters>td:nth-child("+(start)+")");
               
                $("#letterIn").append("<form id=\"myGess\"></form>");
                $("#myGess").prepend("<input type=\"text\">");
                $("#myGess").append("<button type=\"button\">X</button>");
                $("#myGess").on("click", "button", function(){
                    var enput = $("#myGess input").val();
                    checkIn(enput, quiz); 
                });
            }
            else {
                $("<td>-</td>").insertAfter("td#letterIn");
            }
            $("<td>-</td>").insertAfter("tr#code>td:nth-child("+(start)+")");
            
        }
    }
    else {
        console.log("else statement in innerCircle function");
        $("tr#letters>td:nth-child("+(start + 1)+")").remove();
        $("<td id=\"letterIn\"></td>").insertAfter("tr#letters>td:nth-child("+(start)+")");
            // $("tr#letters").append("<td id=\"letterIn\"></td>");
        $("#letterIn").append("<form id=\"myGess\"></form>");
        $("#myGess").prepend("<input type=\"text\">");
        $("#myGess").append("<button type=\"button\">X</button>");
        $("#myGess").on("click", "button", function(){
            var enput = $("#myGess input").val();
            checkIn(enput, quiz); 
        });
        
    }
    count++;
}