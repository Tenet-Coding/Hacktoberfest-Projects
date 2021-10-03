var conv = document.getElementById("convert");
var rev = document.getElementById("reverse");
var reset = document.getElementById("reset");
let count = 2;

rev.addEventListener("click", function (e) {
  count += 1;
  if (count % 2 === 0) {
    document.getElementById("heading").innerHTML = "Enter your number";
  } else {
    document.getElementById("heading").innerHTML = "Enter your roman number";
  }
});

conv.addEventListener("click", function (e) {
  if (count % 2 === 0) {
    console.log("hi");
    var deci = document.getElementById("decimal").value;
    if (/^\d+$/.test(deci)) {
      let romanNumObj = {
        i: 1,
        iv: 4,
        v: 5,
        ix: 9,
        x: 10,
        xl: 40,
        l: 50,
        xc: 90,
        c: 100,
        cd: 400,
        d: 500,
        cm: 900,
        m: 1000,
        mV: 4000,
        V: 5000,
        mX: 9000,
        X: 10000,
        XL: 40000,
        L: 50000,
        XC: 90000,
        C: 100000,
        cd: 400000,
        D: 500000,
        CM: 900000,
        M: 1000000,
      };

      let romanKeys = Object.keys(romanNumObj);
      let romanValues = Object.values(romanNumObj);

      let romanNumArr = [];

      for (let i = romanValues.length - 1; i >= 0; i--) {
        // what I did was from the bottom of the object to subtract with number
        // so greatest numbers subtract the given num
        while (deci - romanValues[i] >= 0) {
          deci = deci - romanValues[i];
          romanNumArr.push(romanKeys[i]);
          console.log(romanValues[i], romanKeys[i]);
        }
      }
      console.log(romanNumArr.join(""));
      var roman = romanNumArr.join("");
      document.getElementById("roman").value = roman;
    } else {
      alert("Please enter a valid number");
      document.getElementById("decimal").value = "";
      document.getElementById("roman").value = "";
    }
  } else {
    console.log("nope");
    if (/[i, v, x, l, c, d, m, V, X, L, C, D, M]/.test(deci)) {
      let input = document.getElementById("decimal").value;
      function changeExceptions() {
        return (input = input
          .replace("iv", "q")
          .replace("ix", "w")
          .replace("xl", "e")
          .replace("xc", "r")
          .replace("cd", "t")
          .replace("cm", "y")
          .replace("mV", "u")
          .replace("mX", "o")
          .replace("XL", "p")
          .replace("XC", "k")
          .replace("CD", "j")
          .replace("CM", "h"));
      }
      changeExceptions(input);

      let romanNumObj = {
        i: 1,
        q: 4,
        v: 5,
        w: 9,
        x: 10,
        e: 40,
        l: 50,
        r: 90,
        c: 100,
        t: 400,
        d: 500,
        y: 900,
        m: 1000,
        u: 4000,
        V: 5000,
        o: 9000,
        X: 10000,
        p: 40000,
        L: 50000,
        k: 90000,
        C: 100000,
        j: 400000,
        D: 500000,
        h: 900000,
        M: 1000000,
      };

      let romNums = [];

      for (let i = 0; i < input.length; i++) {
        romNums.push(input[i]);
      }
      console.log(romNums);

      let romanKeys = Object.keys(romanNumObj);
      let romanValues = Object.values(romanNumObj);

      let value = [];
      for (let i = 0; i < romNums.length; i++) {
        let index = romanKeys.indexOf(romNums[i]);
        value.push(romanValues[index]);
        console.log(value);
      }
      var result = 0;
      for (let i = 0; i < value.length; i++) {
        result += value[i];
      }
      console.log(result);
      document.getElementById("roman").value = result;
    } else {
      alert("Please enter a valid roman number");
      document.getElementById("decimal").value = "";
      document.getElementById("roman").value = "";
    }
  }
});

reset.addEventListener("click", function (e) {
  document.getElementById("decimal").value = "";
  document.getElementById("roman").value = "";
});
