import Header from "./components/User/Header/Header";
import Sidebar from "./components/User/Sidebar/Sidebar";
import Content from "./components/User/Content/Content";

import classes from "./App.module.css";
import Popup from "./components/User/Popup/Popup"

function App() {
  return (
    <div className="app">
      <Header />
      <div className={classes.app__section}>
         <Sidebar />
         <Content />
         {/* <Popup trigger={true} /> */}
      </div>

    </div>
  );
}

export default App;
