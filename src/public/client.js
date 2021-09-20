let store = Immutable.Map({
  user: Immutable.Map({ name: "Student" }),
  apod: "",
  rovers: Immutable.List(["curiosity", "opportunity", "spirit"]),
  currentRover: "none",
});

const root = document.getElementById("root");

const updateStore = (state, newState) => {
  store = state.merge(newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

const App = (state) => {
  if (state.get("currentRover") === "none") {
    return `
            <header>
                <div class="navbar-flex">
                    <div class="logo-flex" onclick="handleHome(event)">
                        <p>Mars</p>
                    </div>
                </div>
            </header>
            
   
                <div class="wrapper-buttons">
                    <h1 class="main-title">Choose &nbsp; your &nbsp; Mars &nbsp; Rovers</h1>		
                    <div class="button-container">${renderMenu(state)}</div>
                </div>
            </div>
            <footer>
                <div class="credits">Official &nbsp; NASA &nbsp; photos &nbsp; from &nbsp; <a href="https://images.nasa.gov/" title="Nasa">www.nasa.gov</a>
                </div>
            <footer>
        `;
  } else {
    return `
        <header>
            <div class="navbar-flex">
                <div class="logo-flex" onclick="handleHome(event)">
                    <p>Mars</p>
                 </div>
                 <ul class="items-navbar">${renderMenuItems(state)}<ul>
            </div>
        </header>
            <div class="container-info">
                <h1 class="title">Facts &nbsp; about &nbsp; <span>${
                  state.get("currentRover").latest_photos[0].rover.name
                }</span></h1>		
                <div class="gallery">${renderImages(state)}</div>
            </div>
            <footer>
            <div class="credits">Official &nbsp; NASA &nbsp; photos &nbsp; from &nbsp; <a href="https://images.nasa.gov/" title="Nasa">www.nasa.gov</a>
            </div>
                </div>
            <footer>
        `;
  }
};

window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS   ------------------------------------------------------

const renderMenu = (state) => {
  return `<ul class="flex">${renderButtonState(state)}</ul>`;
};

const renderButtonState = (state) => {
  return Array.from(state.get("rovers"))
    .map(
      (item) =>
        `<li id=${item} class="flex-item btn" onclick="handleClick(event)">
            <a ref="#"  class=""  >${capitalize(`${item}`)}</a>
        </li>`
    )
    .join("");
};

const renderMenuItems = (state) => {
  return Array.from(state.get("rovers"))
    .map(
      (item) =>
        `<li id=${item} class="" onclick="handleClick(event)">
            <a ref="#"  class=""  >${capitalize(`${item}`)}</a>
        </li>`
    )
    .join("");
};

const renderImages = (state) => {
  const base = state.get("currentRover");

  // with join method returns an array without commas
  return Array.from(base.latest_photos)
    .map(
      (item) =>
        `<div class="wrapper">
            <img src="${item.img_src}" />
            <div class="wrapper-info">
                <p><span>Image date:</span> ${item.earth_date}</p>
                <p><span>Rover:</span> ${item.rover.name}</p>
                <p><span>State of the rover:</span> ${item.rover.status}</p>
                <p><span>Launch date:</span> ${item.rover.launch_date}</p>
                <p><span>Landing date:</span> ${item.rover.landing_date}</p>
            </div>
         </div>`
    )
    .slice(0, 50)
    .join("");
};

// ------------------------------------------------------  HANDLE CLICK   ------------------------------------------------------

const handleClick = (event) => {
  const { id } = event.currentTarget;
  if (Array.from(store.get("rovers")).includes(id)) {
    getRoverImages(id, store);
  } else {
    console.log(`ups!!! is not included`);
  }
};

const handleHome = (event) => {
  const newState = store.set("currentRover", "none");
  updateStore(store, newState);
};

// ------------------------------------------------------  UTILITY   ------------------------------------------------------

const capitalize = (word) => {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};

// ------------------------------------------------------  API CALLS   ------------------------------------------------------

const getRoverImages = async (roverName, state) => {
  let { currentRover } = state;
  const response = await fetch(`http://localhost:3000/rovers/${roverName}`);
  currentRover = await response.json();

  const newState = store.set("currentRover", currentRover);
  updateStore(store, newState);
  return currentRover;
};
