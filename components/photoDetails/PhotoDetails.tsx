import { PhotoDetailsWrapper } from "./PhotoDetails.styled";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export interface PhotoDetailsProps {
  photoId: number;
  photoUrl: string;
  photoTitle: string;
}

const PhotoDetails: React.FC<PhotoDetailsProps> = ({
  photoId,
  photoUrl,
  photoTitle,
}) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.includes(photoId));
  }, [photoId]);

  const handleFavoriteToggle = () => {
    console.log("ID DETAILS: ", photoId);
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorited) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((favId: number) => favId !== photoId))
      );
      setIsFavorited(false);
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, photoId])
      );
      setIsFavorited(true);
    }
  };

  return (
    <PhotoDetailsWrapper>
      <h1>{photoTitle != "" ? photoTitle : "No title on that :("}</h1>
      <Image src={photoUrl} alt={photoTitle} width={800} height={800} />
      <button onClick={() => router.back()}>Go back</button>
      <button onClick={handleFavoriteToggle}>
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </button>
    </PhotoDetailsWrapper>
  );
};
export default PhotoDetails;
