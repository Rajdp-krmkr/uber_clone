import CustomButton from "@/components/customButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter();
    const [form, setform] = useState({
        email: "",
        password: ""
    })
    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, form.email, form.password])
    
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[180px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[300px]" />
                    <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">Welcome👋</Text>
                </View>
                <View className="p-5">

                    <InputField label={"Email"}
                        placeholder="Enter your email"
                        value={form.email}
                        icon={icons.email}
                        onChangeText={
                            (value) => { setform({ ...form, email: value, }); }
                        }
                    />
                    <InputField label={"Password"}
                        placeholder="Enter your password"
                        value={form.password}
                        icon={icons.lock}
                        secureTextEntry={true}
                        onChangeText={
                            (value) => { setform({ ...form, password: value, }); }
                        }
                    />
                    <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

                    <OAuth />
                    <Link href="/sign-up" className="text-lg text-center text-general-200 mt-10">
                        <Text className="">Don't have an account? </Text>
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}
export default SignUp;