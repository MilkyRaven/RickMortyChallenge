import { FC } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"

import { Screen } from "@/components/Screen"
import { useEpisodes } from "@/context/EpisodeContext"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"

export const WelcomeScreen: FC = () => {
  const { themed } = useAppTheme()
  const { episodes, totalEpisodes, loading, refreshing, loadMore, refresh } = useEpisodes()

  return (
    <Screen preset="fixed" contentContainerStyle={{ flex: 1, padding: 16 }}>
      {/* actualizar activity indicator, se ve descentrado */}
      {loading && episodes.length === 0 && <ActivityIndicator size="large" />}

      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              padding: 12,
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Text weight="bold">
              Mostrando {episodes.length} de {totalEpisodes} episodios
            </Text>
          </View>
        )}
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={refresh}
        refreshing={refreshing}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <View
            style={{ marginVertical: 8, padding: 12, backgroundColor: "#eee", borderRadius: 8 }}>
            <Text weight="bold">{item.name}</Text>
            <Text>{item.episode}</Text>
            <Text>{item.air_date}</Text>
          </View>
        )}
        ListFooterComponent={() => {
          if (episodes.length === 0) return null
          if (episodes.length >= 51) { //modificar por una variable
            return (
              <View style={{ padding: 16, alignItems: "center" }}>
                <Text text="¡Eso es todo! 😁" size="sm" color="#bababaff" />
              </View>
            )
          }
          return null
        }}
      />
    </Screen>
  )
}
