import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import axios from "axios";

const accessKey = "BKfrCHbs8Xe0DH6EXeVKITP6FERPUbzqPAktJyW4mDg";

function App() {

const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const totalPages = useRef(0);

   const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setIsError(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };


  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
          params: { query, page, per_page: 12 },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });
         console.log(response.data);
        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
        totalPages.current = response.data.total_pages;
      } catch (error) {
         console.error("Помилка отримання зображень:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage message="Помилка завантаження зображень. Спробуйте пізніше." />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && page < totalPages.current && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        image={selectedImage}
      />
    </div>
  );
}




export default App
