                                                          
                                      /* Main section */

document.addEventListener('DOMContentLoaded', () => {
    const toolContainer = document.querySelector('.tool-container');
    const toolCards = document.querySelectorAll('.tool-card');
    const navButtons = document.querySelectorAll('.nav-btn');
    const logo = document.querySelector('.logo');
    const header = document.querySelector('.header');
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Handle scroll for header background
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    });
    
    const showTool = (toolName) => {
        clearContainer(toolContainer);
        
        setTimeout(() => {
            let tool;
            switch (toolName) {
                case 'time':
                    tool = createTimeConverter();
                    break;
                case 'volume':
                    tool = createVolumeConverter();
                    break;
                case 'temperature':
                    tool = createTemperatureConverter();
                    break;
                case 'calculator':
                    tool = createCalculator();
                    break;
                case 'funmath':
                    tool = createFunMath();
                    break;
            }
            
            if (tool) {
                toolContainer.appendChild(tool);
                fadeIn(toolContainer);
            }
        }, 300);
    };
    
    const handleToolClick = (event) => {
        const tool = event.currentTarget.dataset.tool;
        showTool(tool);
    };
    
    toolCards.forEach(card => {
        card.addEventListener('click', handleToolClick);
    });
    
    navButtons.forEach(button => {
        button.addEventListener('click', handleToolClick);
    });
    
    logo.addEventListener('click', () => {
        clearContainer(toolContainer);
    });
    
    // Handle scroll for header background
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.backgroundColor = 'var(--primary)';
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
});        

                                                    /* Contact us */
// Get the modal, contact link, and close button
const modal = document.getElementById('contact-modal');
const contactLink = document.getElementById('contact-link');
const closeModal = document.getElementById('close-modal');

// show the modal when clicking contact us
contactLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page reload
    modal.classList.add('show');
    modal.classList.remove('hidden');
});

// hide the modal when clicking the close button
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Match the CSS transition duration
});

// hide the modal when clicking outside the form
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal.click();
    }
});



                                            /* Calculator */

const createCalculator = () => {
    const calculator = document.createElement('div');
    calculator.className = 'converter calculator';
    
    const template = `
        <h2>Calculator</h2>
        <div class="calculator-display">
            <div id="equation" style="font-size: 0.8rem; color: #666;"></div>
            <div id="display" style="font-size: 1.5rem;">0</div>
        </div>
        <div class="calculator-keys">
            <button class="operator" onclick="clearCalculator()">C</button>
            <button class="operator" onclick="handleOperator('/')">/</button>
            <button class="operator" onclick="handleOperator('*')">×</button>
            <button class="operator" onclick="handleDelete()">⌫</button>
            
            <button class="number" onclick="handleNumber('7')">7</button>
            <button class="number" onclick="handleNumber('8')">8</button>
            <button class="number" onclick="handleNumber('9')">9</button>
            <button class="operator" onclick="handleOperator('-')">-</button>
            
            <button class="number" onclick="handleNumber('4')">4</button>
            <button class="number" onclick="handleNumber('5')">5</button>
            <button class="number" onclick="handleNumber('6')">6</button>
            <button class="operator" onclick="handleOperator('+')">+</button>
            
            <button class="number" onclick="handleNumber('1')">1</button>
            <button class="number" onclick="handleNumber('2')">2</button>
            <button class="number" onclick="handleNumber('3')">3</button>
            <button class="operator" onclick="calculateResult()">=</button>
            
            <button class="number" onclick="handleNumber('0')" style="grid-column: span 2;">0</button>
            <button class="number" onclick="handleNumber('.')">.</button>
        </div>
    `;
    
    calculator.innerHTML = template;
    return calculator;
};

let currentNumber = '0';
let equation = '';
let isNewNumber = true;

const updateDisplay = () => {
    document.getElementById('display').textContent = currentNumber;
    document.getElementById('equation').textContent = equation;
};

const handleNumber = (num) => {
    if (isNewNumber) {
        currentNumber = num;
        isNewNumber = false;
    } else {
        if (num === '.' && currentNumber.includes('.')) return;
        currentNumber += num;
    }
    updateDisplay();
};

const handleOperator = (op) => {
    equation = currentNumber + ' ' + op + ' ';
    isNewNumber = true;
    updateDisplay();
};

const calculateResult = () => {
    try {
        const result = eval(equation + currentNumber);
        currentNumber = formatNumber(result);
        equation = '';
        isNewNumber = true;
        updateDisplay();
    } catch (error) {
        currentNumber = 'Error';
        equation = '';
        isNewNumber = true;
        updateDisplay();
    }
};

const clearCalculator = () => {
    currentNumber = '0';
    equation = '';
    isNewNumber = true;
    updateDisplay();
};

const handleDelete = () => {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
        isNewNumber = true;
    }
    updateDisplay();
};       


                                                                            /* Time Converter */
                    
const createTimeConverter = () => {
    const converter = document.createElement('div');
    converter.className = 'converter';
    
    const template = `
        <h2>Time Converter</h2>
        <div class="input-group">
            <label for="timeValue">Value</label>
            <input type="number" id="timeValue" min="0" step="any">
        </div>
        <div class="input-group">
            <label for="fromTime">From</label>
            <select id="fromTime">
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours" selected>Hours</option>
                <option value="days">Days</option>
            </select>
        </div>
        <div class="input-group">
            <label for="toTime">To</label>
            <select id="toTime">
                <option value="seconds">Seconds</option>
                <option value="minutes" selected>Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
            </select>
        </div>
        <div id="timeResult" class="result" style="display: none;"></div>
    `;
    
    converter.innerHTML = template;
    
    const handleTimeConversion = () => {
        const value = document.getElementById('timeValue').value;
        const fromUnit = document.getElementById('fromTime').value;
        const toUnit = document.getElementById('toTime').value;
        const resultDiv = document.getElementById('timeResult');
        
        if (!value) {
            resultDiv.style.display = 'none';
            return;
        }
        
        const conversions = {
            seconds: 1,
            minutes: 60,
            hours: 3600,
            days: 86400
        };
        
        const result = (value * conversions[fromUnit]) / conversions[toUnit];
        resultDiv.textContent = `${value} ${fromUnit} = ${formatNumber(result)} ${toUnit}`;
        resultDiv.style.display = 'block';
    };
    
    converter.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', handleTimeConversion);
    });
    
    return converter;
};

                                            
                                                                                /* Volume Converter */


const createVolumeConverter = () => {
    const converter = document.createElement('div');
    converter.className = 'converter';
    
    const template = `
        <h2>Volume Converter</h2>
        <div class="input-group">
            <label for="volumeValue">Value</label>
            <input type="number" id="volumeValue" min="0" step="any">
        </div>
        <div class="input-group">
            <label for="fromVolume">From</label>
            <select id="fromVolume">
                <option value="milliliters">Milliliters</option>
                <option value="liters" selected>Liters</option>
                <option value="gallons">Gallons</option>
                <option value="cups">Cups</option>
            </select>
        </div>
        <div class="input-group">
            <label for="toVolume">To</label>
            <select id="toVolume">
                <option value="milliliters">Milliliters</option>
                <option value="liters">Liters</option>
                <option value="gallons" selected>Gallons</option>
                <option value="cups">Cups</option>
            </select>
        </div>
        <div id="volumeResult" class="result" style="display: none;"></div>
    `;
    
    converter.innerHTML = template;
    
    const handleVolumeConversion = () => {
        const value = document.getElementById('volumeValue').value;
        const fromUnit = document.getElementById('fromVolume').value;
        const toUnit = document.getElementById('toVolume').value;
        const resultDiv = document.getElementById('volumeResult');
        
        if (!value) {
            resultDiv.style.display = 'none';
            return;
        }
        
        const toMilliliters = {
            milliliters: 1,
            liters: 1000,
            gallons: 3785.41,
            cups: 236.588
        };
        
        const fromMilliliters = {
            milliliters: 1,
            liters: 1/1000,
            gallons: 1/3785.41,
            cups: 1/236.588
        };
        
        const result = value * toMilliliters[fromUnit] * fromMilliliters[toUnit];
        resultDiv.textContent = `${value} ${fromUnit} = ${formatNumber(result)} ${toUnit}`;
        resultDiv.style.display = 'block';
    };
    
    converter.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', handleVolumeConversion);
    });
    
    return converter;
};

 
                                           /* utilities or functions */
const fadeIn = (element) => {
    element.classList.add('active');
};

const fadeOut = (element) => {
    element.classList.remove('active');
};

const formatNumber = (number) => {
    return parseFloat(number.toFixed(2)).toString();
};

const clearContainer = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};


                                           /* Temperature converter */
                                                
const createTemperatureConverter = () => {
    const converter = document.createElement('div');
    converter.className = 'converter';
    
    const template = `
        <h2>Temperature Converter</h2>
        <div class="input-group">
            <label for="tempValue">Value</label>
            <input type="number" id="tempValue" step="any">
        </div>
        <div class="input-group">
            <label for="fromTemp">From</label>
            <select id="fromTemp">
                <option value="celsius" selected>Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            </select>
        </div>
        <div class="input-group">
            <label for="toTemp">To</label>
            <select id="toTemp">
                <option value="celsius">Celsius</option>
                <option value="fahrenheit" selected>Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            </select>
        </div>
        <div id="tempResult" class="result" style="display: none;"></div>
    `;
    
    converter.innerHTML = template;
    
    const handleTempConversion = () => {
        const value = document.getElementById('tempValue').value;
        const fromUnit = document.getElementById('fromTemp').value;
        const toUnit = document.getElementById('toTemp').value;
        const resultDiv = document.getElementById('tempResult');
        
        if (!value) {
            resultDiv.style.display = 'none';
            return;
        }
        
        let celsius = parseFloat(value);
        if (fromUnit === 'fahrenheit') {
            celsius = (celsius - 32) * (5/9);
        } else if (fromUnit === 'kelvin') {
            celsius = celsius - 273.15;
        }
        
        let result;
        if (toUnit === 'fahrenheit') {
            result = (celsius * 9/5) + 32;
        } else if (toUnit === 'kelvin') {
            result = celsius + 273.15;
        } else {
            result = celsius;
        }
        
        resultDiv.textContent = `${value}°${fromUnit.charAt(0).toUpperCase()} = ${formatNumber(result)}°${toUnit.charAt(0).toUpperCase()}`;
        resultDiv.style.display = 'block';
    };
    
    converter.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', handleTempConversion);
    });
    
    return converter;
};


                                                            /* Fun Math XD */


const createFunMath = () => {
    const funMath = document.createElement('div');
    funMath.className = 'fun-math';
    
    const template = `
        <div class="fun-math-header">
            <h2>Fun Math</h2>
        </div>
        <div class="fun-math-section">
            <h3>Life Statistics</h3>
            <div class="date-input-group">
                <label for="birthDate">Your Birth Date</label>
                <input type="date" id="birthDate">
            </div>
            <div id="lifeStats" class="stats-grid" style="display: none;"></div>
        </div>

        <div class="fun-math-section">
            <h3>How long have you been with your partner? \u2764 </h3>
            <div class="date-input-group">
                <label for="startDate">Relationship Start Date</label>
                <input type="date" id="startDate">
            </div>
            <div id="relationshipStats" class="stats-grid" style="display: none;"></div>
        </div>


    `;
    
    funMath.innerHTML = template;
    
    // Function for calculating life stats
    const calculateLifeStats = () => {
        const birthDate = new Date(document.getElementById('birthDate').value);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - birthDate.getTime());
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const stats = {
            days,
            weeks: Math.floor(days / 7),
            months: Math.floor(days / 30.44),
            years: Math.floor(days / 365.25)
        };
        
        const statsDiv = document.getElementById('lifeStats');
        statsDiv.innerHTML = `
            <div class="stat-card">
                <span class="stat-value">${stats.days}</span>
                <span class="stat-label">days</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.weeks}</span>
                <span class="stat-label">weeks</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.months}</span>
                <span class="stat-label">months</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.years}</span>
                <span class="stat-label">years</span>
            </div>
        `;
        statsDiv.style.display = 'grid';
    };

    // Function for calculating relationship duration
    const calculateRelationshipDuration = () => {
        const startDate = new Date(document.getElementById('startDate').value);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - startDate.getTime());
        
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30.44);
        const years = Math.floor(days / 365.25);
        
        const remainingMonths = months % 12;
        const remainingDays = Math.floor(days % 30.44);
        
        const statsDiv = document.getElementById('relationshipStats');
        statsDiv.innerHTML = `
            <div class="stat-card">
                <span class="stat-value">${years}</span>
                <span class="stat-label">years</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${remainingMonths}</span>
                <span class="stat-label">months</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${remainingDays}</span>
                <span class="stat-label">days</span>
            </div>
        `;
        statsDiv.style.display = 'grid';
    };



    // Event listeners for the inputs and button
    funMath.querySelector('#birthDate').addEventListener('input', calculateLifeStats);
    funMath.querySelector('#startDate').addEventListener('input', calculateRelationshipDuration);
    
    
    return funMath;
};




// cursor hehe // 

