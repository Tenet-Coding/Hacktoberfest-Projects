"use strict";

const SW = () => {
  const [mSec, setMSec] = React.useState(0);
  const [sec, setSec] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [isOn, setIsOn] = React.useState(false);
  const start = () => setIsOn(true);
  const stop = () => setIsOn(false);
  const reset = () => {
    setIsOn(false);
    setMin(0);
    setSec(0);
    setMSec(0);
  };

  React.useEffect(() => {
    let ms;
    if (isOn) {
      ms = setInterval(() => setMSec((mSec) => mSec + 1), 10);
    }
    if (mSec === 100) {
      setMSec(0);
    }

    return () => clearInterval(ms);
  }, [mSec, isOn]);

  React.useEffect(() => {
    let s;
    if (isOn) {
      s = setInterval(() => setSec((sec) => sec + 1), 1000);
    }
    if (sec === 60) {
      setSec(0);
      setMin((min) => min + 1);
    }

    return () => clearInterval(s);
  }, [sec, isOn]);

  return (
    <div className="main-div">
      <p className="digit">
        {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}:
        {mSec.toString().padStart(2, "0")}
      </p>
      <div className="button-div">
        {!isOn && (
          <button className="button" onClick={start}>
            {!mSec ? "Start" : "Resume"}
          </button>
        )}
        {isOn && (
          <button className="button yellow-btn" onClick={stop}>
            Pause
          </button>
        )}
        <button className="button green-btn" disabled={!mSec} onClick={reset}>
          reset
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <SW />
  </React.StrictMode>,
  document.getElementById("sw")
);
