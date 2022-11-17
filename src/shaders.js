// Nice shaders to use to.
const functionShader = f => ({ x, y, cx, py }) => y == py(f(cx(x))) ? 1 : 0;
const equationShader = (eq, err) => ({ x, y, cx, cy }) => Math.abs(eq(cx(x), cy(y))) <= err ? 1 : 0;
const inequationShader = ie => ({ x, y, cx, cy }) => ie(cx(x), cy(y)) ? 1 : 0;
const snowShader = rate => () => Math.random() <= rate ? 1 : 0;
const axisShader = ({ x, y, cx, cy, px, py }) => x == px(0) || y == py(0) ? 1 : 0;
const gridShader = ({ x, y, cx, cy }) => ((x, y) => !(x % 1) || !(y % 1) ? 0.5 : 0)(cx(x), cy(y));
const dotShader = (dx, dy) => ({ x, y, px, py }) => x == px(dx) && y == py(dy) ? 1 : 0;

module.exports = { 
    functionShader,
    equationShader,
    inequationShader,
    snowShader,
    axisShader,
    gridShader,
    dotShader
}