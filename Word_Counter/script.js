function setInput() {
  var input = document.getElementById("input");

  function isWord(string) {
    var isAlphaNumeric = false;
    for (var i = 0; i < string.length; i++) {
      var code = string.charCodeAt(i);
      if (
        (code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        isAlphaNumeric = true;
        return isAlphaNumeric;
      }
    }
    return isAlphaNumeric;
  }

  function wordCounter() {
    var text = input.value.split(" ");
    var wordCount = 0;
    for (var i = 0; i < text.length; i++) {
      if (!text[i] == " " && isWord(text[i])) {
        wordCount++;
      }
    }
    return wordCount;
  }

  document.getElementById("output").innerHTML = wordCounter();
}
