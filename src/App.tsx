import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Artwork from "./pages/artwork";
import ArtworkDetails from "./pages/artwork-details";
import { Provider } from "react-redux";
import { store } from "./store/store";


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Artwork/>}>
          <Route index={true} element={<Artwork />} />
          <Route index={false} path="artwork/:artworkID" element={<ArtworkDetails />} />
        </Route>
        <Route path="*" element={<Artwork />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
