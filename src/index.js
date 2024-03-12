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

/* CSS */
import './styles/app.scss';

document.addEventListener('DOMContentLoaded', function(){
    SEATS.init();
    TEMPERATURE.init();
    FANSPEED.init();
    BUTTONS.init();

    KUKSA.init([
        [PATHS.leftSeatWarmer, SEATS],
        [PATHS.rightSeatWarmer, SEATS],
        [PATHS.leftSeatTemperature, TEMPERATURE],
        [PATHS.rightSeatTemperature, TEMPERATURE],
        [PATHS.leftFanSpeed, FANSPEED],
        [PATHS.airConditioning, BUTTONS],
        [PATHS.recirculation, BUTTONS],
        [PATHS.frontDefroster, BUTTONS],
        [PATHS.rearDefroster, BUTTONS],
        [PATHS.leftAirDistribution, BUTTONS],
    ]);
});
