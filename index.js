let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvas_map = document.getElementById('canvas_map')
let map_ctx = canvas_map.getContext('2d')

let hexs = ['a','b','c',
					 'd','e','f',
					 '1','2','3',
					 '4','5','6',
					 '7','8','9']

let flag_types = ['tri_color_x','tri_color_y','triangle','nordic_cross','bi_color_x','bi_color_y']
let flag_features = ['dot']
let new_btn = document.getElementById('new_btn');
new_btn.addEventListener('click',makeFlag)
new_btn.addEventListener('click',makeCountryMap)
//ctx.canvas.height = window.innerHeight / 2;
//ctx.canvas.fillStyle = 'blue';

makeFlag();

function makeColor(){
	let newColor = '#';
	let x = 6;
  while(x > 0){
		newColor+=(hexs[Math.floor(hexs.length * Math.random())])
		x-=1;
	}
	return newColor;
}
//possible future animation
/*function animateFlag(){
	$('#canvas').fadeOut().delay(350).toggle('slide');
	setTimeout(makeFlag,350)
}*/
function makeFlag(){
	//console.log(chance.city())
	$('.name').html(chance.city());
	ctx.clearRect(0,0,canvas.width,canvas.height);
	let type = flag_types[Math.floor(flag_types.length * Math.random())]
	console.log(type)
	ctx.fillStyle = 'rgba(0,0,0,.4)';
	ctx.fillRect(2,2,133,78)
	if(type == 'tri_color_x'){
	ctx.fillStyle = makeColor();
	ctx.fillRect(0,0,130,25)
	ctx.fillStyle = makeColor();
	ctx.fillRect(0,25,130,25)
	ctx.fillStyle = makeColor();
	ctx.fillRect(0,50,130,25)
	}
	else if(type == 'tri_color_y'){
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,0, 130/3,75)
		ctx.fillStyle = makeColor();
		ctx.fillRect((130/3),0,130/3,75)
		ctx.fillStyle = makeColor();
		ctx.fillRect((130/3) * 2,0,130/3,75)
	}
	else if(type == 'triangle'){
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,0,130,75/2)
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,75/2,130,75/2)
		ctx.fillStyle = makeColor();
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(0,75);
		ctx.lineTo(130/2,75/2);
		ctx.fill();
	}
	else if(type == 'bi_color_x'){
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,0,130,75/2)
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,75/2,130,75/2)
	}
	else if(type == 'bi_color_y'){
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,0,130/2,75)
		ctx.fillStyle = makeColor();
		ctx.fillRect(130/2,0,130/2,75)
	}
	else if(type == 'nordic_cross'){
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,0,130,75)
		ctx.fillStyle = makeColor();
		ctx.fillRect(0,25,130,20)
		ctx.fillRect(50,0,20,75)
	}
	// add extra flag features
	if(type != 'nordic_cross' && Math.floor(7 * Math.random()) == 1){
		let feature = flag_features[Math.floor(flag_features.length * Math.random())]
		if(feature == 'dot'){
			ctx.beginPath()
			ctx.arc(130/2,75/2,20,0,2*Math.PI)
			ctx.fillStyle = randomColor();
			ctx.fill();
		}
	}
	
	
	
	let grad = ctx.createRadialGradient(130/2,75/2,10,130/2,75/2,60)
	grad.addColorStop(0,'rgba(255,255,255,.2)');
	grad.addColorStop(1,'rgba(0,0,0,.2)');
	ctx.fillStyle = grad;
	ctx.fillRect(0,0,130,75);
	var dataURL = canvas.toDataURL();
	
	document.getElementById('mainImage').src= dataURL;
	
}



//Creating Map
map_ctx.fillStyle = '#333';

map_ctx.fillRect(0,0,canvas_map.width,canvas_map.height)
map_ctx.fillStyle = 'green';
map_ctx.fillRect(0,0,20,20);

makeCountryMap();

function makeCountryMap(){
var map = []
var mapSeed = ''
//demensions
var dim = 10;
function createMap(seed){
if(seed)
seed = seed.split('');
let y = 0
while(y < dim){
	let x = dim;
	map[y] = ''
	while(x > 0){
		if(!seed){
			var rndNum = Math.floor(5 * Math.random())
		}
		else{
			var rndNum = seed.shift()
		}
		mapSeed+=rndNum;
		if(rndNum == 2){
			map[y]+='x'
		}
		else{
			map[y]+='#'
		}
		x--
	}
	y++
}

}
function refineMap(){
	let y = 0;
	while(y < dim){
		let x = dim;
		while(x > 0){
			//Mountains
			if(map[y][x-1] == 'x' && map[y][x+1] == 'x'){
				
				map[y] = map[y].substr(0,x) + '^' + map[y].substr(x+1,map.length)
			}
			if(y < dim-2 && y > 1){
				if(Math.floor(4* Math.random())){
				if(map[y-1][x] == 'x' && map[y+1][x] == 'x' && map[y][x-1] == 'x' || map[y][x+1]== 'x'){
					map[y] = map[y].substr(0,x) + 'x' + map[y].substr(x+1,map.length)
				}
			}
			else{
				if(map[y-1][x] == 'x' || map[y+1][x] == 'x' && map[y][x-1] == 'x' && map[y][x+1]== 'x'){
					map[y] = map[y].substr(0,x) + 'x' + map[y].substr(x+1,map.length)
				}
			}
				
			}
			x--
		}
		y++
	}
}
function drawMap(){
	map.map(function(row,y){ row.split('').map(function(tile,x){
		if(tile == '#'){
			map_ctx.fillStyle = 'blue';
			map_ctx.fillRect(20*x,20*y,20,20)
		}
		else if(tile == 'x'){
			map_ctx.fillStyle = randomColor({luminosity: 'dark',hue:'green'});
			map_ctx.fillRect(20*x,20*y,20,20)
		}
		else if(tile == '^'){
			map_ctx.fillStyle = 'grey';
			map_ctx.fillRect(20*x,20*y,20,20)
		}
	})})
}
createMap();
refineMap();
//refineMap();
drawMap();
}