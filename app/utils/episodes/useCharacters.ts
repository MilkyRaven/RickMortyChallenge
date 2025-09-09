import { useState, useEffect } from "react"

import { api } from "@/services/api"
import type { CharacterItem } from "@/services/api/types"

export const useCharacters = (ids: number[] | null) => {
  const [characters, setCharacters] = useState<CharacterItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ids || ids.length === 0) return

    const fetchCharacters = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await api.getCharactersByIds(ids)
        if ("kind" in result && result.kind === "ok") {
          setCharacters(result.characters)
        } else {
          setError("Error fetching characters")
        }
      } catch (e) {
        setError("Network error fetching characters")
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [ids])

  return { characters, loading, error }
}
