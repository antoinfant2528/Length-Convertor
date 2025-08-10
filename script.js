
        // Conversion factors to meters
        const conversions = {
            meters: 1,
            kilometers: 1000,
            miles: 1609.344,
            yards: 0.9144,
            feet: 0.3048,
            inches: 0.0254,
            centimeters: 0.01,
            millimeters: 0.001
        };

        const unitNames = {
            meters: 'Meters',
            kilometers: 'Kilometers', 
            miles: 'Miles',
            yards: 'Yards',
            feet: 'Feet',
            inches: 'Inches',
            centimeters: 'Centimeters',
            millimeters: 'Millimeters'
        };

        function convertLength() {
            const inputValue = parseFloat(document.getElementById('inputValue').value);
            const inputUnit = document.getElementById('inputUnit').value;
            const resultDiv = document.getElementById('result');

            if (isNaN(inputValue) || inputValue < 0) {
                resultDiv.innerHTML = '<p style="color: #e74c3c;">Please enter a valid positive number</p>';
                return;
            }

            // Convert input to meters first
            const valueInMeters = inputValue * conversions[inputUnit];

            // Generate all conversions
            let resultHTML = '';
            for (const unit in conversions) {
                if (unit !== inputUnit) {
                    const convertedValue = valueInMeters / conversions[unit];
                    const formattedValue = convertedValue < 1 && convertedValue > 0 ? 
                        convertedValue.toFixed(6).replace(/\.?0+$/, '') : 
                        convertedValue.toFixed(4).replace(/\.?0+$/, '');
                    
                    resultHTML += `
                        <div class="conversion-item">
                            <div class="unit-name">${unitNames[unit]}</div>
                            <div class="unit-value">${formattedValue} ${unit}</div>
                        </div>
                    `;
                }
            }

            resultDiv.innerHTML = resultHTML;
        }

        // Event listeners
        document.getElementById('convertButton').addEventListener('click', convertLength);
        
        document.getElementById('inputValue').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                convertLength();
            }
        });

        // Allow only numbers and decimal point in input
        document.getElementById('inputValue').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            // Prevent multiple decimal points
            const parts = this.value.split('.');
            if (parts.length > 2) {
                this.value = parts[0] + '.' + parts.slice(1).join('');
            }
        });
   