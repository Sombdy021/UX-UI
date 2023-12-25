"use client";
import { getFilmById } from "@/api";
import { FC, useContext, useEffect, useState } from "react";
import { MovieList } from "@/api";
import { useParams } from "next/navigation";
import { Hourglass } from "react-loader-spinner";
import { useComments } from "../../hooks/useComments";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { useRouter } from "next/router";
import cd from "../../../public/static/cd.png";
import file from "../../../public/static/file.png";
import res from "../../../public/static/res.png";
import Image from "next/image";
import { Footer } from "@/components/Footer";

const Details: FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieList>();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    name: "",
    text: "",
  });
  const id = useParams()?.id;
  const [showDownload, setShowDownlad] = useState(false);
  const { comments, updateComments, deleteComment } = useComments(id);
  const { currentTheme } = useContext(Theme);
  const router = useRouter();

  const onCommentChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSendComment = () => {
    updateComments(id, comment);
    setComment({ name: "", text: "" });
  };

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        setLoading(true);
        const response: MovieList = await getFilmById(id);
        setMovieDetails(response);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <div
      className={`pt-20 bg-movie ${
        currentTheme !== "black" ? "bg-movie_invert" : ""
      }`}
      style={{ backgroundColor: `${currentTheme == "black" ? "black" : ""}` }}>
      <Header arrowBack={true} />
      {!loading ? (
        <section className="min-h-screen flex items-center flex-col pb-20 px-4 relative">
          <Image
            src={movieDetails?.background_image}
            width={900}
            height={500}
            alt="bg"
            style={{ maxHeight: "730px", height: "730px", objectFit: "cover" }}
            className="absolute  opacity-60 w-full brightness-50 p-10"
          />
          <div className="container py-20 flex flex-col lg:flex-row items-start">
            <div>
              <div
                style={{
                  minWidth: "300px",
                  width: "100%",
                  maxWidth: "400px",
                  minHeight: "600px",
                  position: "relative",
                }}
                className="mb-5">
                <Image
                  layout="fill"
                  loading="lazy"
                  src={movieDetails?.large_cover_image || ""}
                  alt={movieDetails?.title || ""}
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    router.push(movieDetails?.url || "");
                  }}
                  className="py-4 px-6 lex items-center justify-center border text-white  font-extrabold cursor-pointer rounded-lg bg-gray-500 hover:bg-black">
                  Watch now
                </button>
                <button
                  onClick={() => {
                    setShowDownlad(true);
                  }}
                  className="py-4 px-6 flex-items-center justify-center border  font-extrabold cursor-pointer text-white rounded-lg bg-gray-500 hover:bg-black">
                  Download
                </button>
              </div>
            </div>

            <div className="flex  lg:pl-20 flex-col w-full z-index-5">
              <p className="text-white text-3xl mb-2">{movieDetails?.title}</p>
              {movieDetails?.description_full && (
                <p className="text-gray-200 text-xl mb-2">
                  {movieDetails?.description_full}
                </p>
              )}
              <p className="text-white mb-3 text-xl flex flex-wrap  items-center">
                Genres:
                {movieDetails?.genres?.map((genre, index) => (
                  <b
                    className="bg-gray-500 p-2 text-base rounded-lg ml-2 mb-3"
                    key={index}>
                    {genre}
                  </b>
                ))}
              </p>
              <p className="text-white text-xl mb-2">
                Language: {movieDetails?.language}
              </p>
              <p className="text-white text-xl mb-2">
                Rating: {movieDetails?.rating}
              </p>
              <p className="text-white text-xl mb-2">
                Runtime: {movieDetails?.runtime}
              </p>
              <div className="flex flex-col mt-5 ">
                {showDownload &&
                  movieDetails?.torrents?.map((torrent, index) => (
                    <a
                      href={torrent.url}
                      key={index}
                      className="flex border-2  bg-black p-5 bg-gray-500 text-black mb-2 rounded-md items-center border-transparent hover:bg-black">
                      <Image
                        src={res}
                        alt="res"
                        className="mr-4 invert"
                      />
                      <span className="mr-4  font-extrabold text-white">
                        {torrent.quality}
                      </span>
                      <Image
                        src={file}
                        alt="file"
                        className="mr-4 invert"
                      />
                      <span className="mr-4  font-extrabold text-white">
                        {torrent.size}
                      </span>
                      <Image
                        src={cd}
                        alt="cd"
                        className="invert"
                      />
                      <span className=" font-extrabold text-white">
                        {torrent.type}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="container flex flex-col flex items-center flex-col w-full">
            <p
              className="text-3xl  mb-5"
              style={{
                color: `${currentTheme == "black" ? "white" : "black"}`,
              }}>
              Comments
            </p>
            <p
              className="text-white mb-4"
              style={{
                color: `${currentTheme == "black" ? "white" : "black"}`,
              }}>
              Name
            </p>
            <input
              name="name"
              onChange={onCommentChange}
              style={{
                color: `${currentTheme == "black" ? "white" : "black"}`,
              }}
              value={comment.name}
              type="text"
              className="w-full bg-transparent border-2 p-2 mb-5 rounded-lg text-white"
            />
            <p
              className="text-white mb-4"
              style={{
                color: `${currentTheme == "black" ? "white" : "black"}`,
              }}>
              Comment
            </p>
            <textarea
              value={comment.text}
              onChange={onCommentChange}
              style={{
                color: `${currentTheme == "black" ? "white" : "black"}`,
              }}
              name="text"
              className=" bg-transparent border-2 p-2 rounded-lg text-white w-full"
            />
            <button
              onClick={onSendComment}
              className=" border rounded-lg p-3 bg-none ml-auto mt-4"
              style={{
                color: `${currentTheme == "black" ? "white" : "black"}`,
                borderColor: `${currentTheme == "black" ? "white" : "black"}`,
              }}>
              Send
            </button>
            <div className="flex flex-col mt-10 w-full">
              {comments &&
                comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col border bg-gray-500 w-full p-5 text-white rounded-md mb-3">
                    <p className="text-xl extrabold mb-2">{comment.name}</p>
                    <p className="text-gray-200">{comment.text}</p>
                    <button
                      onClick={() => deleteComment(comment)}
                      className="ml-auto font-extrabold hover:text-rose-200">
                      DELETE
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Hourglass
            height="80"
            width="80"
            radius="9"
            color="#4d50bf"
            ariaLabel="loading"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Details;
