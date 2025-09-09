export interface EpisodeItem {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}
export interface EpisodesResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: EpisodeItem[]
}

export interface CharacterItem {
  id: number
  name: string
  status: "Alive" | "Dead" | "unknown"
  species: string
  type: string
  gender: "Female" | "Male" | "Genderless" | "unknown"
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
