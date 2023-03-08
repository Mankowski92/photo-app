import { useEffect, useState } from "react";

interface FavoriteToggleProps {
  id: number;
}

const useFavoriteToggle = (id: number) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.includes(id));
  }, [id]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorited) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((favId: number) => favId !== id))
      );
      setIsFavorited(false);
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
      setIsFavorited(true);
    }
  };
  return { isFavorited, handleFavoriteToggle };
};

export default useFavoriteToggle;
