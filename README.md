# JSCRIPT-310-B-final-project
![polygon-generator](https://github.com/user-attachments/assets/367f45b4-43cb-495e-a81d-b1ba667d6b74)


This web-based design tool allows users to generate a polygon with the following requirements met:


One or more fetch requests to a 3rd party API

This connects to a random color API to generate a fill for the polygon
No API key needed

https://publicapis.io/the-color-api

         function getRandomColor() {
          fetch(`https://www.thecolorapi.com/random?format=json`)
              .then(response => response.json())
              .then(data => {
                  const colorData = {
                      name: data.name.value,
                      rgb: data.rgb.value,
                      hsl: data.hsl.value,
                      timestamp: new Date().toISOString()
                  };
                  
                  saveColorToStorage(colorData);
      
                  console.log(`Name: ${data.name.value}`);
                  console.log(`RGB: ${data.rgb.value}`);
                  console.log(`HSL: ${data.hsl.value}`);
                  
                  const polygon = document.getElementById('dynamicPolygon');
                  polygon.style.fill = data.rgb.value;
              });
      }


Sets, updates, or changes local storage
Logs the values of each randomly generated color in the polygon

     function saveColorToStorage(colorData) {
    const savedColors = JSON.parse(localStorage.getItem('colorHistory') || '[]');
    savedColors.unshift(colorData);
    localStorage.setItem('colorHistory', JSON.stringify(savedColors.slice(0, 10)));
}

Contains form fields, validates those fields

      function drawPolygon() {
          const sides = parseInt(document.getElementById('numSides').value);
           if (isNaN(sides) || sides < 3) {
              console.error('Invalid number of sides. Must be at least 3.');
              return;
          }
          rest of code....
          
One or more timing functions

Upon clicking the "Animate" button, this eventListener animates the polygon to rotate

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
