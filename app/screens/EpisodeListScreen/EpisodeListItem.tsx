import { FC, memo } from "react"
import { StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { ListItem } from "@/components/ListItem"
import { Text } from "@/components/Text"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import type { EpisodeItem } from "@/services/api/types"
import { colors } from "@/theme/colors"

interface EpisodeListItemProps {
  episode: EpisodeItem
}

// Rename the inner component so it doesn’t conflict
const EpisodeListItemComponent: FC<EpisodeListItemProps> = ({ episode }) => {
  const navigation = useNavigation<AppStackScreenProps<"EpisodeListScreen">["navigation"]>()

  return (
    <ListItem
      onPress={() => navigation.navigate("EpisodeScreen", { episodeId: episode.id })}
      bottomSeparator
      text={episode.name}
      textStyle={styles.episodeName}
      RightComponent={
        <View style={styles.rightContainer}>
          <Text style={styles.episodeCode}>{episode.episode}</Text>
          <Text size="xs" style={styles.airDate}>
            {episode.air_date}
          </Text>
        </View>
      }
      height={100}
    />
  )
}

const styles = StyleSheet.create({
  airDate: {
    color: colors.palette.neutral600,
  },
  episodeCode: {
    color: colors.palette.neutral600,
    fontWeight: "bold",
  },
  episodeName: {
    color: colors.palette.primary600,
    fontWeight: "bold",
    textAlign: "left",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
})

// Memoize and set displayName
export const EpisodeListItem = memo(EpisodeListItemComponent)
EpisodeListItem.displayName = "EpisodeListItem"
