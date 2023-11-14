import { useEffect } from "react";
import { AlbumsId, getSongsFromAlbum } from "./services/fetchItunes";
import "./App.css";

function App() {
  useEffect(() => {
    getSongsFromAlbum(AlbumsId.pleasePleaseMe);
  }, []);

  return (
    <>
      <div>
        <h1 className="title">One-Second Guessing Challenge</h1>
        <h2>The Beatles Edition</h2>

        <iframe
          sandbox="allow-same-origin"
          src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/be/3b/4c/be3b4c09-fdb6-f8ee-edfd-b51080e8f64b/mzaf_1609395497452904676.plus.aac.p.m4a"
          width="375"
          height="30"
        ></iframe>
      </div>
    </>
  );
}

export default App;
