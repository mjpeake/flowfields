import Draw from "./fields/draw";
import Config from "./fields/config";
import Examples from "./fields/examples";

function FlowField(id: string = "flowfield", config: Config): void {
    // Append the application canvas to the document body
    const canvas = <HTMLCanvasElement> document.getElementById(id);
    if (!canvas) {
        console.error(`element with id "${id}" not found.`);
        return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error(`element with id "${id}" is not a canvas.`);
        return
    }
    console.log("using config", config)
    Draw(canvas, config);
}

export {
    FlowField,
    Config,
    Examples
};