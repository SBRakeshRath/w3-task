import "./App.scss";
import AddNewMemberModal from "./components/addNewMemberModal/addNewMemberModal";
import AddPointsModal from "./components/addPointsModal/addPointsModal";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import MainComponent from "./components/main/maiin";

function App() {
  return (
    <div className="app">
      <AddNewMemberModal />
      <AddPointsModal />
      <Header />
      <MainComponent />
      <Footer />
    </div>
  );
}

export default App;
