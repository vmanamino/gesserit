$(document).ready(function(){
    
});

var word = {
    entry: "",
    letters:function(){
        var array = [];
        array = this.entry.split('');
        return array;
    },
    indices:function(){
        var array = [];
        for (var i = 0; i < word.letters().length; i += 1){
            array[i] = i + 1;
        }
        return array;
    }
};

function letterNumber(littera){
    var alphaomega = "abcdefghijklmnopqrstuvwxyz";
    var place = alphaomega.indexOf(littera);
    return place + 1;
}