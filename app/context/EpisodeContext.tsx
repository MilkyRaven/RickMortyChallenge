/* eslint-disable prettier/prettier */
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"

import { api } from "@/services/api"
import type { EpisodeItem } from "@/services/api/types"

type EpisodesProviderProps = {
    children: ReactNode
}

type EpisodesContextType = {
    episodes: EpisodeItem[]
    totalEpisodes: number | null
    getEpisodeById: (id: number) => Promise<EpisodeItem | null>
    loading: boolean
    refreshing: boolean
    loadMore: () => void
    refresh: () => void
}

const EpisodesContext = createContext<EpisodesContextType | null>(null)

export const EpisodesProvider = ({ children }: EpisodesProviderProps) => {
    const [episodes, setEpisodes] = useState<EpisodeItem[]>([])
    const [totalEpisodes, setTotalEpisodes] = useState<number | null>(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const defaultPage = 1;

    const fetchEpisodes = useCallback(async (pageToLoad = 1) => {
        if (pageToLoad === 1) setRefreshing(true)
        else setLoading(true)

        const result = await api.getEpisodes(pageToLoad)
        if (result.kind === "ok") {
            setTotalEpisodes(result.totalCount)
            if (pageToLoad === 1) setEpisodes(result.episodes)
            else setEpisodes((prev) => [...prev, ...result.episodes])
            setPage(pageToLoad)
        }

        setRefreshing(false)
        setLoading(false)
    }, [])

    const loadMore = () => fetchEpisodes(page + 1)
    const refresh = () => fetchEpisodes(1)

    const getEpisodeById = useCallback(async (id: number) => {
        setLoading(true)
        try {
            const result = await api.getEpisodeById(id)
            switch (result.kind) {
                case "ok":
                    return result.episode
                case "not-found":
                    return null
                default:
                    console.warn("API returned", result.kind)
                    return null
            }
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        fetchEpisodes(defaultPage)
    }, [fetchEpisodes])
    return (
        <EpisodesContext.Provider
            value={{ episodes, totalEpisodes, getEpisodeById, loading, refreshing, loadMore, refresh }}
        >
            {children}
        </EpisodesContext.Provider>
    )
}

export const useEpisodes = () => {
    const context = useContext(EpisodesContext)
    if (!context) throw new Error("useEpisodes must be used within EpisodesProvider")
    return context
}
