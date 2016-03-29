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

var words = ["embezzling"];

$(document).ready(function(){
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
});

function quizzing(){
    $(".gess").show();
    for (var i = 0; i < words.length; i += 1) {
        var quiz = Object.create(word);
        quiz.entry = words[i];
        // $("#gess").append("<tr id=\"sequence\"></tr>")
        $("#gess").append("<tr id=\"letters\"></tr>");
        var arrLetters = [];
        arrLetters = quiz.letters();
        var o = arrLetters.length - numberAt;
        // for (var i = 0; i < arrLetters.length; i += 1) {
        //     $("tr#letters").append("<td>" + arrLetters[i] + "</td>");
        // }
        var arrIndices = [];
        arrIndices = quiz.indices();
        $("#gess").append("<tr id=\"code\"></tr>");
        // for (var i = 0; i < arrIndices.length; i += 1) {
        //     $("tr#code").append("<td>" + arrIndices[i] + "</td>");
        // }
        for (var j = 0; j < arrLetters.length / 2; j++){
            if (j == 0) {
                $("tr#letters").append("<td>" + arrLetters[j] + "</td>");
                $("tr#code").append("<td>" + arrIndices[j] + "</td>");
                console.log(numberAt);
                innerCircle(o, numberAt, quiz);
                // for (var k = 0; k < o - numberAt; k++) {
                //     if (k == 0){
                //         $("tr#letters").append("<td id=\"letterIn\"></td>");
                //         $("#letterIn").append("<form id=\"myGess\"></form>");
                //         $("#myGess").prepend("<input type=\"text\">");
                //         $("#myGess").append("<button type=\"button\">X</button>");
                //         $("#myGess").on("click", "button", function(){
                //             var enput = $("#myGess input").val();
                //             checkIn(enput, quiz); 
                //         });
                //     }
                //     else {
                //         $("tr#letters").append("<td>-</td>");
                //         // $("tr#code").append("<td>-</td>");
                //     }
                //     $("tr#code").append("<td>-</td>");
                // }
                $("tr#letters").append("<td>" + arrLetters[o] + "</td>");
                $("tr#code").append("<td>" + arrIndices[o] + "</td>");
            }
            else {
                // addRest();
            }
        }
    }
}

function letterNumber(littera){
    var alphaomega = "abcdefghijklmnopqrstuvwxyz";
    var place = alphaomega.indexOf(littera);
    return place + 1;
}

function checkIn(enPut, quiz){
    console.log("checkIn called");
    var letters = quiz.letters();
    if (!enPut){
        alert("no input, try again");
    }
    else{
        if (enPut == letters[numberAt]){
            console.log("correct");
            numberAt++;
            if (numberAt == (letters.length/2)){
                finishQuiz(quiz)
            }
            else {
                console.log(numberAt);
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
    console.log(start);
    console.log("number at"+numberAt);
    var end = letters.length - numberAt;
    console.log("end" + end);
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
    // $("tr#letters>td:nth-child("+(end)+")").remove();
    // $("tr#code>td:nth-child("+(end)+")").remove();
    // $("tr#letters>td:nth-child("+(start + 2)+")").remove();
    // $("tr#code>td:nth-child("+(start + 2)+")").remove();
    innerCircle(end, numberAt, quiz);
}

function finishQuiz(quiz){
    var letters = quiz.letters();
    var indices = quiz.indices();
    var start = numberAt - 1;
    console.log(start);
    console.log("number at"+numberAt);
    var end = letters.length - numberAt;
    console.log("end" + end);
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
    // $("tr#letters>td:nth-child("+(end)+")").remove();
    // $("tr#code>td:nth-child("+(end)+")").remove();
    // $("tr#letters>td:nth-child("+(start + 2)+")").remove();
    // $("tr#code>td:nth-child("+(start + 2)+")").remove();
    
}

function innerCircle(end, numberCurrent, quiz){
    // if (count >= 1){
    //     end = end - 2;
    // }
    var start = numberCurrent;
    if (count == 0){
        for (var k = 0; k < (end - numberCurrent); k++) {
            if (k == 0){
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
            else {
                // $("tr#letters").append("<td>-</td>");
                // $("tr#letters>td:nth-child("+(o)+")").remove();
                $("<td>-</td>").insertAfter("td#letterIn");
                // $("tr#code").append("<td>-</td>");
            }
            // $("tr#code").append("<td>-</td>");
            console.log(k);
            $("<td>-</td>").insertAfter("tr#code>td:nth-child("+(start)+")");
            
        }
    }
    else {
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