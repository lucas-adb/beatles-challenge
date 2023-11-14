import { useEffect, useState } from "react";
import { AlbumsId, getSongsFromAlbum } from "./services/fetchItunes";
import "./App.css";

function App() {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    // ignora a chamada da api caso o componente esteja desmontando
    let ignore = false;
    
    // indica que uma nova chamada da API está em andamento
    setAlbum(null);

    // espera a Promise ser resolvida e se ignore for falso, "seta" o álbum
    getSongsFromAlbum(AlbumsId.pleasePleaseMe).then((result) => {
      if (!ignore) {
        setAlbum(result);
      }
    });

    // cleanup function: sinaliza que a atualização de estado de ser ignorada
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