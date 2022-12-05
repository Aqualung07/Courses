const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { id: "brand" }, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Nina",
      animal: "Dog",
      breed: "Maltese",
    }),
    React.createElement(Pet, {
      name: "Teo",
      animal: "Parrot",
      breed: "You-you",
    }),
    React.createElement(Pet, {
      name: "Nuca",
      animal: "Dog",
      breed: "Maltese",
    }),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
