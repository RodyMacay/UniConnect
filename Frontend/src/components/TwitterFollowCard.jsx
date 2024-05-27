/* eslint-disable react/prop-types */
import { useState } from "react";

export const TwitterFollowCard = ({ userName, initialisFollowing }) => {
    const [isFollowing , setIsFollowing] = useState(initialisFollowing);

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    const text = isFollowing ? 'Amigo': 'Añadir';
    const buttonStyle = isFollowing ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700';
    
    return (
        <article className="article">
            <header>
                {/* <img src={`https://unavatar.io/${userName}`} alt={`Avatar de ${userName}`} /> */}
                <div className="text-slate-900 text-xs">
                    <strong>{userName}</strong>
                    <span>@{userName}</span>
                </div>
                <aside className="text-slate-900">
                    <div className="space-x-4"> {/* Agregamos un espacio horizontal entre los elementos */}
                        <button
                            onClick={handleClick}
                            className={`rounded px-4 py-2 transition ${buttonStyle}`}
                        >
                            <span className="text-xs">{text}</span>
                        </button>
                        <button
                            onClick={handleClick}
                            className={`rounded px-4 py-2 transition bg-red-500 hover:bg-red-600 text-white`}
                        >
                            <span className="text-xs">Eliminar</span>
                        </button>
                    </div>
                </aside>
            </header>
        </article>
    );
}
