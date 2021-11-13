const canvas = document.querySelector('#canvas');
function drawing() {
  const ctx = canvas.getContext('2d');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  // ctx.strokeStyle = 'red';
  // ctx.strokeRect(100, 100, 200, 500);
  // ctx.strokeStyle = 'blue';
  // ctx.strokeRect(200, 100, 200, 500);

  // ctx.beginPath();
  // ctx.moveTo(100, 100);
  // ctx.lineTo(200, 100);
  // ctx.lineTo(200, 150);
  // ctx.closePath();
  // ctx.stroke();

  let painting = false;

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.moveTo(e.clientX, e.clientY);
  }

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishPosition() {
    painting = false;
    ctx.beginPath();
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishPosition);
  canvas.addEventListener('mousemove', draw);
}

window.onload = () => {
  drawing();
};
