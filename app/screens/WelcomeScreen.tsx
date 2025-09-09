import { FC } from "react"
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useEpisodes } from "@/context/EpisodeContext"
// import { useAppTheme } from "@/theme/context"

export const WelcomeScreen: FC = () => {
  // const { themed } = useAppTheme()
  const { episodes, totalEpisodes, loading, refreshing, loadMore, refresh } = useEpisodes()

  return (
    <Screen preset="fixed" contentContainerStyle={styles.screenContainer}>
      {/* actualizar activity indicator, se ve descentrado */}
      {loading && episodes.length === 0 && <ActivityIndicator size="large" />}

      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
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
          <View style={styles.itemContainer}>
            <Text weight="bold">{item.name}</Text>
            <Text>{item.episode}</Text>
            <Text>{item.air_date}</Text>
          </View>
        )}
        ListFooterComponent={() => {
          if (episodes.length === 0) return null
          if (episodes.length >= 51) {
            //modificar por una variable
            return (
              <View style={styles.footerContainer}>
                <Text text="¡Eso es todo! 😁" size="sm" />
              </View>
            )
          }
          return null
        }}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: "center",
    padding: 16,
  },
  headerContainer: {
    // backgroundColor: "#fff",
    // borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    padding: 12,
  },
  itemContainer: {
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    // backgroundColor: "#eee",
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
})
