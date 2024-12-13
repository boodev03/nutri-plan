import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export async function loadModel(): Promise<mobilenet.MobileNet> {
  const model = await mobilenet.load();
  return model;
}

export async function processImage(
  model: mobilenet.MobileNet,
  imageElement: HTMLImageElement
): Promise<mobilenet.ClassificationPrediction[]> {
  const predictions = await model.classify(imageElement);
  return predictions;
}