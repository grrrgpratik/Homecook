import _EventEmitter from "EventEmitter";
import _Timer from "react-timer-mixin";

export const EventEmitter = new _EventEmitter();
export const Timer = _Timer;

export const toast = (msg, duration = 4000) =>
  EventEmitter.emit("toast", msg, duration);
