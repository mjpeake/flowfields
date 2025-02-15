import Draw from "./fields/draw";
import Config from "./fields/config";
import Examples from "./fields/examples";

function FlowField(id: string = "flowfield", config: Config): void {
    // Append the application canvas to the document body
    let container = <HTMLCanvasElement>document.getElementById(id);
    if (!container) {
        console.error(`element with id "${id}" not found.`);
        return;
    }
    let canvas: HTMLCanvasElement;
    if (container instanceof HTMLCanvasElement) {
        canvas = container
    } else {
        canvas = loadCanvas(container);
    }
    console.log("using config", config)
    Draw(canvas, config);
}

function loadCanvas(div: HTMLElement): HTMLCanvasElement {
    var canvas = <HTMLCanvasElement>document.createElement('canvas')
    canvas.id = "flowfields-canvas";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    div.appendChild(canvas);
    return canvas;
}

export {
    FlowField,
    Config,
    Examples
};