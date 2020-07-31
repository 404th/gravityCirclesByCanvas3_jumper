let canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

window.addEventListener( "resize" , () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  animate()
} )

function Create(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;


  this.upDate = function () {
    if (this.y + this.radius >= canvas.height ) {
      this.dy = -this.dy * 0.9;
    } else {
      this.dy += 1;
    }

    if( this.x + this.radius > canvas.width || this.x - this.radius < 0 ){
      this.dx = -this.dx * .4
    }
    
    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.fillStyle = this.color;
    c.stroke();
    c.strokeStyle = 'red';
    c.closePath();
  };
}

let colorArray = [
  '#33daef',
  '#ff3344',
  '#edbfea',
  '#3fedca',
  '#1decg9',
  '#fabc32',
  '#364738',
];

let circleArray = [];
function init() {
  for (let i = 0; i < 500; i++) {
    let radius = Math.random() * 50
    let x = (Math.random() * canvas.width - 2*radius) + radius ;
    let dx = ( Math.random() - 0.5 ) * 10;
    let y = (Math.random() * canvas.height - 2*radius) + radius ;
    let dy = Math.random() * 10;
    let colRan = Math.floor(Math.random()*7) + 1

    circleArray.push ( new Create( x, y , dx, dy, radius, colorArray[colRan] ) );
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let r = 0; r < circleArray.length; r++) {
    circleArray[r].upDate();
  }
}
init();
animate();
