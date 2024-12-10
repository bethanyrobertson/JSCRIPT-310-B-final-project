# JSCRIPT-310-B-final-project
![polygon-generator](https://github.com/user-attachments/assets/367f45b4-43cb-495e-a81d-b1ba667d6b74)


This web-based design tool allows users to generate a polygon with the following requirements met:



One or more fetch requests to a 3rd party API
<img width="158" alt="Screenshot 2024-12-09 at 7 03 15 PM" src="https://github.com/user-attachments/assets/e14d4de4-600c-48c4-a11a-e6425084610a">
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

-------------------------------------------------------------------------------------------------------      

<img width="1445" alt="Screenshot 2024-12-09 at 7 00 59 PM" src="https://github.com/user-attachments/assets/2b162855-c3ed-477a-bc37-e6375f01d4ce">

Sets, updates, or changes local storage
Logs the values of each randomly generated color in the polygon

     function saveColorToStorage(colorData) {
    const savedColors = JSON.parse(localStorage.getItem('colorHistory') || '[]');
    savedColors.unshift(colorData);
    localStorage.setItem('colorHistory', JSON.stringify(savedColors.slice(0, 10)));
}


-------------------------------------------------------------------------------------------------------

<img width="333" alt="Screenshot 2024-12-09 at 7 03 25 PM" src="https://github.com/user-attachments/assets/3b5f6788-16cf-4211-91f6-e046ce2ee2fd">

Contains form fields, validates those fields

      function drawPolygon() {
          const sides = parseInt(document.getElementById('numSides').value);
           if (isNaN(sides) || sides < 3) {
              console.error('Invalid number of sides. Must be at least 3.');
              return;
          }
          rest of code....


-------------------------------------------------------------------------------------------------------

<img width="161" alt="Screenshot 2024-12-09 at 7 03 39 PM" src="https://github.com/user-attachments/assets/355aeec1-18d5-419e-bf3f-541571425abc">
          
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

-------------------------------------------------------------------------------------------------------

<img width="976" alt="Screenshot 2024-12-09 at 7 02 57 PM" src="https://github.com/user-attachments/assets/ede0218a-a08e-4c09-ac9f-8ec5a1fc722b">


