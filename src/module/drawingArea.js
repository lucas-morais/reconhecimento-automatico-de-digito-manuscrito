const canvas = document.querySelector('#canvas');

function drawOnCanvas() {
  const ctx = canvas.getContext('2d');
  let painting = false;
  
  function draw(event) {
    const { top, left } = canvas.getBoundingClientRect();
    if (!painting) return;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineTo(event.clientX - left, event.clientY - top);
    ctx.stroke();
    ctx.moveTo(event.clientX - left, event.clientY - top);
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
