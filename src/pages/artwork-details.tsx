import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../store/store";
import { ArtworkState, fetchArtworkByID } from "../store/slices/artworkSlice";
import { isNumber } from "lodash";
import { useEffect } from "react";

function ArtworkDetails() {
  const { artworkID } = useParams();
  const parseID = artworkID && parseInt(artworkID);
  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector<ArtworkState>((state) => state.artworks);
  const itemData = state.fullData[0];
  const fetchData = () => {
    if (parseID) {
      dispatch(fetchArtworkByID(parseID));
    }
  };


  // fetch on inital load
  useEffect(() => {
    if (
      state.fullDataStatus !== "LOADING" &&
      state.fullData.length === 0 &&
      isNumber(parseID)
    ) {
      fetchData();
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] p-1">
      {state.fullDataStatus === "FAILED" && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <h2 className=" font-bold text-5xl">No Data Found</h2>
          <div className="flex gap-10 text-xl mt-5">
            <a
              href={"/artworks"}
              className=" hover:scale-125 hover:font-bold cursor-pointer"
            >
              {" "}
              Go Back
            </a>
            <p
              onClick={() => {
                fetchData();
              }}
              className="hover:scale-125 hover:font-bold cursor-pointer"
            >
              Retry
            </p>
          </div>
        </div>
      )}
      {state.fullDataStatus === "LOADING" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex space-x-2 justify-center items-center mt-10">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.45s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      {state.fullDataStatus === "SUCCESS" && itemData && (
        <div className="w-full h-full object-cover animate-fade relative">
          <img
            className="w-full h-full rounded-lg object-cover"
            loading="lazy"
            src={`${state.config.iiif_url}/${itemData.image_id}/full/940,/0/default.jpg`}
            alt={itemData.thumbnail?.alt_text ?? ""}
            onError={(e) =>
              (e.currentTarget.src = itemData.thumbnail?.lqip ?? "")
            }
          />
          <div className="absolute animate-opacityFade delay-[2000ms]  bg-black opacity-70 bottom-10 right-10 min-w-52 max-w-[50%] flex flex-col justify-center p-4 rounded-lg shadow-lg">
            <span className="flex gap-2">
              <h2 className="font-bold">Title: </h2>
              <h2 className="">{itemData.title} </h2>
            </span>
            <span className="flex gap-2">
              <h2 className="font-bold">Artist: </h2>
              <h2 className="">{itemData.artist_display} </h2>
            </span>
            <span className="flex gap-2">
              <h2 className="font-bold">Origin: </h2>
              <h2 className="">{itemData.place_of_origin} </h2>
            </span>
            <span className="flex gap-2">
              <h2 className="font-bold">Inscription: </h2>
              <h2 className="">{itemData.inscriptions} </h2>
            </span>
            <span className="flex gap-2">
              <h2 className="font-bold">Inscription: </h2>
              <h2 className="">{itemData.inscriptions} </h2>
            </span>
          </div>

          <a href="/artworks">
            <div className="absolute animate-opacityFade delay-[2000ms] top-7 left-7 font-bold text bg-black p-2 rounded-lg opacity-55 hover:opacity-100">
              {`< All Images`}
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

export default ArtworkDetails;
