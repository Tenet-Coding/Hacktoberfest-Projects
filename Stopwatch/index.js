"use strict";

var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

var SW = function SW() {
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mSec = _React$useState2[0],
    setMSec = _React$useState2[1];

  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    sec = _React$useState4[0],
    setSec = _React$useState4[1];

  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    min = _React$useState6[0],
    setMin = _React$useState6[1];

  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    isOn = _React$useState8[0],
    setIsOn = _React$useState8[1];

  var start = function start() {
    return setIsOn(true);
  };
  var stop = function stop() {
    return setIsOn(false);
  };
  var reset = function reset() {
    setIsOn(false);
    setMin(0);
    setSec(0);
    setMSec(0);
  };

  React.useEffect(
    function () {
      var ms = void 0;
      if (isOn) {
        ms = setInterval(function () {
          return setMSec(function (mSec) {
            return mSec + 1;
          });
        }, 10);
      }
      if (mSec === 100) {
        setMSec(0);
      }

      return function () {
        return clearInterval(ms);
      };
    },
    [mSec, isOn]
  );

  React.useEffect(
    function () {
      var s = void 0;
      if (isOn) {
        s = setInterval(function () {
          return setSec(function (sec) {
            return sec + 1;
          });
        }, 1000);
      }
      if (sec === 60) {
        setSec(0);
        setMin(function (min) {
          return min + 1;
        });
      }

      return function () {
        return clearInterval(s);
      };
    },
    [sec, isOn]
  );

  return React.createElement(
    "div",
    { className: "main-div" },
    React.createElement(
      "p",
      { className: "digit" },
      min.toString().padStart(2, "0"),
      ":",
      sec.toString().padStart(2, "0"),
      ":",
      mSec.toString().padStart(2, "0")
    ),
    React.createElement(
      "div",
      { className: "button-div" },
      !isOn &&
        React.createElement(
          "button",
          { className: "button", onClick: start },
          !mSec ? "Start" : "Resume"
        ),
      isOn &&
        React.createElement(
          "button",
          { className: "button yellow-btn", onClick: stop },
          "Pause"
        ),
      React.createElement(
        "button",
        { className: "button green-btn", disabled: !mSec, onClick: reset },
        "reset"
      )
    )
  );
};

ReactDOM.render(
  React.createElement(React.StrictMode, null, React.createElement(SW, null)),
  document.getElementById("sw")
);
