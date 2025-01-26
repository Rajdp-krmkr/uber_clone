import { Stack } from "expo-router";
import "react-native-reanimated";
import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


// Prevent the splash screen from auto-hiding before asset loading is complete.

const Layout = () => {
    const { isSignedIn } = useAuth();
    
    if (isSignedIn) {
        return <Redirect href={'/(root)/(tabs)/home'} />
    }

    return (
        <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
    );
    // return (
    //     <Stack>
    //         <Stack.Screen name="welcome" options={{ headerShown: false }} />
    //         <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    //         <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    //     </Stack>
    // );
}
export default Layout;
