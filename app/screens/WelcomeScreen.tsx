import { FC } from "react"
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useEpisodes } from "@/context/EpisodeContext"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
// import { useAppTheme } from "@/theme/context"

export const WelcomeScreen: FC = () => {
  const navigation = useNavigation<AppStackScreenProps<"Welcome">["navigation"]>()
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
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate("EpisodeScreen", { episodeId: item.id })}
          >
            <View style={styles.itemContainer}>
              <Text weight="bold">{item.name}</Text>
              <Text>{item.episode}</Text>
              <Text>{item.air_date}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => {
          if (episodes.length === 0) return null
          if (totalEpisodes && episodes.length >= totalEpisodes) {
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
