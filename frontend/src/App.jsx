import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Context from "./pages/Context";
import Target from "./pages/Target";
import RoastPage from "./pages/RoastPage";
import Upload from "./pages/UploadPage";
import Verdict from "./pages/Verdict";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/roast" element={<RoastPage />} />
        <Route path="/upload" element={<Upload></Upload>}/>
        <Route path="/target" element={<Target></Target>}/>
        <Route path='/context' element={<Context/>}/>
        <Route path='/verdict' element={<Verdict/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;