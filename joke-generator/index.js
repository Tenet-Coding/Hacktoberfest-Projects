function handleGenerate() {
  var category = document.querySelector("input[name=typeofjoke]:checked").value;
  apiCall(category);
}

const apiCall = async (category) => {
  const url = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=single`;
  const response = await fetch(url);
  const apiData = await response.json();
  if(!apiData.error)
  {
    const joke = await apiData.joke;
    document.getElementById('the-joke').innerHTML = joke;
  }
}
