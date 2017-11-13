function genRand(min, range) {
    return Math.floor(Math.random()*range)+min;
}

this.generate =  function(size) {
    var serial = '';
    while(serial.length<size){
        var whatChar  = genRand(0, 3);
        serial += whatChar==0?String.fromCharCode(genRand(65, 26)):(whatChar==1)?String.fromCharCode(genRand(97, 26)):genRand(0,10);
    }
    return serial;
}