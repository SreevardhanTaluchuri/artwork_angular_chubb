export interface ArtWork {
  id: Number;
  title: String;
  date_display: String;
  place_of_origin: String;
  description: String;
  dimensions: String;
  image_id: String;
  artist_title : String;
  dimensions_detail? : Dimensions[];
  publication_history? : String;
  exhibition_history? : String;
}

interface Dimensions{
  height_cm : Number,
  width_cm : Number
}

export interface Art{
  data : ArtWork,
  info : Info,
  config : Config
}

export interface Arts{
  data : ArtWork[],
  info : Info,
  config : Config
}

interface Info{
  license_text : String,
  license_links : String[],
  version : String,
}

interface Config{
  iiif_url : String,
  website_url : String,
}

export interface ArtWorks {
    pagination : Pagination,
    data : ArtWork[]
}

interface Pagination {
  total: Number;
  limit: Number;
  offset: Number;
  total_pages: Number;
  current_page: Number;
  next_url: String;
}
