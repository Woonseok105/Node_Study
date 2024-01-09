import {timer} from "./customModuleTimer.js";

timer.on('tick', (time) => {
    time = new Date()
    console.log('now:' + time)
})