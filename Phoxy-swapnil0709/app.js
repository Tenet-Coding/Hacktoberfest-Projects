// INIT--------------------------------------------------------------------------------------

const searchInput = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchName;
let page = 1;
let lastSearch = "";
// FUNCTIONS---------------------------------------------------------------------------------

async function fetchData(
  url = "https://api.pexels.com/v1/curated?per_page=18&page=1"
) {
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const receivedData = await data.json();
  receivedData.photos.forEach((pic) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
    <div class="gallery-info">
    <p>PhotoBy: ${pic.photographer} </p>
    <a href=${pic.src.original} target="_blank" > Download</a>
    </div>
    <img src=${pic.src.large}></img>
    `;
    gallery.appendChild(galleryImage);
  });
}

async function search(name = "nature") {
  gallery.innerHTML = "";
  fetchData(
    `https://api.pexels.com/v1/search?query=${name}&per_page=18&page=${page}`
  );
}

async function loadMore() {
  page++;
  if (lastSearch) {
    fetchData(
      `https://api.pexels.com/v1/search?query=${lastSearch}&per_page=18&page=${page}`
    );
  } else {
    fetchData(`https://api.pexels.com/v1/curated?per_page=18&page=${page}`);
  }
}
// EVENT LISTENERS-----------------------------------------------------------------------------------------------

searchInput.addEventListener("input", (e) => {
  searchName = e.target.value;
  lastSearch = e.target.value;
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  search(searchName);
  searchInput.value = "";
});

more.addEventListener("click", loadMore);

// FUNCTION CALLS --------------------------------------------------------------------------------------------------

fetchData();
