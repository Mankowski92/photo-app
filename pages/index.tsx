import Link from "next/link";
import PhotosList from "@component/components/photosList/PhotosList";
import React, { useEffect, useState } from "react";
import { getPhotosList, getQueryPhotos } from "../lib/photoApi";
import { Photo } from "../lib/types/photo";
import { Button, ButtonWrapper } from "@component/styles/CommonStyles.styled";

const Home = () => {
  const [page, setPage] = useState(1);
  const [searchMode, setSearchMode] = useState(false);
  const [photosPerPage, setPhotosPerPage] = useState(8);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("");

  const handleSetPhotosPerPage = (photosPerPage: number) => {
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
  }, [page, photosPerPage, searchMode]);

  const handleSearch = (page: number, photosPerPage: number, query: string) => {
    getQueryPhotos(page, photosPerPage, query).then((data: any) => {
      setSearchMode(true);
      setPhotos(data);
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch(page, photosPerPage, query);
    }
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Home</h1>
        <Link
          //TODO move inline styles
          style={{
            fontSize: "2em",
            margin: "0.67em 0",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#fff",
          }}
          href="favorites"
        >
          <Button style={{ fontSize: "2.5rem" }}>Favorites list</Button>
        </Link>
      </div>
      <div>
        <h2>Search for image</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginRight: "0.5rem", height: "25px" }}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => handleSearch(page, photosPerPage, query)}>
          Search
        </Button>
        <Button onClick={handleExitSearchMode}>
          Clear search result / back to default view
        </Button>
      </div>
      <div
        style={{
          display: searchMode ? "none" : "flex",
          justifyContent: "space-between",
          margin: "3rem 0",
        }}
      >
        <ButtonWrapper>
          <Button disabled={page === 1} onClick={() => handlePageDown()}>
            Previous
          </Button>
          <Button onClick={() => handlePageUp()}>Next</Button>
        </ButtonWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ margin: "0 1rem 0 0" }}>Photos per page:</h2>
          {/*TODO fix this ugly code*/}
          <Button
            disabled={searchMode}
            onClick={() => handleSetPhotosPerPage(8)}
          >
            8
          </Button>
          <Button
            disabled={searchMode}
            onClick={() => handleSetPhotosPerPage(12)}
          >
            12
          </Button>
          <Button
            disabled={searchMode}
            onClick={() => handleSetPhotosPerPage(16)}
          >
            16
          </Button>
          <Button
            disabled={searchMode}
            onClick={() => handleSetPhotosPerPage(20)}
          >
            20
          </Button>
          <Button
            disabled={searchMode}
            onClick={() => handleSetPhotosPerPage(24)}
          >
            24
          </Button>
        </div>
      </div>
      <PhotosList photos={photos} />
    </>
  );
};

export default Home;
