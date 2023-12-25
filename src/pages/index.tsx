import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { useDebounce } from "../hooks/useDebounce";
import { Footer } from "@/components/Footer";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { currentTheme } = useContext(Theme);
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getFilms(String(1), query);
      setFilms(response.movies);
      setLoading(false);
    };
    fetch();
  }, [debouncedQuery]);

  const fetchMoreData = async () => {
    setCurrentPage((prev) => prev + 1);
    const response = await getFilms(String(currentPage), query);
    if (response?.movies) {
      setFilms((prev) => [...prev, ...response.movies]);
    }
  };
  return (
    <div
      className={`pt-20 bg ${currentTheme == "black" ? "bg_invert" : ""}`}
      style={{ backgroundColor: `${currentTheme == "black" ? "black" : ""}` }}>
      <Header arrowBack={false} />

      <main className="min-h-screen flex justify-center">
        <section className="flex flex-col items-center container py-20">
          <div className="flex items-center-center w-full mb-10 flex-col">
            <h1
              className={`text-5xl  mx-auto justify-center ${
                currentTheme == "black" ? "text-white" : "text-black"
              } mb-2 font-extrabold`}>
              FILMS
            </h1>
            <input
              placeholder="type film"
              className="border px-5 py-2 border-black mx-5"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {films?.length > 0 ? (
            <InfiniteScroll
              dataLength={films.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}>
              <div className="flex flex-wrap justify-center mb-20">
                {films?.map((item: MovieList, index) => (
                  <Card
                    key={index}
                    id={item?.id}
                    filter={checked}
                    rating={String(item?.rating)}
                    genre={item?.genres[0]}
                    description={item.description_full || item.summary}
                    title={item?.title}
                    year={item?.year}
                    medium_cover_image={item.medium_cover_image}
                  />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="flex justify-center items-center min-w-full min-h-screen">
              <Hourglass
                height="300"
                width="300"
                radius="9"
                color="#4d50bf"
                ariaLabel="loading"
              />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}