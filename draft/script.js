const canvas = document.querySelector('#canvas');
const canvas2 = document.querySelector('#canvas2');
function drawing() {
  const ctx = canvas.getContext('2d');

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

function catchImage() {
  const button = document.querySelector('#catch-button');
  button.addEventListener('click', () => {
    const imageData = canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    const imageTensor = tf.browser.fromPixels(imageData, 4);
    const arrayImage = Array.from(imageData.data)
      .filter((_arr, index) => (index + 1) % 4 === 0)
      .map((arr) => Math.abs(255 - arr) / 255.0);
    const len = imageTensor.shape[0];
    const finalImageTensor = tf.tensor(arrayImage, [len, len]);
    const resizedTensor = tf.image.resizeNearestNeighbor(
      imageTensor,
      [28, 28],
      true
    );
    resizedTensor.dtype = 'int32';
    console.log(resizedTensor);
    console.log(imageTensor.shape);
    console.log(arrayImage);
    resizedTensor.print();
    tf.browser.toPixels(resizedTensor, canvas2).then(() => {});
  });
}

function clearCanvas() {
  const button = document.querySelector('#clear-button');
  button.addEventListener('click', () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}

window.onload = () => {
  drawing();
  catchImage();
  clearCanvas();
};
