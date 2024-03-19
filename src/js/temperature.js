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

const sense = require('agl-sense-hat-led-v2');
const convert = require('color-convert');

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
}

function setSemperature(node, index) {
    node.scrollTop = index*elementHeight;

    for( var i=0; i<node.children.length; i++) {
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