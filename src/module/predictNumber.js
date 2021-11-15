/* eslint-disable no-undef */
const canvas = document.querySelector('#canvas');
const button = document.querySelector('#predict-button');

function makePrediction(arrayImage) {
  const imageDimensions = [1, 28, 28, 1];
  const imageTensor = tf.tensor(arrayImage, imageDimensions, 'float32');
  tf.ready().then(() => {
    const modelPath = '../model/model-tfjs/model.json';
    tf.loadLayersModel(modelPath).then((model) => {
      const result = model.predict(imageTensor);
      result.print();
      const { indices } = tf.topk(result);

      console.log(indices.arraySync()[0]);
    });
  });
}

async function catchImage() {
  button.addEventListener('click', () => {
    const imageData = canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    const imageTensor = tf.browser.fromPixels(imageData, 4);
    const resizedTensor = tf.image.resizeNearestNeighbor(
      imageTensor,
      [28, 28],
      true
    );
    let tensorData;
    resizedTensor.data().then((data) => {
      tensorData = data;
      imageTensor.dispose();
      resizedTensor.dispose();

      const arrayImage = tensorData
        .filter((_arr, index) => (index + 1) % 4 === 0)
        .map((arr) => Math.abs(arr) / 255.0);
      makePrediction(arrayImage);
    });
  });
}

async function predictNumber() {
  catchImage();
}

export default predictNumber;
