function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dist(ax,ay,bx,by) {
	return Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
}

function initFireData(rn) {
	var fdt = []
	for (var i=0; i<rn; i++) 
		for (var j=0; j<rn; j++) {
			if (j==rn-1)
				fdt.push(2);
			else
				fdt.push(0);
		}
	return fdt;
}

var d=6;
var rn=60;
var fd = initFireData(rn);
var fdnew = initFireData(rn);

function choseColor(j, rn) {
	if (Math.random()<0.4/*+(rn-j)*0.4/rn*/) return 1;
	return 2;
}

function modFireData(rn) {
	for (var i=0; i<rn; i++)
		for (var j=0; j<rn-1; j++) {
			if (j<rn/3 && Math.random()<0.4) 
				fdnew[i*rn+j] = 0;
			else if (fd[i*rn+j]!=2 && fd[i*rn+j+1]==2 && fd[(i-1)*rn+j+1]>0 && 
					fd[(i+1)*rn+j+1]>0 && Math.random()<0.8) {
					var chcl = choseColor(j, rn);
					var s = getRandomInt(0, 18);	
					for (var k=0; k<s; k++)
						fdnew[i*rn+j-k] = chcl; 
					//if (Math.random()<0.6) fdnew[i*rn+j-1] = chcl;
			}
			else if (j>0 && fd[i*rn+j]>0 && fd[i*rn+j-1]==0 && Math.random()<0.4) {
				fdnew[i*rn+j] = 0;
			}
			else if (fd[i*rn+j]!=1 && fd[i*rn+j+1]==1 && fd[(i-1)*rn+j+1]==1 && 
					fd[(i+1)*rn+j+1]==1 && Math.random()<0.8) {
					var s = getRandomInt(0, 5);	
					for (var k=0; k<s; k++)
						fdnew[i*rn+j-k] = 1;
			}
			else if (fdnew[i*rn+j]==2) fdnew[i*rn+j] = choseColor(j, rn);
			else
				fdnew[i*rn+j] = fd[i*rn+j];
		}
}


function modFireData2(rn) {
	for (var i=0; i<rn; i++)
		for (var j=0; j<rn-1; j++) {
			if (j<rn/3 && Math.random()<0.4) 
				fdnew[i*rn+j] = 0;
			else if (fd[i*rn+j]!=2 && (fd[i*rn+j+1]==2 && fd[(i-1)*rn+j+1]>0 && fd[(i+1)*rn+j+1]>0) && Math.random()<0.8) {
					var chcl = choseColor(j, rn);	
					var s = getRandomInt(0, 4);	
					for (var k=0; k<s; k++)
						fdnew[i*rn+j-k] = chcl;
			}
			else if (j>0 && fd[i*rn+j]>0 && fd[i*rn+j-1]==0 && Math.random()<0.2+(rn-j)*1.0/rn) {
				fdnew[i*rn+j] = 0;
			}
			else if (fd[i*rn+j]==0 && fd[i*rn+j+1]==1 && fd[(i-1)*rn+j+1]==1 && 
					fd[(i+1)*rn+j+1]==1 && Math.random()<0.8) {
					var s = getRandomInt(0, 4);	
					for (var k=0; k<s; k++)
						fdnew[i*rn+j-k] = 1;
			}
			else if (fdnew[i*rn+j]==2) fdnew[i*rn+j] = choseColor(j, rn);
			else
				fdnew[i*rn+j] = fd[i*rn+j];
		}
}



function drawFireData(ctx, fd, d, rn) {
	for (var i=0; i<rn; i++)
		for (var j=0; j<rn; j++) {
			if (fd[i*rn+j]==2) 
				ctx.fillStyle = '#E0E019';
			else if (fd[i*rn+j]==1) 
				ctx.fillStyle = '#E04B19';
			else
				ctx.fillStyle = 'black';
			ctx.fillRect(i*d, j*d, d, d);
		}
}



 function animateFire() {
        var canv = document.getElementById('board');
        var ctx = canv.getContext('2d');

        // update
		modFireData2(rn);
		for (var i=0; i<rn*rn; i++) fd[i] = fdnew[i];
		
        // clear
        ctx.clearRect(0, 0, canv.width, canv.height);

        // draw stuff
		drawFireData(ctx, fdnew, d, rn);
		
     
        // request new frame
        requestAnimFrame(function() {
          animateFire();
        });
}
