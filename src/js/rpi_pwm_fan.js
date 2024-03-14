var client = new VAL_WEB.VALClient("https://localhost:8888");

var entry = new VAL.SubscribeEntry();
console.log('Adding subscribe entry for fan speed from custom js')
entry.setPath("Vehicle.Cabin.HVAC.Station.Row1.Driver.FanSpeed");
entry.setView(TYPES.View.CURRENT_VALUE);
entry.addFields(TYPES.Field.FIELD_PATH);
entry.addFields(TYPES.Field.FIELD_VALUE);

var request = new VAL.SubscribeRequest();
request.addEntries(entry);

var subscribe_stream = client.subscribe(request, metadata);
subscribe_stream.on('data', function(response) {
    var updates = response.getUpdatesList();
    for (var i in updates) {
        var update = updates[i];
        var entry = update.getEntry();
        var dp = entry.getValue();
        console.log("The data is " +dp);
        console.log("The type of dp is " + typeof dp);
    }
});

subscribe_stream.on('error', function(error) {
    console.log("Error code: " + error.code + " message: " + error.message); 
    // if an error happens here, the databroker will drop the subscriber, so 
    // we need to subscribe again
    subscribe();
});