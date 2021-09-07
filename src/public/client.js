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
  let { rovers, apod } = state;

  return `
        <header></header>
        <main></main>
        <footer></footer>
    `;
};

window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS   ------------------------------------------------------

// ------------------------------------------------------  HANDLE CLICK   ------------------------------------------------------

// ------------------------------------------------------  UTILITY   ------------------------------------------------------

// ------------------------------------------------------  API CALLS   ------------------------------------------------------
