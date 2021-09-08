let store = {
  user: { name: "Student" },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
};

const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
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
                        <p>Mars Dashboard</p>
                    </div>
                </div>
            </header>

                <div class="wrapper-buttons">
                    <h1 class="main-title">Choose your rover</h1>		
                    <div class="button-container">${renderMenu(state)}</div>
                </div>
            </div>
            <footer>
            <footer>
        `;
  } else {
    return `
        <header>
            <div class="navbar-flex">
                <div class="logo-flex" onclick="handleHome(event)">
                    <p>Mars Dashboard</p>
                 </div>
                 <ul class="items-navbar">${renderMenuItems(state)}<ul>
            </div>
        </header>
            <div class="container-info">
                <h1 class="title">Choose your rover <span>${
                  state.get("currentRover").latest_photos[0].rover.name
                }</span></h1>		
                <div class="gallery">${renderImages(state)}</div>
            </div>
            <footer>
            <footer>
        `;
  }
};

window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS   ------------------------------------------------------

// ------------------------------------------------------  HANDLE CLICK   ------------------------------------------------------

// ------------------------------------------------------  UTILITY   ------------------------------------------------------

// ------------------------------------------------------  API CALLS   ------------------------------------------------------
