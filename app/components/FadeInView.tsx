import { FC, useRef, useEffect, ReactNode } from "react"
import { Animated } from "react-native"

interface FadeInViewProps {
    children: ReactNode
    duration?: number
}

export const FadeInView: FC<FadeInViewProps> = ({ children, duration = 1000 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start()
    }, [fadeAnim, duration])

    return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
}
