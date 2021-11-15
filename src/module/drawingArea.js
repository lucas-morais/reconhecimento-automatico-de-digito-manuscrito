const canvas = document.querySelector('#canvas');

function drawOnCanvas() {
  const ctx = canvas.getContext('2d');
  const canvasTop = canvas.offsetTop;
  const canvasLeft = canvas.offsetLeft;
  let painting = false;

  function draw(event) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineTo(event.clientX - canvasLeft, event.clientY - canvasTop);
    ctx.stroke();
    ctx.moveTo(event.clientX - canvasLeft, event.clientY - canvasTop);
  }

  canvas.addEventListener('mousedown', (event) => {
    painting = true;
    draw(event);
  });
  canvas.addEventListener('mouseup', () => {
    painting = false;
    ctx.beginPath();
  });
  canvas.addEventListener('mousemove', draw);
}

function clearCanvas() {
  const button = document.querySelector('#clear-button');
  button.addEventListener('click', () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}

export { drawOnCanvas, clearCanvas };
