import { TraceField } from "./fields/tracefield.js";
import { DotField } from "./fields/dotfield.js";
import { ImageTraceField } from "./fields/imagetracefield.js";
import { LineField } from "./fields/linefield.js";

const traceElement = "flowfield-trace"
const dotsElement = "flowfield-dots"
const imgTraceElement = "flowfield-imagetrace"
const lineElement = "flowfield-line"

document.addEventListener("DOMContentLoaded", (event) => {
  if (document.getElementById(lineElement) != null) {
    const color = $('#' + lineElement).css("color");
    const bgColor = $('#' + lineElement).css("background-color");
    new p5(LineField(color, bgColor), lineElement);
  }

  if (document.getElementById(traceElement) != null) {
    const color = $('#' + traceElement).css("color");
    const bgColor = $('#' + traceElement).css("background-color");
    new p5(TraceField(color, bgColor), traceElement);
  }

  if (document.getElementById(dotsElement) != null) {
    const color = $('#' + dotsElement).css("color");
    const bgColor = $('#' + dotsElement).css("background-color");
    new p5(DotField(color, bgColor), dotsElement);
  }

  if (document.getElementById(imgTraceElement) != null) {
    let imgPath = $('#' + imgTraceElement).css("background-image");
    imgPath = imgPath.replace(/(url\(|\)|")/g, '');
    const bgColor = $('#' + imgTraceElement).css("background-color");
    new p5(ImageTraceField(imgPath, bgColor), imgTraceElement);
  }
});