import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import { GenreResponseProps } from "../App";

interface SidebarInfo {
  handleClickButton: (id: number) => void
  selectedGenreId: number

}

export function SideBar({ handleClickButton, selectedGenreId}: SidebarInfo) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, [])
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
  </nav>
  )
}