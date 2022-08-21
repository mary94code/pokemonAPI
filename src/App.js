
import { HashRouter, Router, Routes, Route, NavLink } from "react-router-dom";
import Header from "./Components/Header";
import CharacterDetailed from "./Pages/CharacterDetailed";
import ComparePokemonsPage from "./Pages/ComparePokemonsPage";
import HomePage from "./Pages/HomePage";
import MyFavourites from "./Pages/MyFavouritesPage";



function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<CharacterDetailed />} />
          <Route path="/myfavourites" element={<MyFavourites />} />
          <Route path="/comparepokemons" element={<ComparePokemonsPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
