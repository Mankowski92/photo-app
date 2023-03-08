import PhotoListItem from "../photoListItem/PhotoListItem";
import { Container } from "./PhotosList.styled";
import { Photo } from "../../lib/types/photo";
import React from "react";

interface PhotoListProps {
  photos: Photo[];
}

const PhotoList = ({ photos }: PhotoListProps) => {
  return (
    <Container>
      {/*{photos.length === 0 && <h1>Loading...</h1>}*/}
      {photos &&
        photos.map((photo: any) => (
          <PhotoListItem
            key={photo.id}
            id={photo.id}
            url={photo.url}
            title={photo.title}
            width={photo.width}
            height={photo.height}
          />
        ))}
    </Container>
  );
};

export default PhotoList;
