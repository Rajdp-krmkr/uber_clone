import CustomButton from "@/components/customButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
    const [form, setform] = useState({
        email: "",
        password: ""
    })
    const onSignUpPress = async () => { }
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
                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

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