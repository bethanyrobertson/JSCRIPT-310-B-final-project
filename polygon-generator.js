const generateButton = document.getElementById('generateButton');
const randomButton = document.getElementById("randomButton");
const animateButton = document.getElementById("animateButton");


//color picker
const colorPaletteButtons = document.querySelectorAll('.color-picker .palette-btn');
const patternSvg = document.getElementById('patternSvg');

colorPaletteButtons.forEach(colorBtn => {
    colorBtn.addEventListener('click', function() {
        const selectedColor = window.getComputedStyle(colorBtn).backgroundColor;
        patternSvg.style.backgroundColor = selectedColor;
    });
});

//polygon color
function getRandomColor() {
    fetch(`https://www.thecolorapi.com/random?format=json`)
        .then(response => response.json())
        .then(data => {
            console.log(`Name: ${data.name.value}`);
            console.log(`RGB: ${data.rgb.value}`);
            console.log(`HSL: ${data.hsl.value}`);
            
            const polygon = document.getElementById('dynamicPolygon');
            polygon.style.fill = data.rgb.value;
        });
}

randomButton.addEventListener("click", getRandomColor);

 function drawPolygon() {
    const sides = parseInt(document.getElementById('numSides').value);
    if (sides < 3) return;
    
    const radius = 60; 
    const centerX = 150; 
    const centerY = 100; 
    
    let points = [];
    let angle = 0;
    for (let i = 0; i < sides; i++) {
       
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        points.push(`${x},${y}`);
    }
   
  
    const polygon = document.getElementById('dynamicPolygon');
    polygon.setAttribute('points', points.join(' '));  
};

//generate polygon                               
generateButton.addEventListener("click", drawPolygon);

//animates polygon to rotate
animateButton.addEventListener("click", () => {
    const polygon = document.getElementById('dynamicPolygon');
    
    if (polygon.innerHTML.includes('animateTransform')) {
      
        polygon.innerHTML = '';
    } else {
       
        polygon.innerHTML = `
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 150 100"
                to="360 150 100"
                dur="10s"
                repeatCount="indefinite" />
        `;
    }
});

//updates local storage
function storeCurrentColor() {
    window.localStorage.setItem("color", polygon.style.fill);
}


//slider range number of sides
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

numSides.addEventListener("input", (e) => {
  const value = +e.target.value;
  const label = e.target.nextElementSibling;
  const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
  const labelWidth = getComputedStyle(label).getPropertyValue("width");
  const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
  const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left =
    value * (numWidth / max) -
    numLabelWidth / 2 +
    scale(value, min, max, 10, -10);
  label.style.left = `${left}px`;
  label.innerHTML = value;
});

