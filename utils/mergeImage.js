export const mergeImage = async (bg, fg) => {
    try {
        const { createCanvas, loadImage } = require('canvas');
        const fs = require('fs');

        // Load the PNG image and background image
        const pngImage = await loadImage(fg);

        const backgroundImage = await loadImage(bg);

        // Create a canvas element with the same dimensions as the PNG image
        const canvas = createCanvas(pngImage.width, pngImage.height);
        
        // Draw the PNG image onto the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(pngImage, 0, 0);
        
        // Set the canvas's globalCompositeOperation to 'destination-over' to make sure the background image is drawn behind the PNG image
        ctx.globalCompositeOperation = 'destination-over';
        
        // Draw the background image onto the canvas
        ctx.drawImage(backgroundImage, 0, 0);
        
        // Convert the canvas to a PNG buffer
        const pngBuffer = canvas.toBuffer();
        // console.log("VVVVVV", pngBuffer)
        // Write the resulting PNG buffer to a file
        // fs.writeFileSync('./out.png', pngBuffer);

        const bs64 = pngBuffer.toString('base64');
        const dataUrl = "data:image/png;base64," + bs64
        // console.log("VVVVVV", dataUrl)

        return dataUrl
} catch(err) {
    console.log("WERRR ", err)
}
}

// Helper function to ensure images are loaded before drawing them on the canvas
function loadImage(image) {
  return new Promise((resolve, reject) => {
    if (image.complete) {
      resolve();
    } else {
      image.onload = () => {
        resolve();
      };
      image.onerror = (error) => {
        reject(error);
      };
    }
  });
}
