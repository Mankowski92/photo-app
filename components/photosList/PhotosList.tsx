import PhotoListItem from "../photoListItem/PhotoListItem";
import { Container } from "./PhotosList.styled";
import { Photo } from "../../lib/types/photo";

interface PhotoListProps {
  photos: Photo[];
}

const PhotoList = ({ photos }: PhotoListProps) => {
  return (
    <Container>
      {photos &&
        photos.map((photo: any) => (
          <PhotoListItem
            key={photo.id}
            id={photo.id}
            url={photo.url}
            title={photo.title}
          />
        ))}
    </Container>
  );
};

export default PhotoList;
