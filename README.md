# JSCRIPT-310-B-final-project
This web-based design tool allows users to generate a polygon with the following requirements met:


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

One or more fetch requests to a 3rd party API

This connects to a random color API to generate a fill for the polygon
No API key needed

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

Sets, updates, or changes local storage
Logs the values of each randomly generated color in the polygon

      function storeCurrentColor() {
          window.localStorage.setItem("color", polygon.style.fill);
      }


Contains form fields, validates those fields

