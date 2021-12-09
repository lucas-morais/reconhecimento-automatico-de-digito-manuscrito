/* eslint-disable import/extensions */
import { drawOnCanvas, clearCanvas } from './module/drawingArea.js';
import predictNumber from './module/predictNumber.js';

window.onload = () => {
  drawOnCanvas();
  clearCanvas();
  predictNumber();
};
