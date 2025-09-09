import { FC, memo } from "react"
import { useNavigation } from "@react-navigation/native"

import { ListItem } from "@/components/ListItem"
import { Text } from "@/components/Text"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import type { EpisodeItem } from "@/services/api/types"
import { View } from "react-native"

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
            textStyle={{ textAlign: "left", fontWeight: "bold" }}
            RightComponent={
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ color: "#7e7d7dff", fontWeight: "bold" }}>
                        {episode.episode} {/* Season code */}
                    </Text>
                    <Text size="xs" style={{ color: "#7e7d7dff" }}>
                        {episode.air_date} {/* Fecha */}
                    </Text>
                </View>
            }
            height={100}
        />
    )
}

// Memoize and set displayName
export const EpisodeListItem = memo(EpisodeListItemComponent)
EpisodeListItem.displayName = "EpisodeListItem"
