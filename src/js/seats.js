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

var values = {
    leftAirDistribution: 'middle',
    leftSeatWarmer: false,
    rightSeatWarmer: false,
};

var controls = {
    leftSeatWarmer: null,
    rightSeatWarmer: null,
};

export function init() {
   controls.leftSeatWarmer = document.getElementById('LeftChair');
   controls.rightSeatWarmer = document.getElementById('RightChair');
}

export function update(path, dp) {
    var value = dp.getBool();
    switch (path) {
        case PATHS.leftSeatWarmer:
            values.leftSeatWarmer = value;
            controls.leftSeatWarmer.setAttribute('value', values.leftSeatWarmer);
            break;
        case PATHS.rightSeatWarmer:
            values.rightSeatWarmer = value;
            controls.rightSeatWarmer.setAttribute('value', values.rightSeatWarmer);
            break;
    }
}

export function left() {
    KUKSA.setBool(PATHS.leftSeatWarmer, !values.leftSeatWarmer);
}
export function right() {
    KUKSA.setBool(PATHS.rightSeatWarmer, !values.rightSeatWarmer);
}
