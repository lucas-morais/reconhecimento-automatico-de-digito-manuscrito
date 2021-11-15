/* eslint-disable no-undef */
const canvas = document.querySelector('#canvas');
const button = document.querySelector('#predict-button');

async function catchImage() {
  const imageDimension = 28;
  button.addEventListener('click', async () => {
    const imageData = canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    const imageTensor = tf.browser.fromPixels(imageData, 4);
    const resizedTensor = tf.image.resizeNearestNeighbor(
      imageTensor,
      [28, 28],
      true
    );

    const tensorData = await resizedTensor.data();

    imageTensor.dispose();
    resizedTensor.dispose();

    const arrayImage = tensorData
      .filter((_arr, index) => (index + 1) % 4 === 0)
      .map((arr) => Math.abs(255 - arr) / 255.0);

    return arrayImage;
  });
}

function makePrediction(arrayImage) {
  // const finalImageTensor = tf.tensor(
  //   arrayImage,
  //   [imageDimension, imageDimension],
  //   'float32'
  // );
}

async function predictNumber() {
  const arrayImage = await catchImage();
  makePrediction();
}

export default predictNumber;
