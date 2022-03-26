function decode(bits, numberOfDataBits, parityBitOption) {
	if (numberOfDataBits == 4 && parityBitOption == "no"){
		var z4=parity(bits[3]+bits[4]+bits[5]+bits[6]);
		var z2=parity(bits[1]+bits[2]+bits[5]+bits[6]);
		var z1=parity(bits[0]+bits[2]+bits[4]+bits[6]);
		
		var errorPosition=z1*1+z2*2+z4*4;
		var errorDetected=false;
		var canCorrectError=true;
		var nrErrorsCorrected=1;

		if (errorPosition!=0){
			errorDetected=true;
		}

		if (errorDetected) {
			bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
		}
	}

	if (numberOfDataBits == 4 && parityBitOption == "yes"){
		var z4=parity(bits[4]+bits[5]+bits[6]+bits[7]);
		var z2=parity(bits[2]+bits[3]+bits[6]+bits[7]);
		var z1=parity(bits[1]+bits[3]+bits[5]+bits[7]);
		var z0=parity(bits[0]+bits[1]+bits[2]+bits[3]+bits[4]+bits[5]+bits[6]+bits[7]);
		
		var errorPosition=z1*1+z2*2+z4*4;
		var errorDetected=false;
		var canCorrectError=true;
		var nrErrorsCorrected=1;

		if (errorPosition != 0 && z0 == 0){
			errorDetected=true;
			nrErrorsCorrected=2;
			canCorrectError=false;
		}

		if (errorPosition == 0 && z0 != 0){
			errorDetected=true;
			errorPosition=1;

			bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
		}

		if (errorPosition != 0 && z0 != 0){
			errorDetected=true;

			bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
		}
	}

	if (numberOfDataBits == 8 && parityBitOption == "no"){
		var z8=parity(bits[7]+bits[8]+bits[9]+bits[10]+bits[11]);
		var z4=parity(bits[3]+bits[4]+bits[5]+bits[6]+bits[11]);
		var z2=parity(bits[1]+bits[2]+bits[5]+bits[6]+bits[9]+bits[10]);
		var z1=parity(bits[0]+bits[2]+bits[4]+bits[6]+bits[8]+bits[10]);
		
		var errorPosition=z1*1+z2*2+z4*4+z8*8;
		var errorDetected=false;
		var canCorrectError=true;
		var nrErrorsCorrected=1;

		if (errorPosition!=0){
			errorDetected=true;
		}

		if (errorDetected) {
			bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
		}
	}
	
	if (numberOfDataBits == 8 && parityBitOption == "yes"){
		var z8=parity(bits[8]+bits[9]+bits[10]+bits[11]+bits[12]);
		var z4=parity(bits[4]+bits[5]+bits[6]+bits[7]+bits[12]);
		var z2=parity(bits[2]+bits[3]+bits[6]+bits[7]+bits[10]+bits[11]);
		var z1=parity(bits[1]+bits[3]+bits[5]+bits[7]+bits[9]+bits[11]);
		var z0=parity(bits[0]+bits[1]+bits[2]+bits[3]+bits[4]+bits[5]+bits[6]+bits[7]+bits[8]+bits[9]+bits[10]+bits[11]+bits[12]);
		
		var errorPosition=z1*1+z2*2+z4*4+z8*8;
		var errorDetected=false;
		var canCorrectError=true;
		var nrErrorsCorrected=1;

		if (errorPosition != 0 && z0 == 0){
			errorDetected=true;
			nrErrorsCorrected=2;
			canCorrectError=false;
		}

		if (errorPosition == 0 && z0 != 0){
			errorDetected=true;
			errorPosition=1;

			bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
		}

		if (errorPosition != 0 && z0 != 0){
			errorDetected=true;

			bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
		}
	}

    return { 
		nrErrorsCorrected: nrErrorsCorrected,
		canCorrectError: canCorrectError,
		errorDetected: errorDetected, 
		errorPosition: errorPosition-1, 
		bits: bits };
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;