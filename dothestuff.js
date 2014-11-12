// hi there, here is the js object.


inlets = 1; //define inlets
outlets = 4; //1 = positions 2 = radiuses 3 = colour 4 = radiuses query 
 
// instanciate global variables
var MAXSPEAKERS = 256; //maxium speaker input set at an unlikey high range
var MAXSOURCES = 256; //maxium source input set at an unlikey high range
var numspeakers = 8; //let this value define matrix dimensitons for set up. 
var numsources = 10; //

//var DEFAULTRADIUS = 0.3;
var DEFAULTRADIUS = 0.4;

var positions = new JitterMatrix(3, "float32", MAXSPEAKERS); // matrix: x,y,z, speakernumber
var radiuses = new JitterMatrix(1, "float32", MAXSPEAKERS, MAXSOURCES); // matrix: radius coefficient 
var colors = new JitterMatrix(4, "float32", MAXSPEAKERS); // matrix: RGBW 
var currentradiuses = new JitterMatrix(1, "float32", MAXSPEAKERS, MAXSOURCES); // matrix: radius coefficient 
currentradiuses.usesrcdim = 1; 

var whichsource = 0; 
var i, j, k; // counter variables


//Functions

//everytime you get a bang, output each matrix in defined outlet
function bang()
{
		subsource(whichsource);
		outlet(2, "jit_matrix", colors.name);
		outlet(1, "jit_matrix", currentradiuses.name);
		outlet(0, "jit_matrix", positions.name);
}

//when you receive 'speakeramt' redefine matrix dimensions to match input. 
function speakeramt(numOfSpeakers)
{
	numspeakers = numOfSpeakers;
}


//when you receive 'queryradius' update cell radius values to match 
// the correct source/speaker used last time. 
function queryradius(source, speaker)
{
		var p = radiuses.getcell(speaker, source);
		outlet(3, "radius", p);
}

//when you receive 'viewsource' the input == the source number engaged. 
function viewsource(v)
{
		whichsource = v;
}


// This function updates the dimensions of current radius matrix, and inputs radius data from 
// the radius matrix. 
function subsource(v)
{
		currentradiuses.srcdimstart = [0, v];
		currentradiuses.srcdimend = [numspeakers-1, v];
		currentradiuses.frommatrix(radiuses);
}

//The function 'changeradius' updates the cell value of appropriate source/speaker cell in 
//radiuses matrix.     
function changeradius(source, speaker, r)
{  
 		radiuses.setcell2d(speaker, source, r); 
}

//When you receive 'movespeaker,' update cells: speaker number (inlet navigated), x, y, z
function movespeaker(n, x, y, z)
{
	positions.setcell1d(n, x, y, z);
}


//when you receive 'randomize' set random vales for matrixes (pos, col and rad.) 
function randomize()
{
	for(i = 0;i<numspeakers;i++)
	{
			positions.setcell1d(i, rrand(), rrand(), rrand());
			colors.setcell1d(i, rrand(), rrand(), rrand(), 1.);
			for(j = 0;j<numsources;j++)
			{
					radiuses.setcell2d(i,j,DEFAULTRADIUS);
					//radiuses.setcell2d(i,j,rrand());
			}
			
	}
	
}

//define function rrand for randmoize function. 
function rrand()
{
		return(Math.random()*2.-1.);
}
