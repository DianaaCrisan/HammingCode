var api = require('./api.js').app;
var hamming = require('./hamming.js');

api.put('/message', function(request, response) {
  var numberOfDataBits = request.body.numberOfDataBits;
  var parityBitOption = request.body.parityBitOption;
  var bits_send = request.body.bits;

  bits_received = distortBit(bits_send, 2, parityBitOption);
  var decoded = hamming.decode(bits_received, numberOfDataBits, parityBitOption);

  if(decoded.errorDetected && decoded.canCorrectError){
    response.json(
    'Number of errors corrected: '+ decoded.nrErrorsCorrected + '. ' + 
    '   Error position: ' + decoded.errorPosition);
  }
  if(decoded.errorDetected && !decoded.canCorrectError){
    response.json(
    'Number of errors: '+ decoded.nrErrorsCorrected + '. ' + 
    '   Cannot correct errors. ');
  }
  response.json('Message received without errors');
});

api.listen(3000, function(){
  console.log('CORS-enabled web server is listening on port 3000...');
});

function distortBit(bits, index, parityBitOption){
  if (parityBitOption == "no"){
    bits[index] = (bits[index]+1) % 2;
  }
  else{
    bits[0] = (bits[0]+1) % 2;
    bits[index] = (bits[index]+1) % 2;
  }
  return bits;
}