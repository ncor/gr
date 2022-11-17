const { gr } = require('./src/gr.js');
const { axisShader, gridShader, equationShader } = require('./src/shaders');


console.log(gr({
    viewportWidth: 6, // Viewport Width
    viewportHeight: 3, // Viewport Height
    viewportX: 0, // Viewport Center X (on the plane)
    viewportY: 0, // Viewport Center Y (on the plane)
    scale: 21, // Scaling (for example, the distance between Ox and x = 1 transforming to 30 pixels)
    shaders: [
        axisShader,
        gridShader,
        equationShader((x, y) => (x ** 2 - y ** 2) - 1, 0.05),
        equationShader((x, y) => (x ** 2 + y ** 2) - 1, 0.03)
    ],
    rendererFunction: v => typeof v === 'number' ? '.,*'[Math.floor(v * 2)] : v
}));
