import { ComponentProps } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import Config from "@/config"
import { EpisodeScreen } from "@/screens/EpisodeScreen"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { useAppTheme } from "@/theme/context"

import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { Button } from "@/components/Button"

export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  EpisodeScreen: { episodeId: number }
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/** 🔥 Your screens go here */}
      <Stack.Screen
        name="EpisodeScreen"
        component={EpisodeScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> { }

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}