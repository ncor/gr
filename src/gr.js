const generateNullishMatrix = (width, height) => [ ...Array(height) ].map(() => [ ...Array(width) ].map(() => 0));

const generateAPIFunctions = ({ viewportWidth, viewportHeight, viewportX, viewportY, scale }) =>
    ((viewportMX, viewportMY) => ({
        // Returns the real X coordinate from the matrix X coordinate.
        cx: x => viewportX + (x - viewportMX) / (2 * scale),
        // Returns the real Y coordinate from the matrix Y coordinate.
        cy: y => viewportY - (y - viewportMY) / scale,
        // Reverse of the first. ^
        px: x => Math.round(viewportMX + 2 * scale * (x - viewportX)),
        // Reverse of the second. ^
        py: y => Math.round(viewportMY - scale * (y - viewportY))
    }))(
        // Defining the coordinates of the center of viewport on the matrix.
        Math.round((scale * viewportWidth * 2 - 1) / 2),
        Math.round((scale * viewportHeight - 1) / 2)
    )

// In the renderer, you can fully customize the viewport.
// GR works on shaders(mutators) and rendering function(basically character postprocessor).
const gr = ({ viewportWidth, viewportHeight, viewportX, viewportY, scale, shaders, rendererFunction }) =>
    // Each shader mutates the matrix after the previous one,
    // this allows you to create layers and multiple graphs in one.
    shaders.reduce(
        (matrix, shader) =>
            // Using deep map to iterate over all coordinates.
            matrix.map((_, y) =>
                _.map((value, x) => // In this scope we have an x,y pair and current value of pixel.
                    (
                        // Now we determine if the new value is greater than the current one,
                        // if so, then we replace the pixel.
                        newValue => newValue > value ? newValue : value
                    )
                    (
                        // So here it calls the shader function with all parameters and renderer functions
                        // to get the value from it. (all shaders is basically pixel shaders)
                        shader({
                            ...generateAPIFunctions({ viewportWidth, viewportHeight, viewportX, viewportY, scale }),
                            viewportWidth, viewportHeight, viewportX, viewportY, scale, x, y
                        })
                    )
                )
            ),
        // So it generates nullish matrix for the first iteration.
        generateNullishMatrix(viewportWidth * scale * 2, viewportHeight * scale)
    ).map(
        // Finally, the renderer function uses the coordinate values to render the appropriate symbol.
        (r, _) => r.map(rendererFunction).join('')
    ).join('\n'); // Returns 2D string of graph.


module.exports = { gr };