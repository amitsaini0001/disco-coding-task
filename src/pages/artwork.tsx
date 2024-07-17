import { useDispatch } from "react-redux";
import {
  ArtworkState,
  fetchArtworkList,
} from "../store/slices/artworkSlice";
import { AppDispatch, useAppSelector } from "../store/store";

import { useCallback, useEffect, } from "react";
import { Link } from "react-router-dom";

function Artwork() {
  const dispatch = useDispatch<AppDispatch>();

  const state = useAppSelector<ArtworkState>((state) => state.artworks);

  useEffect(() => {
    if (state.status !== "LOADING" && state.data.length === 0) {
      dispatch(fetchArtworkList({ next_url: state.pagination.next_url }));
    }
  }, []);

  const { pagination } = state;

  const hasMore = pagination.current_page < pagination.total_pages;

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 &&
      state.status === "SUCCESS" &&
      hasMore
    ) {
      dispatch(fetchArtworkList({ next_url: state.pagination.next_url }));
    }
  }, [state.status]);

  // scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state]);

  return (
    <div className=" p-3 md:p-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 lg:gap-10">
        {state.data.length > 0 &&
          state.data
            .filter((item) => item.image_id)
            .map((item) => (
                
              <div key={`relative${item.id}-${item.image_id ?? "-imageid-"}-image`} className="relative animate-fade delay-[2000ms]">
                <Link to={`/artwork/${item.id}`}>
                <img
                  className="w-full h-full rounded-lg object-cover cursor-pointer "
                  loading="lazy"
                  src={`${state.config.iiif_url}/${item.image_id}/full/843,/0/default.jpg`}
                  alt={item.thumbnail?.alt_text ?? ""}
                  onError={(e) =>
                    (e.currentTarget.src = item.thumbnail?.lqip ?? "")
                  }
                />
                </Link>
                <div className="bg-black  w-full bottom-0 absolute opacity-70 p-2 transition ease-in-out">
                    <p className="[&:not(:hover)]:truncate text-ellipsis transition ease-in-out delay-150 text-center cursor-default">{item.title ?? "Unitiled"}</p>
                </div>
              </div>
            ))}
      </div>
      <div className="flex space-x-2 justify-center items-center mt-10">
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.45s]"></div>
        <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

export default Artwork;
