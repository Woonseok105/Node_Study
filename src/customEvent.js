import events from "events";

const custom_object = new events.EventEmitter();

custom_object.on('call', () => {
    console.log('called events!')
})

custom_object.emit('call')