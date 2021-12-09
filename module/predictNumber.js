/* eslint-disable no-undef */
const canvas = document.querySelector('#canvas');
const predictionCanvas = document.querySelector('#prediction');
const button = document.querySelector('#predict-button');
// const image = document.querySelector('#image');
// const predictionCtx = predictionCanvas.getContext('2d');

function drawPrediction(predictedNumber) {
  predictionCanvas.innerHTML = '';
  const predictionImage = document.createElement('img');
  predictionImage.src = `./images/${predictedNumber}.jpg`;
  predictionImage.height = 360;
  predictionImage.width = 360;
  predictionCanvas.appendChild(predictionImage)
}

function makePrediction(arrayImage) {
  const imageDimensions = [1, 28, 28, 1];
  const imageTensor = tf.tensor(arrayImage, imageDimensions, 'float32');
  tf.ready().then(() => {
    const modelPath = './model/model-tfjs/model.json';
    tf.loadLayersModel(modelPath).then((model) => {
      const result = model.predict(imageTensor);
      const { indices } = tf.topk(result);
      
      const predictedNumber = indices.arraySync()[0];
      drawPrediction(predictedNumber);
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
  await catchImage();
}

export default predictNumber;
