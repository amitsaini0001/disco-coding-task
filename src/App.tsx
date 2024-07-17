import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artwork from "./pages/artwork";
import ArtworkDetails from "./pages/artwork-details";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            index={false}
            path="/"
            element={<Artwork />}
          />
          <Route
            index={false}
            path="/artwork/:artworkID"
            element={<ArtworkDetails />}
          />
          <Route
            index={false}
            path="/disco-coding-task/"
            element={<Artwork />}
          />
          <Route
            index={false}
            path="/disco-coding-task/artwork/:artworkID"
            element={<ArtworkDetails />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
