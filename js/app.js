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

var words = ["cycle", "bicyle"];

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
        $("#gess").append("<tr id=\"sequence\"></tr>")
        $("#gess").append("<tr id=\"letters\"></tr>");
        var arr = [];
        arr = quiz.letters();
        for (var i = 0; i < arr.length; i += 1) {
            $("tr#letters").append("<td>" + arr[i] + "</td>");
        }
        var arr = [];
        arr = quiz.indices();
        $("#gess").append("<tr id=\"code\"></tr>");
        for (var i = 0; i < arr.length; i += 1) {
            $("tr#code").append("<td>" + arr[i] + "</td>");
        }
        
    }
}

function letterNumber(littera){
    var alphaomega = "abcdefghijklmnopqrstuvwxyz";
    var place = alphaomega.indexOf(littera);
    return place + 1;
}