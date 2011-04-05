function duplicateMatrixByKey(matrix, sourceIndexes, targetIndexes, increment) {
	if (sourceIndexes.length != targetIndexes.length)
		return false
		
	if (increment == undefined) increment = 0;
	var duplicatedArray;
	$.each(sourceIndexes, function(index, value) {
		duplicatedArray = matrix[value].slice();
		for(var i = 0;i < duplicatedArray.length;i++) {
			duplicatedArray[i] += increment;
		}
		matrix[targetIndexes[index]] = duplicatedArray;
	})
	return matrix;
}

var matrix = [];

matrix[0]  = [];
matrix[1]  = [];
matrix[2]  = [];
matrix[3]  = [];
matrix[4]  = [];

matrix[5]  = [];
matrix[6]  = [5];

matrix[7]  = [];
matrix[8]  = [7];

matrix[9]  = [];
matrix[10] = [9];

matrix[11] = [];
matrix[12] = [11];
matrix[13] = [11,12];
matrix[14] = [11,13];

matrix[15] = [];
matrix[16] = [15];
matrix[17] = [15,16];
matrix[18] = [15,17];

matrix[19] = [];
matrix[20] = [19];
matrix[21] = [19,20];
matrix[22] = [19,21];

matrix[23] = [];
matrix[24] = [23];
matrix[25] = [23,24];
matrix[26] = [23,24,25];
matrix[27] = [23,24,25,26];
matrix[28] = [23,24,25,26,27];
matrix[29] = [23,24,25,26,28];
matrix[30] = [23,24,25,26,27,29];
matrix[31] = [23,24,25];
matrix[32] = [23,24,26,31];
matrix[33] = [23,24,26,27,29,30,31];
matrix[34] = [24,27,28,30,33];

duplicateMatrixByKey(matrix, 
				[23,24,25,26,27,28,29,30,31,32,33,34], 
				[35,36,37,38,39,40,41,42,43,44,45,46], 12);

matrix[47] = [];
matrix[48] = [47];
matrix[49] = [47.48];
matrix[50] = [47,49];
matrix[51] = [48,49,50];
matrix[52] = [47,48,49,50,51];
matrix[53] = [48,49,50,51,52];
matrix[54] = [47,48,49,50,51,52,53];
matrix[55] = [47,49,52,53];
matrix[56] = [47,48,49,50,51,54];
matrix[57] = [48,49,51,52,53,54,55,56];
matrix[58] = [47,48,49,50,52,53,54,55,56,57];
matrix[59] = [47,49,50,51,56,57,58];
matrix[60] = [47,48,49,51,52,53,54,55,56,57,58,59];
matrix[61] = [48,49,50,53,54,55,58,59,60];
matrix[62] = [47,48,49,50,51,52,56,57,59,60,61];
matrix[63] = [47,49,51,53,54,55,57,58,59,61,62];
matrix[64] = [47,48,49,50,52,53,54,55,56,58,59,61,62,63];
matrix[65] = [48,49,50,51,52,54,56,57,62,63,64];
matrix[66] = [47,49,51,53,54,55,57,58,60,62,64,65];
matrix[67] = [47,48,49,50,52,53,55,56,58,62,66];
matrix[68] = [47,48,49,50,51,52,54,55,56,57,59,61,63,66,67];
matrix[69] = [47,49,51,53,54,57,58,59,61,62,63,66,67,68];
matrix[70] = [47,48,49,50,52,53,54,55,56,58,59,60,61,63,69];
matrix[71] = [48,49,50,51,53,54,55,56,57,60,62,65,67,68,69,70];
matrix[72] = [47,48,49,50,51,52,57,58,60,61,62,63,65,68,69,71];

duplicateMatrixByKey(matrix, 
				[47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72], 
				[73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98], 26)