import React, { useCallback, useEffect, useState } from "react";
import { getFavoritesPhotos } from "../../lib/photoApi";
import { Photo } from "../../lib/types/photo";
import { Button } from "@component/styles/CommonStyles.styled";
import { FavoritesWrapper } from "./FavoritesList.styled";
import { noTitleMessage } from "@component/lib/constants";
import ResponsiveImage from "@component/components/ResponsiveImage/ResponsiveImage";
import { useRouter } from "next/router";

const FavoritesList = () => {
  const router = useRouter();
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);
  const [removedFromFavorites, setRemovedFromFavorites] = useState(false);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      const photos = await getFavoritesPhotos();
      setFavoritePhotos(photos);
      setRemovedFromFavorites(false);
    };
    fetchFavoritePhotos();
  }, [removedFromFavorites]);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      const photos = await getFavoritesPhotos();
      setFavoritePhotos(photos);
      setRemovedFromFavorites(false);
    };
    fetchFavoritePhotos();
  }, []);

  const handleRemoveFromFavorites = useCallback((photoId: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites.filter((favId: number) => favId !== photoId))
    );
    setRemovedFromFavorites(true);
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
        {favoritePhotos.length === 0 && <h1>Favorites list empty</h1>}
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
