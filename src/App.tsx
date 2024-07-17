import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Artwork from "./pages/artwork";
import ArtworkDetails from "./pages/artwork-details";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index={true} element={<Artwork />} />
          <Route index={false} path="artwork/:artworkID" element={<ArtworkDetails />} />
        </Route>
        <Route path="*" element={<Artwork />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
