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

var paths = {
    ac: PATHS.airConditioning,
    recirculation: PATHS.recirculation,
    rear: PATHS.rearDefroster,
    front: PATHS.frontDefroster,
};

var nodes = new Map();

export function init() {
    nodes[PATHS.airConditioning] = document.getElementById('ac');
    nodes[PATHS.recirculation] = document.getElementById('recirculation');
    nodes[PATHS.frontDefroster] = document.getElementById('front');
    nodes[PATHS.rearDefroster] = document.getElementById('rear');
    nodes['up'] = document.getElementById('up');
    nodes['down'] = document.getElementById('down');
    nodes['right'] = document.getElementById('right');

    nodes.forEach(function(node, path) {
        node.setAttribute('value', false);
    });
}

export function update(path, dp) {
    if (path == PATHS.leftAirDistribution) {
        var value = dp.getString();
        if (value == 'UP') {
            nodes['up'].setAttribute('value', true);
            nodes['down'].setAttribute('value', false);
            nodes['right'].setAttribute('value', false);
        } else if (value == 'DOWN') {
            nodes['down'].setAttribute('value', true);
            nodes['up'].setAttribute('value', false);
            nodes['right'].setAttribute('value', false);

        } else if (value == 'MIDDLE') {
            nodes['right'].setAttribute('value', true);
            nodes['up'].setAttribute('value', false);
            nodes['down'].setAttribute('value', false);
        }
    } else {
        var node = nodes[path];
        var value = dp.getBool();
        node.setAttribute('value', value);
    }
}

export function toggle(node) {
    var key = node.getAttribute('key');
    if (KUKSA.isLocked(paths[key])) {
        return;
    }

    if (key == 'up') {
        KUKSA.setString(PATHS.leftAirDistribution, 'UP');
    } else if (key == 'down') {
        KUKSA.setString(PATHS.leftAirDistribution, 'DOWN');
    } else if (key == 'right') {
        KUKSA.setString(PATHS.leftAirDistribution, 'MIDDLE');
    } else {
        var value = node.getAttribute('value').toLowerCase() == 'true';
        KUKSA.setBool(paths[key], !value);
    }
}
