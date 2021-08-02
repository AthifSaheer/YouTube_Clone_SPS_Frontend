import Header from "./components/User/Header/Header";
import Sidebar from "./components/User/Sidebar/Sidebar";
import Content from "./components/User/Content/Content";

import classes from "./App.module.css";


function App() {
  return (
    <div className="app">
      <Header />
      <div className={classes.app__section}>
         <Sidebar />
         <Content />
      </div>

    </div>
  );
}

export default App;
