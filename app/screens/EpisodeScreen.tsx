import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useEpisodes } from '@/context/EpisodeContext'
import type { EpisodeItem } from '@/services/api/types'

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!episode) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Episode not found </Text>
            </View>
        )
    }

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{episode.name}</Text>
            <Text>Air date: {episode.air_date}</Text>
            <Text>Episode code: {episode.episode}</Text>
        </View>
    )
}
