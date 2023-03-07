import Link from "next/link";
import PhotosList from "@component/components/photosList/PhotosList";
import { useEffect, useState } from "react";
import { getPhotosList, getQueryPhotos } from "../lib/photoApi";
import { Photo } from "../lib/types/photo";

const Home = () => {
  const [page, setPage] = useState(1);
  const [searchMode, setSearchMode] = useState(false);
  const [photosPerPage, setPhotosPerPage] = useState(8);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("");

  const handlePhotosPerPage = (photosPerPage: number) => {
    setPhotosPerPage(photosPerPage);
  };

  const handlePageUp = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePageDown = () => {
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    searchMode
      ? handleSearch(page, photosPerPage, query)
      : getPhotosList(page, photosPerPage).then((data: any) => {
          setPhotos(data);
        });
  }, [page, photosPerPage, query, searchMode]);

  const handleSearch = (page: number, photosPerPage: number, query: string) => {
    getQueryPhotos(page, photosPerPage, query).then((data: any) => {
      setSearchMode(true);
      setPhotos(data);
    });
  };

  const handleExitSearchMode = () => {
    setQuery("");
    setSearchMode(false);
    setPage(1);
    getPhotosList(1, photosPerPage).then((data: any) => {
      setPhotos(data);
    });
  };

  return (
    <>
      <h1>Home</h1>
      <Link href="favorites">Favorites</Link>
      <h2>Search for image</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => handleSearch(page, photosPerPage, query)}>
        Search
      </button>
      <button onClick={handleExitSearchMode}>
        Clear search result / back to default view
      </button>
      <h2>Photos per page</h2>
      <button onClick={() => handlePhotosPerPage(8)}>8</button>
      <button onClick={() => handlePhotosPerPage(12)}>12</button>
      <button onClick={() => handlePhotosPerPage(18)}>18</button>
      <button onClick={() => handlePhotosPerPage(26)}>26</button>
      <button onClick={() => handlePhotosPerPage(38)}>38</button>
      <h2>Pagination</h2>
      <button disabled={page === 1} onClick={() => handlePageDown()}>
        Previous
      </button>
      <button onClick={() => handlePageUp()}>Next</button>
      <PhotosList photos={photos} />
    </>
  );
};

export default Home;
