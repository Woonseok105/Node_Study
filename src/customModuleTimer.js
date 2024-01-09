import events from "events";

const sec = 1

export const timer = new events.EventEmitter()

setInterval(() => {
    timer.emit('tick')
}, 1000)