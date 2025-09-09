/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"

import { Text } from "@/components/Text"
import { useEpisodes } from "@/context/EpisodeContext"
import type { EpisodeItem } from "@/services/api/types"

interface EpisodeScreenProps {
    episodeId: number
}

export const EpisodeScreen: React.FC<EpisodeScreenProps> = ({ episodeId }) => {
    const { getEpisodeById } = useEpisodes()
    const [episode, setEpisode] = useState<EpisodeItem | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchEpisode() {
            setLoading(true)
            const ep = await getEpisodeById(episodeId)
            setEpisode(ep)
            setLoading(false)
        }

        fetchEpisode()
    }, [episodeId, getEpisodeById])

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!episode) {
        return (
            <View style={styles.centered}>
                <Text>Episode not found </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{episode.name}</Text>
            <Text>Air date: {episode.air_date}</Text>
            <Text>Episode code: {episode.episode}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    container: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
})