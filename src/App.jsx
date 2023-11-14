import { useEffect, useState } from "react";
import { AlbumsId, getSongsFromAlbum } from "./services/fetchItunes";
import "./App.css";

function App() {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    // ignores the api call if the component is unmounted
    let ignore = false;
    
    // indicates that a new api call is in progress
    setAlbum(null);

    // waits the Promise to resolve, and if ignore is "false", sets data to "album"
    getSongsFromAlbum(AlbumsId.pleasePleaseMe).then((result) => {
      if (!ignore) {
        setAlbum(result);
      }
    });

    // cleanup function: signals that the state update must be ignored
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
          <audio
            sandbox="allow-same-origin"
            controls
            src={album.results[2].previewUrl}
          ></audio>
        )}
      </div>
    </>
  );
}

export default App;