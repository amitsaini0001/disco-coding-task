import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { merge, find, map, unionBy } from "lodash";

export type DataLoadState = "LOADING" | "IDLE" | "FAILED" | "SUCCESS";

export interface ArtworkType {
  id: number;
  image_id?: string;
  title?: string;
  alt_image_ids?: string[] | null;
  api_model?: string | null;
  api_link?: string | null;
  is_boosted?: boolean | null;
  alt_titles?: null | null;
  thumbnail?: Thumbnail | null;
  main_reference_number?: string | null;
  has_not_been_viewed_much?: boolean | null;
  boost_rank?: number | null;
  date_start?: number | null;
  date_end?: number | null;
  date_display?: string | null;
  date_qualifier_title?: string | null;
  date_qualifier_id?: null;
  artist_display?: string | null;
  place_of_origin?: string | null;
  description?: string | null;
  short_description?: string | null;
  dimensions?: string | null;
  dimensions_detail?: DimensionsDetailEntity[] | null;
  medium_display?: string | null;
  inscriptions?: string | null;
  credit_line?: string | null;
  catalogue_display?: string | null;
  publication_history?: string | null;
  exhibition_history?: string | null;
  provenance_text?: string | null;
  edition?: number | null;
  publishing_verification_level?: string | null;
  internal_department_id?: number | null;
  fiscal_year?: number | null;
  fiscal_year_deaccession?: number | null;
  is_public_domain?: boolean | null;
  is_zoomable?: boolean | null;
  max_zoom_window_size?: number | null;
  copyright_notice?: string | null;
  has_multimedia_resources?: boolean | null;
  has_educational_resources?: boolean | null;
  has_advanced_imaging?: boolean | null;
  colorfulness?: number | null;
  color?: Color | null;
  latitude?: number | null;
  longitude?: number | null;
  latlon?: string | null;
  is_on_view?: boolean | null;
  on_loan_display?: string | null;
  gallery_title?: string | null;
  gallery_id?: string | null;
  nomisma_id?: string | null;
  artwork_type_title?: string | null;
  artwork_type_id?: number | null;
  department_title?: string | null;
  department_id?: string | null;
  artist_id?: number | null;
  artist_title?: string | null;
  alt_artist_ids?: string[] | null;
  artist_ids?: number[] | null;
  artist_titles?: string[] | null;
  category_ids?: string[] | null;
  category_titles?: string[] | null;
  term_titles?: string[] | null;
  style_id?: string | null;
  style_title?: string | null;
  alt_style_ids?: string[] | null;
  style_ids?: string[] | null;
  style_titles?: string[] | null;
  classification_id?: string | null;
  classification_title?: string | null;
  alt_classification_ids?: string[] | null;
  classification_ids?: string[] | null;
  classification_titles?: string[] | null;
  subject_id?: string | null;
  alt_subject_ids?: string[] | null;
  subject_ids?: string[] | null;
  subject_titles?: string[] | null;
  material_id?: string | null | null;
  alt_material_ids?: string[] | null;
  material_ids?: string[] | null;
  material_titles?: string[] | null;
  technique_id?: string | null | null;
  alt_technique_ids?: string[] | null;
  technique_ids?: string[] | null;
  technique_titles?: string[] | null;
  theme_titles?: string[] | null;
  document_ids?: string[] | null;
  sound_ids?: string[] | null;
  video_ids?: string[] | null;
  text_ids?: string[] | null;
  section_ids?: string[] | null;
  section_titles?: string[] | null;
  site_ids?: string[] | null;
  suggest_autocomplete_all?: SuggestAutocompleteAllEntity[] | null;
  source_updated_at?: string | null;
  updated_at?: string | null;
  timestamp?: string | null;
  isFullyLoaded?: boolean;
}

export interface Thumbnail {
  lqip: string | null;
  width: number | null;
  height: number | null;
  alt_text: string | null;
}
export interface DimensionsDetailEntity {
  depth?: number | null;
  width?: number | null;
  height?: number | null;
  diameter?: number | null;
  clarification?: string | null;
  depth_cm?: number | null;
  depth_in?: number | null;
  width_cm?: number | null;
  width_in?: number | null;
  height_cm?: number | null;
  height_in?: number | null;
  diameter_cm?: number | null;
  diameter_in?: number | null;
}
export interface Color {
  h: number | null;
  l: number | null;
  s: number | null;
  percentage: number | null;
  population: number | null;
}
export interface SuggestAutocompleteAllEntity {
  input?: string[];
  contexts: Contexts;
  weight?: number | null;
}
export interface Contexts {
  groupings?: string[];
}
export interface PaginationType {
  current_page: number;
  limit: number;
  next_url?: string | null;
  offset: number;
  total: number;
  total_pages: number;
}

export interface Config {
  iiif_url: string;
  website_url: string;
}

export interface ArtworkState {
  data: ArtworkType[];
  fullData: ArtworkType[];
  pagination: PaginationType;
  status: DataLoadState;
  fullDataStatus: DataLoadState;
  error: string;

  config: Config;
}

export type FetchArtworkList = {
  next_url: string | undefined | null;
};

const initialState: ArtworkState = {
  data: [],
  fullData: [],
  pagination: {
    total: 0,
    offset: 0,
    total_pages: 0,
    current_page: 0,
    next_url: null,
    limit: 100,
  },
  status: "IDLE",
  fullDataStatus: "IDLE",
  error: "",
  config: {
    iiif_url: "https://www.artic.edu/iiif/2", // its only initial value, will be chnaged later
    website_url: "http://www.artic.edu",
  },
};

// encode uri to be sent via cors
const getCorsReady = (url: string) => {
  const encoded = encodeURIComponent(url);
  return `https://corsproxy.io/?${encoded}`;
};

// some issues with typoe declaration
// see : https://github.com/reduxjs/redux-toolkit/issues/3962
/**
 * @param next_url
 * @returns updates the state with the information
 */
export const fetchArtworkList: AsyncThunk<any, FetchArtworkList, any> =
  createAsyncThunk("fetchArtworkList", async ({ next_url }) => {
    const artworksUrl = `https://api.artic.edu/api/v1/artworks?limit=10&page=1&fields=id,title,image_id,alt_image_ids,thumbnail`;

    const response = await axios.get(getCorsReady(next_url ?? artworksUrl));
    return response.data;
});

/**
 * @param artworkID
 * @returns updates the state with the information
 */
export const fetchArtworkByID: AsyncThunk<any, number, any> = createAsyncThunk(
  "fetchArtworkByID",
  async (id: number) => {
    const artworksUrl = "https://api.artic.edu/api/v1/artworks";
    const response = await axios.get(getCorsReady(`${artworksUrl}/${id}`));
    return response.data;
  }
);

const artworkSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtworkList.pending, (state) => {
      state.status = "LOADING";
    });

    builder.addCase(fetchArtworkList.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.status = "FAILED";
    });

    builder.addCase(fetchArtworkList.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      const oldData = state.data;
      const newData = action.payload.data;
      // this looks tripy but in short, it deep merges 2 arrays.
      const combined = unionBy(oldData, newData, "id");
      state.data = map(combined, (obj) => {
        return merge(
          {},
          obj,
          find(oldData, { id: obj.id }),
          find(newData, { id: obj.id })
        );
      });

      state.pagination = action.payload.pagination;
      state.config = action.payload.config;
    });

    builder.addCase(fetchArtworkByID.pending, (state) => {
      state.fullDataStatus = "LOADING";
    });

    builder.addCase(fetchArtworkByID.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.fullDataStatus = "FAILED";
    });

    builder.addCase(fetchArtworkByID.fulfilled, (state, action) => {
      state.fullDataStatus = "SUCCESS";
      state.fullData = [action.payload.data];

      state.pagination = action.payload.pagination;
      state.config = action.payload.config;
    });
  },
});

export default artworkSlice.reducer;
