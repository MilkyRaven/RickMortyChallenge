import { FC, memo } from "react"
import { useNavigation } from "@react-navigation/native"

import { ListItem } from "@/components/ListItem"
import { Text } from "@/components/Text"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import type { EpisodeItem } from "@/services/api/types"

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
            RightComponent={<Text>{episode.episode}</Text>}
            LeftComponent={<Text>{episode.air_date}</Text>}
            height={100}
        />
    )
}

// Memoize and set displayName
export const EpisodeListItem = memo(EpisodeListItemComponent)
EpisodeListItem.displayName = "EpisodeListItem"
