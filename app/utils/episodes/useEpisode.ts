import { useState, useEffect } from "react"

import { api } from "@/services/api"
import type { EpisodeItem } from "@/services/api/types"

export const useEpisode = (id: number | null) => {
  const [episode, setEpisode] = useState<EpisodeItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchEpisode = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await api.getEpisodeById(id)
        if (result.kind === "ok") {
          setEpisode(result.episode)
        } else if (result.kind === "not-found") {
          setEpisode(null)
        } else {
          setError(`Error fetching episode: ${result.kind}`)
        }
      } catch (e) {
        setError("Network error fetching episode")
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchEpisode()
  }, [id])

  return { episode, loading, error }
}
