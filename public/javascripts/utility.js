const colors = []
for (let i = 0; i < 10; i += 1) {
  for (let j = 0; j < 10; j += 1) {
    for (let k = 0; k < 10; k += 1) {
      let red = Math.floor(255 - 25 * i);
      let green = Math.floor(255 - 25 * j);
      let blue = Math.floor(255 - 25 * k);
      let color = `rgb(${red}, ${green}, ${blue})`;
      colors.push(color);
    }
  }
}

function randomColor() { return colors[Math.floor(Math.random() * colors.length)] }

function createCircleSVGSrc(colorCode='#f216FF') {
  let svg = `<svg viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill='${colorCode}'></circle></svg>`;
  const svgBlob = new Blob([svg], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const svgBase64 = URL.createObjectURL(svgBlob);
  return svgBase64;
}
