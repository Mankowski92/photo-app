import React, { useState, useEffect } from "react";
import { getFavoritesPhotos } from "../../lib/photoApi";
import Image from "next/image";
import { router } from "next/client";

interface FavoritePhoto {
  id: number;
  url: string;
  title: string;
}

const FavoritesList = () => {
  const [favoritePhotos, setFavoritePhotos] = useState<FavoritePhoto[]>([]);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      const photos = await getFavoritesPhotos();
      console.log("FAVORITE PHOTOS: ", photos);
      setFavoritePhotos(photos);
    };
    fetchFavoritePhotos();
  }, []);

  return (
    <div>
      <h2>Favorite Photos COMPONENT</h2>
      <button onClick={() => router.back()}>Go back</button>
      <div>
        {favoritePhotos.map((photo, i) => (
          <div key={photo.id}>
            <h3>{photo.title != "" ? photo.title : "No title on that :("}</h3>
            <Image src={photo.url} alt={photo.title} width={500} height={500} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
