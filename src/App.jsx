import { useEffect, useState } from "react";
import { AlbumsId, getSongsFromAlbum } from "./services/fetchItunes";
import "./App.css";

function App() {
  const [album, setAlbum] = useState(null);

  // useEffect(() => {
  //   getSongsFromAlbum(AlbumsId.pleasePleaseMe);
  // }, []);

  useEffect(() => {
    let ignore = false;
    setAlbum(null);
    getSongsFromAlbum(AlbumsId.pleasePleaseMe).then((result) => {
      if (!ignore) {
        setAlbum(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="title">One-Second Guessing Challenge</h1>
        <h2>The Beatles Edition</h2>

        {album && <p>{album.results[2].trackName}</p>}

        {album && (
          <iframe
            sandbox="allow-same-origin"
            src={album.results[2].previewUrl}
            width="375"
            height="30"
          ></iframe>
        )}
      </div>
    </>
  );
}

export default App;
