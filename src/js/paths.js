/*
 * Copyright 2022 Igalia, S.L.
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

//  https://github.com/COVESA/vehicle_signal_specification/blob/master/spec/Cabin/SingleHVACStation.vspec
export const leftAirDistribution = 'Vehicle.Cabin.HVAC.Station.Row1.Driver.AirDistribution';
export const leftFanSpeed = 'Vehicle.Cabin.HVAC.Station.Row1.Driver.FanSpeed';
export const leftSeatTemperature = 'Vehicle.Cabin.Seat.Row1.DriverSide.Heating';
export const rightSeatTemperature = 'Vehicle.Cabin.Seat.Row1.PassengerSide.Heating';

// https://github.com/COVESA/vehicle_signal_specification/blob/master/spec/Cabin/SingleSeat.vspec
export const leftSeatWarmer = 'Vehicle.Cabin.Seat.Row1.DriverSide.Switch.IsWarmerEngaged';
export const rightSeatWarmer = 'Vehicle.Cabin.Seat.Row1.PassengerSide.Switch.IsWarmerEngaged';

// https://github.com/COVESA/vehicle_signal_specification/blob/master/spec/Cabin/HVAC.vspec
export const recirculation = 'Vehicle.Cabin.HVAC.IsRecirculationActive';
export const airConditioning = 'Vehicle.Cabin.HVAC.IsAirConditioningActive';
export const frontDefroster = 'Vehicle.Cabin.HVAC.IsFrontDefrosterActive';
export const rearDefroster = 'Vehicle.Cabin.HVAC.IsRearDefrosterActive';
