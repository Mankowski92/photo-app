import React, { useCallback, useEffect, useState } from "react";
import { getFavoritesPhotos } from "../../lib/photoApi";
import { router } from "next/client";
import { Photo } from "../../lib/types/photo";
import { Button } from "@component/styles/CommonStyles.styled";
import { FavoritesWrapper } from "./FavoritesList.styled";
import { noTitleMessage } from "@component/lib/constants";
import ResponsiveImage from "@component/components/ResponsiveImage/ResponsiveImage";

const FavoritesList = () => {
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      const photos = await getFavoritesPhotos();
      setFavoritePhotos(photos);
    };
    fetchFavoritePhotos();
  }, []);

  const handleRemoveFromFavorites = useCallback((photoId: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites.filter((favId: number) => favId !== photoId))
    );
  }, []);

  const handleClearFavorites = useCallback(() => {
    localStorage.setItem("favorites", JSON.stringify([]));
    setFavoritePhotos([]);
  }, []);

  return (
    <>
      <Button onClick={() => router.back()}>Go back</Button>
      <Button onClick={handleClearFavorites}>Clear favorite list</Button>
      <div>
        {favoritePhotos.map((photo) => (
          <FavoritesWrapper key={photo.id}>
            <h3>{photo.title != "" ? photo.title : noTitleMessage}</h3>
            <ResponsiveImage
              src={photo.url}
              alt={photo.title || noTitleMessage}
              width={photo.width}
              height={photo.height}
              bigVariant={true}
            />
            <Button onClick={() => handleRemoveFromFavorites(photo.id)}>
              Remove from favorites
            </Button>
          </FavoritesWrapper>
        ))}
      </div>
    </>
  );
};

export default FavoritesList;
