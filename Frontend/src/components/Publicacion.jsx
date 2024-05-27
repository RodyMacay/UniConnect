import { useEffect } from "react";
import { useComunity } from "../contexts/comunidadContexts";

const Publicaciones = ({ showCreatePost, toggleCreatePost}) => {
  
  

  return (
    <>
      <div className="m-7 flex justify-between ">
        <h1>Publicaciones</h1>
        <button onClick={toggleCreatePost}>Publicar</button>
      </div>
    </>
  );
};

export default Publicaciones;
