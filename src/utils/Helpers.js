function range(start, end) {
  let array = [...Array(end - start).keys()];
  return array.map(i => i + start);
}

function randomAngle() {
  return Math.PI * 2 * Math.random();
}

function randomDistance(factor) {
  return (Math.random() * factor) ** 2;
}
