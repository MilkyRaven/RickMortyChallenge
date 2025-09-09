import { ApiResponse, ApisauceInstance, create } from "apisauce"

import Config from "@/config"

import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, EpisodeItem, EpisodesResponse } from "./types"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getEpisodes(
    page: number = 1,
  ): Promise<
    { kind: "ok"; episodes: EpisodeItem[]; totalCount: number | null } | GeneralApiProblem
  > {
    const response: ApiResponse<EpisodesResponse> = await this.apisauce.get(`/episode?page=${page}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const rawData = response.data
      const episodes: EpisodeItem[] = rawData?.results ?? []
      const totalCount: number | null = rawData?.info?.count ?? null
      return { kind: "ok", episodes, totalCount }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

export const api = new Api()
