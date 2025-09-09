import { FC, useCallback } from "react"
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useEpisodes } from "@/context/EpisodeContext"
import { colors } from "@/theme/colors"

import { EpisodeListItem } from "./EpisodeListItem"
// import { useAppTheme } from "@/theme/context"

export const EpisodeListScreen: FC = () => {
  const { episodes, totalEpisodes, loading, refreshing, loadMore, refresh } = useEpisodes()

  const renderItem = useCallback(
    ({ item }: { item: (typeof episodes)[0] }) => <EpisodeListItem episode={item} />,
    [],
  )
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.screenContainer}
    >
      {/* actualizar activity indicator, se ve descentrado */}
      <Text size="xl" weight="bold" style={styles.margin}>
        Rick and Morty List of Episodes
      </Text>
      {loading && episodes.length === 0 && <ActivityIndicator size="large" />}

      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text weight="bold">
              Showing {episodes.length} of {totalEpisodes} episodes
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
        renderItem={renderItem}
        ListFooterComponent={() => {
          if (episodes.length === 0) return null
          if (totalEpisodes && episodes.length >= totalEpisodes) {
            //modificar por una variable
            return (
              <View style={styles.footerContainer}>
                <Text text="That's all for now! 🩷" size="sm" />
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
    backgroundColor: colors.palette.neutral200,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  margin: {
    marginVertical: 16,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
})
