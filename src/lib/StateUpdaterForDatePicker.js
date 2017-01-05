import StateUpdaterBase from './StateUpdaterBase';

class StateUpdaterForDatePicker extends StateUpdaterBase {
  setHoursFrameStart() {
    const s = this.state();
    const dayPickedData = s.dayData[s.dayPicked];

    let hoursFrameStart = 0;
    if (undefined !== s.hoursFrameStart)
      hoursFrameStart = s.hoursFrameStart;
    else if (dayPickedData && dayPickedData.presentHours.length)
      hoursFrameStart = dayPickedData.presentHours[0];
    this.add({ hoursFrameStart });
  }

  setPickedHour() {
    const s = this.state();

    let hourPicked = s.hourPicked;
    if (!s.hoursFrame.find((x) => x.day === s.dayPicked && x.hour === hourPicked && !x.disabled)) {
      const entry = s.hoursFrame.find((x) => (!x.disabled && x.day === s.dayPicked)) || { hour: undefined };
      hourPicked = entry.hour;
    }
    this.add({ hourPicked });
  }

  setMinutesFrameAndIdx() {
    const qMinutesStr = ['00', '15', '30', '45'];
    const qMinutesInt = [0, 15, 30, 45];

    const s = this.state();
    const qMinuteList = ((s.dayData[s.dayPicked] || {}).presentSlots || {})[s.hourPicked] || [];
    let minutesIdxPicked = s.minutesIdxPicked;

    if (undefined === minutesIdxPicked && qMinuteList.length)
      minutesIdxPicked = qMinutesInt.indexOf(qMinuteList[0]);
    else if (!qMinuteList.length)
      minutesIdxPicked = undefined;
    this.add({
      minutesIdxPicked,
      qMinutesFrame: qMinutesInt.map((x, idx) => ({
        title: qMinutesStr[idx],
        disabled: !~qMinuteList.indexOf(x),
        current: idx === minutesIdxPicked
      }))
    });
  }
}

export default StateUpdaterForDatePicker;
