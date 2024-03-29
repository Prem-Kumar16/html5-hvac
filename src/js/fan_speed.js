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

var value = 0;
var node = null;

export function update(path, dp) {
    var value = dp.getUint32();
    node.value = value;
    node.parentNode.getElementsByTagName('progress')[0].value = value;
    console.log("The value from fanspeed.js is " +value)
}

export function init() {
   node = document.getElementById('FanSpeed');
}

export function set(value) {
    KUKSA.setUInt32(PATHS.leftFanSpeed, value);
}
