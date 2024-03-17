/*
 * Copyright 2019 Igalia, S.L.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const sense = require('trbll-sense-hat-led');
const convert = require('color-convert');

// Code for LED present in sensehat as a class
class LedSenseHat {
    _led = null;
    _range = 255; // The range for Sense HAT LED is 0-255

    constructor() {
        this._led = sense;
        this._led.clear(); // Clear the LED matrix
    }

    writeValue(value1, value2) {
        // Function to calculate color based on temperature
        const getColor = (value) => {
            let color;
            if (value < 16) {
                color = [0, 0, 255]; // Blue color for "LO"
            } else if (value > 30) {
                color = [255, 0, 0]; // Red color for "HI"
            } else {
                // Gradually change from blue to red for temperatures between 16 and 30
                const percentage = (value - 16) / (30 - 16);
                const hue = 240 - (percentage * 240); // Hue value from 240 (blue) to 0 (red)
                color = convert.hsv.rgb([hue, 100, 100]); // Convert HSV to RGB
            }
            return color;
        }

        const color1 = getColor(value1);
        const color2 = getColor(value2);
        console.log("Value 1 is " + value1)
        console.log("Value 2 is " + value2)

        // Create a 8x8 matrix
        let matrix = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (j < 4) {
                    matrix.push(color1);
                } else {
                    matrix.push(color2);
                }
            }
        }

        this._led.setPixels(matrix); // Set the color of all LEDs
    }

    shutdown() {
        this._led.clear(); // Turn off all LEDs
    }
}

var values = {
    leftTemperature: 22,
    rightTemperature: 22,
}

var lowTemperature = 15;
var hiTemperature = 30;
var temperatures = [];

var isScrolling;
var elementHeight;

var controls = {
    leftTemperatureNode: null,
    rightTemperatureNode: null,
};

const led = new LedSenseHat();

function createTemperatureElement() {
    var element = document.createElement('div');
    element.classList = ['temperature'];
    element.style.height = elementHeight+'px';
    element.style.lineHeight = elementHeight+'px';
    return element;
}

export function update(path, dp) {
    var value = dp.getInt32();
    var temperature, node;
    if (path == PATHS.rightSeatTemperature) {
        values.rightTemperature = value;
        temperature = values.rightTemperature;
        node = controls.rightTemperatureNode;
    } else {
        values.leftTemperature = value;
        temperature = values.leftTemperature;
        node = controls.leftTemperatureNode;
    }
    setSemperature(node, temperatures.indexOf(temperature));

    // Call writeValue with the current temperatures
    led.writeValue(values.leftTemperature, values.rightTemperature);
}

function setSemperature(node, index) {
    node.scrollTop = index*elementHeight;

    for( var i=0; i<node.children.length; i++) {
        node.children[i].setAttribute('enabled',false);
    }
    node.children[index].setAttribute('enabled', true);
}

export function left() {
    clearTimeout(isScrolling);

    isScrolling = setTimeout(function() {
        var index = Math.round(controls.leftTemperatureNode.scrollTop / elementHeight);
        values.leftTemperature = temperatures[index];
        KUKSA.setInt32(PATHS.leftSeatTemperature, values.leftTemperature);
    }, 100);
}

export function right() {
    clearTimeout(isScrolling);

    isScrolling = setTimeout(function() {
        var index = Math.round(controls.rightTemperatureNode.scrollTop / elementHeight);
        values.rightTemperature = temperatures[index];
        KUKSA.setInt32(PATHS.rightSeatTemperature, values.rightTemperature);
    }, 100);
}

export function init() {
    controls.leftTemperatureNode = document.getElementById('lefttemperature');
    controls.rightTemperatureNode = document.getElementById('righttemperature');
    elementHeight = controls.leftTemperatureNode.offsetHeight / 2;

    for (var i = lowTemperature; i <= hiTemperature; i++) {
        var element = createTemperatureElement();
        if (i === lowTemperature) {
            element.innerHTML = 'LO';
        } else if (i === hiTemperature) {
            element.innerHTML = 'HI';
        } else {
            element.innerHTML = i + 'º';
        }
        controls.leftTemperatureNode.appendChild(element);
        controls.rightTemperatureNode.appendChild(element.cloneNode(true));
        temperatures[temperatures.length] = i;
    }
    controls.leftTemperatureNode.appendChild(createTemperatureElement());
    controls.rightTemperatureNode.appendChild(createTemperatureElement());

    setSemperature(controls.leftTemperatureNode, temperatures.indexOf(values.leftTemperature));
    setSemperature(controls.rightTemperatureNode, temperatures.indexOf(values.rightTemperature));
}
