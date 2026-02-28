import Config from './config';
import DrawFlow from './flow';
import debounce from 'debounce';

function Draw(canvas: HTMLCanvasElement, config: Config): void {
    (async () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error(`element with id "${canvas.id}" does not contain canvas.`);
            return
        }

        let setup = function() {
            const { width, height } = getCanvasSize(canvas);
            if (width < 1 || height < 1) {
                return;
            }
            if (ctx.canvas.width === width && ctx.canvas.height === height) {
                return;
            }
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            drawFlows(canvas, config);
        }
        setup();

        const debouncedSetup = debounce(setup, 120);
        window.addEventListener("resize", debouncedSetup);
        window.addEventListener("orientationchange", debouncedSetup);

        // Track element-size changes directly; mobile browsers can change layout
        // without always producing stable window-resize behavior.
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(() => debouncedSetup());
            observer.observe(canvas);
        }
    })();
}

function drawFlows(canvas: HTMLCanvasElement, config: Config) {
    drawBackground(canvas, config);
    const layerCount = config.layerCount + 1;
    const shortestEdge = Math.min(canvas.width, canvas.height);
    const baseFlowCount = Math.floor(config.flowDensity * shortestEdge);
    const areaScale = (canvas.width * canvas.height) / (1280 * 720);
    const smallScreenFactor = shortestEdge < 500 ? 0.65 : shortestEdge < 760 ? 0.8 : 1;
    const maxTotalFlows = Math.max(700, Math.floor(1600 * areaScale * smallScreenFactor));
    const maxFlowsPerLayer = Math.max(120, Math.floor(maxTotalFlows / layerCount));
    const flowCount = Math.max(40, Math.min(baseFlowCount, maxFlowsPerLayer));

    if (flowCount < baseFlowCount) {
        console.log(`[FlowFields] Capped flows per layer from ${baseFlowCount} to ${flowCount} for faster render`);
    }

    for (let frame = 0; frame < layerCount; frame++) {
        for (let i = 0; i < flowCount; i++) {
            DrawFlow(config, canvas, frame);
        }
    }
    console.log("generated flow field!");
}

function drawBackground(canvas: HTMLCanvasElement, config: Config) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error(`element with id "${canvas.id}" does not contain canvas.`);
        return
    }
    ctx.fillStyle = config.backgroundColor;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
}

function getCanvasSize(canvas: HTMLCanvasElement): { width: number; height: number } {
    const rect = canvas.getBoundingClientRect();
    return {
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
    };
}
export default Draw;
