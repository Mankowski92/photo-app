import PhotoListItem from "../photoListItem/PhotoListItem";
import { Container } from "./PhotosList.styled";

const PhotoList = ({ photos }: any) => {
  return (
    <Container>
      {photos &&
        photos.map((photo: any) => (
          <PhotoListItem
            key={photo.id}
            id={photo.id}
            photoUrl={photo.url}
            photoTitle={photo.title}
          />
        ))}
    </Container>
  );
};

export default PhotoList;
