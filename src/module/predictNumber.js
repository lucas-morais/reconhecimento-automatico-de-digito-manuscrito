/* eslint-disable no-undef */
const canvas = document.querySelector('#canvas');
const button = document.querySelector('#predict-button');

async function imageToTensor() {
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
    const arrayImage = tensorData
      .filter((_arr, index) => (index + 1) % 4 === 0)
      .map((arr) => Math.abs(255 - arr) / 255.0);
    const finalImageTensor = tf.tensor(
      arrayImage,
      [imageDimension, imageDimension],
      'float32'
    );
    finalImageTensor.print();
    console.log(finalImageTensor);

    // resizedTensor.print();
  });
}

function makePrediction() {}

async function predictNumber() {
  await imageToTensor();
  makePrediction();
}

export default predictNumber;
