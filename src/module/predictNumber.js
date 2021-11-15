// const canvas = document.querySelector('#canvas');

// function catchImage() {
//   const button = document.querySelector('#catch-button');
//   button.addEventListener('click', () => {
//     const imageData = canvas
//       .getContext('2d')
//       .getImageData(0, 0, canvas.width, canvas.height);
//     const imageTensor = tf.browser.fromPixels(imageData, 4);
//     const arrayImage = Array.from(imageData.data)
//       .filter((_arr, index) => (index + 1) % 4 === 0)
//       .map((arr) => Math.abs(255 - arr) / 255.0);
//     const len = imageTensor.shape[0];
//     const finalImageTensor = tf.tensor(arrayImage, [len, len]);
//     const resizedTensor = tf.image.resizeNearestNeighbor(
//       imageTensor,
//       [28, 28],
//       true
//     );
//     resizedTensor.dtype = 'int32';
//     console.log(resizedTensor);
//     console.log(imageTensor.shape);
//     console.log(arrayImage);
//     resizedTensor.print();
//     tf.browser.toPixels(resizedTensor, canvas2).then(() => {});
//   });
// }
