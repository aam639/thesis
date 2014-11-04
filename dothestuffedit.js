// hi there

outlets = 4; //1 = positions 2 = radiuses 3 = colour 4 = radiuses query 

  
//creating variables 
var numspeakers = 3;
var numsources = 16; //can I set this to anything?

var positions = new JitterMatrix(3, "float32", numspeakers); // x,y,z, speakernumber
var radiuses = new JitterMatrix(1, "float32", numspeakers, numsources); //
var colors = new JitterMatrix(4, "float32", numspeakers); 
var currentradiuses = new JitterMatrix(1, "float32", numspeakers); 
currentradiuses.usesrcdim = 1; 

var whichsource = 0; 
var i, j, k; // counter variables


//everytime you get a bang, 
function bang()
{
		subsource(whichsource);
		outlet(2, "jit_matrix", colors.name);
		outlet(1, "jit_matrix", currentradiuses.name);
		outlet(0, "jit_matrix", positions.name);
}

function speakeramt(numOfSpeakers)
{
	numspeakers = numOfSpeakers;
}


//when js. receives 'queryradius' (source + speaker) change cell setting.   
function queryradius(source, speaker)
{
		var p = radiuses.getcell(source, speaker);
		outlet(3, "radius", p);
}

function viewsource(v)
{
		whichsource = v;
}

function subsource(v)
{
		currentradiuses.srcdimstart = [0, v];
		currentradiuses.srcdimend = [numspeakers-1, v];
		currentradiuses.frommatrix(radiuses);
}

function changeradius(source, speaker, r)
{
		radiuses.setcell2d(speaker, source, r);
}

function movespeaker(n, x, y, z)
{
	positions.setcell1d(n, x, y, z);
}

function randomize()
{
	for(i = 0;i<numspeakers;i++)
	{
			positions.setcell1d(i, rrand(), rrand(), rrand());
			colors.setcell1d(i, rrand(), rrand(), rrand(), 1.);
			for(j = 0;j<numsources;j++)
			{
					radiuses.setcell2d(i,j,0.3);
					//radiuses.setcell2d(i,j,rrand());
			}
			
	}
	
}

function rrand()
{
		return(Math.random()*2.-1.);
}
