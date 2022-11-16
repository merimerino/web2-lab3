class Rectangle {
  constructor(x, y, v_x, v_y, size) {
    this.x = x;
    this.y = y;
    this.v_x = v_x;
    this.v_y = v_y;
    this.size = size;
  }
}

const FPS = 30;
const MAX = 10;
const MIN = 3;

var colors = [
  "red",
  "white",
  "blue",
  "green",
  "pink",
  "yellow",
  "purple",
  "brown",
  "orange",
  "black",
];
function check_if_clicked(rect, x, y) {
  if (
    rect.x - rect.size / 2 <= x &&
    x <= rect.x - rect.size / 2 + rect.size &&
    rect.y - rect.size / 2 <= y &&
    y <= rect.y - rect.size / 2 + rect.size
  )
    return true;
  return false;
}

var canvas, context;
canvas = document.getElementById("gameCanvas");
var elemLeft = canvas.offsetLeft + canvas.clientLeft;
var elemTop = canvas.offsetTop + canvas.clientTop;
context = canvas.getContext("2d");
setInterval(update, 1000 / FPS);

var num_of_rect = Math.floor(Math.random() * 8) + 3;
var saved_num = num_of_rect;
var rectangles = [];

for (let i = 0; i < num_of_rect; i++) {
  let rect = new Rectangle(
    Math.floor(Math.random() * (canvas.width - 75)) + 40,
    Math.floor(Math.random() * (canvas.height - 75)) + 40,
    Math.floor(Math.random() * 76 + 100) / FPS,
    Math.floor(Math.random() * 76 + 100) / FPS,
    80
  );

  if (Math.floor(Math.random() * 2) == 0) {
    rect.v_x = -rect.v_x;
  }
  if (Math.floor(Math.random() * 2) == 0) {
    rect.v_y = -rect.v_y;
  }
  rectangles.push(rect);
}
var x = -1;
var y = -1;
canvas.addEventListener("click", function (event) {
  x = event.pageX - elemLeft;
  y = event.pageY - elemTop;
});
function update() {
  var index = -1;
  if (x > -1 && y > -1) {
    for (let i = num_of_rect - 1; i >= 0; --i) {
      if (check_if_clicked(rectangles[i], x, y)) {
        index = i;

        break;
      }
    }
    if (index > -1) {
      rectangles.splice(index, 1);
      colors.splice(index, 1);
      index = -1;
      num_of_rect--;
    }
    x = -1;
    y = -1;
  }
  for (let i = 0; i < num_of_rect; i++) {
    rectangles[i].x += rectangles[i].v_x;
    rectangles[i].y += rectangles[i].v_y;
    let vf = (Math.floor(Math.random() * 20) + 50) / FPS; //velocity factor

    // bounce the ball off each wall
    if (rectangles[i].x - rectangles[i].size / 2 < 0 && rectangles[i].v_x < 0) {
      rectangles[i].v_x = -rectangles[i].v_x + vf;
    }
    if (
      rectangles[i].x + rectangles[i].size / 2 > canvas.width &&
      rectangles[i].v_x > 0
    ) {
      rectangles[i].v_x = -rectangles[i].v_x + vf;
    }
    if (rectangles[i].y - rectangles[i].size / 2 < 0 && rectangles[i].v_y < 0) {
      rectangles[i].v_y = -rectangles[i].v_y + vf;
    }
    if (
      rectangles[i].y + rectangles[i].size / 2 > canvas.height &&
      rectangles[i].v_y > 0
    ) {
      rectangles[i].v_y = -rectangles[i].v_y + vf;
    }
    var text =
      "Generated : " + saved_num + " Clicked : " + (saved_num - num_of_rect);
  }

  // draw background and ball
  context.fillStyle = "grey";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < num_of_rect; i++) {
    context.fillStyle = colors[i];
    context.fillRect(
      rectangles[i].x - rectangles[i].size / 2,
      rectangles[i].y - rectangles[i].size / 2,
      rectangles[i].size,
      rectangles[i].size
    );
  }
  context.fillStyle = "black";
  context.font = "20px Arial";
  if (text != undefined) {
    context.fillText(text, canvas.width - 250, 50);
  } else {
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "50px Arial";
    context.fillText("You won!", canvas.width / 2, canvas.height / 2);
  }
}
