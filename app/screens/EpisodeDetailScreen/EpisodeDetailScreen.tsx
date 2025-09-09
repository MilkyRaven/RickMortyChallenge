import { useMemo } from "react"
import { View, ActivityIndicator, StyleSheet, Image, ScrollView } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { FadeInView } from "@/components/FadeInView"
import { Text } from "@/components/Text"
import { AppStackParamList } from "@/navigators/AppNavigator"
import { colors } from "@/theme/colors"
import { useCharacters } from "@/utils/episodes/useCharacters"
import { useEpisode } from "@/utils/episodes/useEpisode"

type Props = NativeStackScreenProps<AppStackParamList, "EpisodeScreen">

export const EpisodeScreen: React.FC<Props> = ({ route }) => {
  const { episodeId } = route.params
  const { episode, loading: loadingEpisode, error: episodeError } = useEpisode(episodeId)

  const characterIds = useMemo(
    () => episode?.characters?.map((url) => parseInt(url.split("/").pop() || "0")) ?? [],
    [episode],
  )
  const {
    characters,
    loading: loadingCharacters,
    error: charactersError,
  } = useCharacters(characterIds)

  if (loadingEpisode) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!episode || episodeError) {
    return (
      <View style={styles.centered}>
        <Text>Episode not found </Text>
      </View>
    )
  }

  return (
    <FadeInView>
      <View style={styles.container}>
        <Text style={styles.title}>{episode.name}</Text>
        <Text>Air date: {episode.air_date}</Text>
        <Text>Episode code: {episode.episode}</Text>
      </View>
      {loadingCharacters && <ActivityIndicator style={styles.margin} />}
      {charactersError && <Text style={styles.margin}>{charactersError}</Text>}

      {!loadingCharacters && characters.length > 0 && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.charactersContainer}>
            {characters.map((char) => (
              <View key={char.id} style={styles.characterItem}>
                <Image source={{ uri: char.image }} style={styles.characterImage} />
                <Text size="sm" style={styles.characterName}>
                  {char.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </FadeInView>
  )
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  characterImage: {
    borderRadius: 30,
    height: 100,
    width: 100,
  },
  characterItem: {
    alignItems: "center",
    marginRight: 12,
  },
  characterName: {
    marginTop: 4,
    textAlign: "center",
    width: 120,
  },
  charactersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    padding: 16,
  },
  margin: {
    marginTop: 16,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 160,
  },
  title: {
    color: colors.palette.primary600,
    fontSize: 20,
    fontWeight: "bold",
  },
})
