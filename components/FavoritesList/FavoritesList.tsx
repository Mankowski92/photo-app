import React, { useState, useEffect, useCallback } from "react";
import { getFavoritesPhotos } from "../../lib/photoApi";
import Image from "next/image";
import { router } from "next/client";
import { Photo } from "../../lib/types/photo";

const FavoritesList = () => {
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      const photos = await getFavoritesPhotos();
      setFavoritePhotos(photos);
    };
    fetchFavoritePhotos();
  }, [favoritePhotos]);

  const handleRemoveFromFavorites = useCallback((photoId: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites.filter((favId: number) => favId !== photoId))
    );
  }, []);

  const handleClearFavorites = useCallback(() => {
    localStorage.setItem("favorites", JSON.stringify([]));
  }, []);

  return (
    <div>
      <button onClick={() => router.back()}>Go back</button>
      <button onClick={handleClearFavorites}>Clear favorite list</button>
      <div>
        {favoritePhotos.map((photo) => (
          <div key={photo.id}>
            <h3>{photo.title != "" ? photo.title : "No title on that :("}</h3>
            <Image src={photo.url} alt={photo.title} width={500} height={500} />
            <button onClick={() => handleRemoveFromFavorites(photo.id)}>
              Remove from favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
