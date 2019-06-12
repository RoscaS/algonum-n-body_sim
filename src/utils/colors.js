const colors = [
  "#f9f33f",
  "#f92672",
  "#a6e22e",
  "#66d9ef",
  "#fd971f",
  "#ae81ff",
  "#00e291",
];

const colorsSize = colors.length;
let colorsI = 0;

function randomColor() {
  return `${colors[randint(0, colors.length - 1)]}`;
}

function getColor() {
  if (colorsI > colorsSize -1) colorsI = 0;
  return `${colors[colorsI++]}`;
}
