/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var FlowFields;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./flowfields/fields/dotfield.js":
/*!***************************************!*\
  !*** ./flowfields/fields/dotfield.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const DotParticle = __webpack_require__(/*! ./particle/dot.js */ \"./flowfields/fields/particle/dot.js\")\r\nconst Grid = __webpack_require__(/*! ./grid/grid.js */ \"./flowfields/fields/grid/grid.js\")\r\n\r\nfunction DotField(color, bgColor) {\r\n    const sketch = (p) => {\r\n        p.setup = function () {\r\n            //Params\r\n            p.particleColor = p.color(color);\r\n            p.backgroundColor = p.color(bgColor);\r\n\r\n            // Determine size of parent div\r\n            const div = p.canvas.parentElement;\r\n            p.createCanvas(div.offsetWidth, div.offsetHeight);\r\n            p.background(p.backgroundColor);\r\n\r\n            // Create field\r\n            p.field = new Grid(p, div.offsetWidth, div.offsetHeight, 0.001);\r\n\r\n            // Create particles\r\n            let cells = p.field.getCellsAsArr();\r\n            p.particles = [];\r\n            for (const cell of cells) {\r\n                p.particles.push(new DotParticle(p, cell));\r\n            }\r\n        }\r\n\r\n\r\n        p.draw = function () {\r\n            p.background(p.backgroundColor);\r\n            p.field.animate(0.1);\r\n\r\n            // Draw particles\r\n            for (const particle of p.particles) {\r\n                particle.draw(p.particleColor);\r\n            }\r\n        }\r\n\r\n        p.windowResized = function () {\r\n            p.setup();\r\n        }\r\n    }\r\n    return sketch;\r\n}\r\nmodule.exports = DotField;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/dotfield.js?");

/***/ }),

/***/ "./flowfields/fields/grid/cell.js":
/*!****************************************!*\
  !*** ./flowfields/fields/grid/cell.js ***!
  \****************************************/
/***/ ((module) => {

eval("class Cell {\r\n  constructor(p, col, row, width, height) {\r\n    this.p = p;\r\n\r\n    this.col = col;\r\n    this.row = row;\r\n    this.width = width;\r\n    this.height = height;\r\n\r\n    this.noise = this.determineNoise(col, row, 0);\r\n    this.position = this.determinePosition(col, row);\r\n  }\r\n\r\n  update(frameCount, speed) {\r\n    const depth = frameCount * speed;\r\n    this.noise = this.determineNoise(this.col, this.row, depth);\r\n  }\r\n\r\n  determinePosition(col, row) {\r\n    return this.p.createVector(col * this.width, row * this.height);\r\n  }\r\n\r\n  determineNoise(xCord, yCord, zCord) {\r\n    let inc = 0.1;\r\n    return this.p.noise(xCord * inc, yCord * inc, zCord * inc);\r\n  }\r\n\r\n  getDirection() {\r\n    let angle = this.noise * this.p.TWO_PI;\r\n    return p5.Vector.fromAngle(angle).setMag(1);\r\n  }\r\n\r\n  getNoise() {\r\n    return this.noise;\r\n  }\r\n}\r\nmodule.exports = Cell;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/grid/cell.js?");

/***/ }),

/***/ "./flowfields/fields/grid/grid.js":
/*!****************************************!*\
  !*** ./flowfields/fields/grid/grid.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Cell = __webpack_require__(/*! ./cell.js */ \"./flowfields/fields/grid/cell.js\")\r\n\r\nclass Grid {\r\n    constructor(p, width, height, density) {\r\n        if (density == undefined) {\r\n            density = 0.01;\r\n        }\r\n        this.p = p;\r\n        this.cellSize = p.sqrt((width * height) / (density * width * height));\r\n        this.cellCountX = p.round(width / this.cellSize);\r\n        this.cellCountY = p.round(height / this.cellSize);\r\n        this.cellHeight = height / this.cellCountY;\r\n        this.cellWidth = width / this.cellCountX;\r\n\r\n        this.cells = this.populateCells();\r\n\r\n        this.frameCount = 0;\r\n    }\r\n\r\n    animate(speed) {\r\n        this.frameCount++;\r\n        this.updateCells(this.frameCount, speed);\r\n    }\r\n\r\n    populateCells() {\r\n        let cells = [[]];\r\n        for (let i = 0; i < this.cellCountX; i++) {\r\n            cells[i] = [];\r\n            for (let j = 0; j < this.cellCountY; j++) {\r\n                cells[i][j] = new Cell(this.p, i, j, this.cellWidth, this.cellHeight);\r\n            }\r\n        }\r\n        return cells\r\n    }\r\n\r\n    updateCells(frameCount, speed) {\r\n        for (let i = 0; i < this.cellCountX; i++) {\r\n            for (let j = 0; j < this.cellCountY; j++) {\r\n                this.cells[i][j].update(frameCount, speed);\r\n            }\r\n        }\r\n    }\r\n\r\n    getCellAtPos(position) {\r\n        const x = Math.floor(position.x / (this.p.width / this.cellCountX));\r\n        const y = Math.floor(position.y / (this.p.height / this.cellCountY));\r\n        return (x >= 0 && x < this.cellCountX && y >= 0 && y < this.cellCountY) ? this.cells[x][y] : null;\r\n    }\r\n\r\n    getCellsAsArr() {\r\n        let cellArr = [];\r\n        for (let i = 0; i < this.cellCountX; i++) {\r\n            for (let j = 0; j < this.cellCountY; j++) {\r\n                cellArr.push(this.cells[i][j]);\r\n            }\r\n        }\r\n        return cellArr;\r\n    }\r\n\r\n    draw(color) {\r\n        this.p.strokeWeight(1);\r\n        for (const cellLayer of this.cells) {\r\n            for (const cell of cellLayer) {\r\n                cell.drawDirection(color);\r\n            }\r\n        }\r\n    }\r\n}\r\nmodule.exports = Grid;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/grid/grid.js?");

/***/ }),

/***/ "./flowfields/fields/imagetracefield.js":
/*!**********************************************!*\
  !*** ./flowfields/fields/imagetracefield.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const TraceParticle = __webpack_require__(/*! ./particle/trace.js */ \"./flowfields/fields/particle/trace.js\")\r\nconst Grid = __webpack_require__(/*! ./grid/grid.js */ \"./flowfields/fields/grid/grid.js\")\r\n\r\nfunction ImageTraceField(imgPath, bgColor) {\r\n  const sketch = (p) => {\r\n    p.setup = function () {\r\n      //Params\r\n      p.particleDensity = 0.005;\r\n      p.img = p.loadImage(imgPath);\r\n      p.backgroundColor = p.color(bgColor);\r\n\r\n      // Determine size of parent div\r\n      const div = p.canvas.parentElement;\r\n      p.createCanvas(div.offsetWidth, div.offsetHeight);\r\n      p.background(p.backgroundColor);\r\n\r\n      // Create field\r\n      p.field = new Grid(p, div.offsetWidth, div.offsetHeight);\r\n\r\n      // Create particles\r\n      p.particleCount = (p.width * p.height) * p.particleDensity;\r\n      p.particles = [];\r\n      for (let i = 0; i < p.particleCount; i++) p.particles.push(new TraceParticle(p));\r\n    }\r\n\r\n    p.draw = function () {\r\n      // Draw particles\r\n      for (const particle of p.particles) {\r\n        let getX = p.norm(particle.position.x, 0, p.width) * p.img.width;\r\n        let getY = p.norm(particle.position.y, 0, p.height) * p.img.height;\r\n        let pix = p.img.get(getX, getY);\r\n        let pixColor = p.color(p.red(pix), p.green(pix), p.blue(pix), 20);\r\n        particle.draw(pixColor);\r\n      }\r\n    }\r\n\r\n    p.windowResized = function () {\r\n      p.setup();\r\n    }\r\n  }\r\n  return sketch;\r\n}\r\nmodule.exports = ImageTraceField;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/imagetracefield.js?");

/***/ }),

/***/ "./flowfields/fields/linefield.js":
/*!****************************************!*\
  !*** ./flowfields/fields/linefield.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const LineParticle = __webpack_require__(/*! ./particle/line.js */ \"./flowfields/fields/particle/line.js\")\r\nconst Grid = __webpack_require__(/*! ./grid/grid.js */ \"./flowfields/fields/grid/grid.js\")\r\n\r\nfunction LineField(color, bgColor) {\r\n    const sketch = (p) => {\r\n        p.setup = function () {\r\n            //Params\r\n            p.particleColor = p.color(color);\r\n            p.backgroundColor = p.color(bgColor);\r\n\r\n            // Determine size of parent div\r\n            const div = p.canvas.parentElement;\r\n            p.createCanvas(div.offsetWidth, div.offsetHeight);\r\n            p.background(p.backgroundColor);\r\n\r\n            // Create field\r\n            p.field = new Grid(p, div.offsetWidth, div.offsetHeight, 0.001);\r\n\r\n            // Create particles\r\n            let cells = p.field.getCellsAsArr();\r\n            p.particles = [];\r\n            for (const cell of cells) {\r\n                p.particles.push(new LineParticle(p, cell));\r\n            }\r\n        }\r\n\r\n\r\n        p.draw = function () {\r\n            p.background(p.backgroundColor);\r\n            p.field.animate(0.25);\r\n\r\n            // Draw particles\r\n            for (const particle of p.particles) {\r\n                particle.draw();\r\n            }\r\n        }\r\n\r\n        p.windowResized = function () {\r\n            p.setup();\r\n        }\r\n    }\r\n    return sketch;\r\n}\r\nmodule.exports = LineField;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/linefield.js?");

/***/ }),

/***/ "./flowfields/fields/particle/dot.js":
/*!*******************************************!*\
  !*** ./flowfields/fields/particle/dot.js ***!
  \*******************************************/
/***/ ((module) => {

eval("class DotParticle {\r\n    constructor(p, cell) {\r\n        this.p = p;\r\n        this.cell = cell;\r\n        this.maxSize = Math.min(this.cell.width, this.cell.height);\r\n    }\r\n\r\n    draw(color) {\r\n        this.p.fill(color);\r\n        let centrePos = this.cell.position.copy().add(this.p.createVector(this.cell.width/2, this.cell.height/2));\r\n        this.p.ellipse(centrePos.x, centrePos.y, this.cell.getNoise() * this.maxSize);\r\n    }\r\n}\r\nmodule.exports = DotParticle;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/particle/dot.js?");

/***/ }),

/***/ "./flowfields/fields/particle/line.js":
/*!********************************************!*\
  !*** ./flowfields/fields/particle/line.js ***!
  \********************************************/
/***/ ((module) => {

eval("class LineParticle {\r\n    constructor(p, cell) {\r\n        this.p = p;\r\n        this.cell = cell;\r\n    }\r\n\r\n    draw() {\r\n        this.drawLine(this.p.particleColor);\r\n    }\r\n\r\n    drawLine(color) {\r\n        this.p.stroke(color);\r\n        let centrePos = this.cell.position.copy().add(this.p.createVector(this.cell.width/2, this.cell.height/2));\r\n        let lineSize = Math.min(this.cell.width/2, this.cell.height/2) * 0.8;\r\n        let dir = this.cell.getDirection().mult(lineSize);\r\n        let start = centrePos.copy().sub(dir);\r\n        let end = centrePos.copy().add(dir);\r\n        this.p.line(start.x, start.y, end.x, end.y);\r\n    }\r\n}\r\nmodule.exports = LineParticle;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/particle/line.js?");

/***/ }),

/***/ "./flowfields/fields/particle/trace.js":
/*!*********************************************!*\
  !*** ./flowfields/fields/particle/trace.js ***!
  \*********************************************/
/***/ ((module) => {

eval("class TraceParticle {\r\n  constructor(p) {\r\n    this.p = p;\r\n    this.position = p.createVector(p.random(1, p.width), p.random(1, p.height));\r\n  }\r\n\r\n  draw(color) {\r\n    if (this.onCanvas()) {\r\n      this.update();\r\n      this.drawLine(color);\r\n    }\r\n  }\r\n\r\n  update() {\r\n    let currentCell = this.p.field.getCellAtPos(this.position);\r\n    if (currentCell != null) {\r\n      this.prevposition = this.position.copy();\r\n      this.position.add(currentCell.getDirection());\r\n    }\r\n  }\r\n\r\n  drawLine(color) {\r\n    this.p.strokeWeight(2);\r\n    this.p.stroke(color);\r\n    this.p.line(this.position.x, this.position.y, this.prevposition.x, this.prevposition.y);\r\n  }\r\n\r\n  onCanvas() {\r\n    const inX = this.position.x > 0 && this.position.x < this.p.width;\r\n    const inY = this.position.y > 0 && this.position.y < this.p.height;\r\n    return inX && inY\r\n  }\r\n}\r\nmodule.exports = TraceParticle;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/particle/trace.js?");

/***/ }),

/***/ "./flowfields/fields/tracefield.js":
/*!*****************************************!*\
  !*** ./flowfields/fields/tracefield.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const TraceParticle = __webpack_require__(/*! ./particle/trace.js */ \"./flowfields/fields/particle/trace.js\")\r\nconst Grid = __webpack_require__(/*! ./grid/grid.js */ \"./flowfields/fields/grid/grid.js\")\r\n\r\nfunction TraceField(color, bgColor) {\r\n  const sketch = (p) => {\r\n    p.setup = function () {\r\n      //Params\r\n      p.particleDensity = 0.005;\r\n      p.particleIntensity = 5;\r\n      p.particleColor = p.color(color);\r\n      p.particleColor.setAlpha(p.particleIntensity);\r\n      p.backgroundColor = p.color(bgColor);\r\n\r\n      // Determine size of parent div\r\n      const div = p.canvas.parentElement;\r\n      p.createCanvas(div.offsetWidth, div.offsetHeight);\r\n      p.background(p.backgroundColor);\r\n\r\n      // Create field\r\n      p.field = new Grid(p, div.offsetWidth, div.offsetHeight);\r\n\r\n      // Create particles\r\n      p.particleCount = (p.width * p.height) * p.particleDensity;\r\n      p.particles = [];\r\n      for (let i = 0; i < p.particleCount; i++) p.particles.push(new TraceParticle(p));\r\n    }\r\n\r\n    p.draw = function () {\r\n      // Draw particles\r\n      for (const particle of p.particles) {\r\n        particle.draw(p.particleColor);\r\n      }\r\n    }\r\n\r\n    p.windowResized = function () {\r\n      p.setup();\r\n    }\r\n  }\r\n  return sketch;\r\n}\r\nmodule.exports = TraceField;\n\n//# sourceURL=webpack://FlowFields/./flowfields/fields/tracefield.js?");

/***/ }),

/***/ "./flowfields/index.js":
/*!*****************************!*\
  !*** ./flowfields/index.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const TraceField = __webpack_require__(/*! ./fields/tracefield.js */ \"./flowfields/fields/tracefield.js\");\r\nconst DotField = __webpack_require__(/*! ./fields/dotfield.js */ \"./flowfields/fields/dotfield.js\");\r\nconst ImageTraceField = __webpack_require__(/*! ./fields/imagetracefield.js */ \"./flowfields/fields/imagetracefield.js\");\r\nconst LineField = __webpack_require__(/*! ./fields/linefield.js */ \"./flowfields/fields/linefield.js\");\r\n\r\nmodule.exports = {\r\n    TraceField,\r\n    DotField,\r\n    ImageTraceField,\r\n    LineField\r\n};\n\n//# sourceURL=webpack://FlowFields/./flowfields/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./flowfields/index.js");
/******/ 	FlowFields = __webpack_exports__;
/******/ 	
/******/ })()
;