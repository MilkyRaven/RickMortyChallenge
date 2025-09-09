import { FC, useEffect, useState } from "react"
import { View, FlatList } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { api } from "@/services/api"
import type { EpisodeItem } from "@/services/api/types"
import { useAppTheme } from "@/theme/context"

export const WelcomeScreen: FC = () => {
  const { themed } = useAppTheme()
  const [episodes, setEpisodes] = useState<EpisodeItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await api.getEpisodes()
        if (result.kind === "ok") {
          setEpisodes(result.episodes)
        } else {
          setError("Failed to load episodes")
        }
      } catch (err) {
        console.log(err)
        setError("Error fetching episodes")
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={{ flex: 1, padding: 16 }}>
      {loading && <Text text="Loading..." />}
      {error && <Text text={error} />}

      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ marginVertical: 8, padding: 12, backgroundColor: "#eee", borderRadius: 8 }}>
            <Text weight="bold">{item.name}</Text>
            <Text>{item.episode}</Text>
            <Text>{item.air_date}</Text>
          </View>
        )}
      />
    </Screen>
  )
}
