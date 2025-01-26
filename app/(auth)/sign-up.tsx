import CustomButton from "@/components/customButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View, TextInput, Button } from "react-native";

const SignUp = () => {
    const [form, setform] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [pendingVerification, setPendingVerification] = useState(false);
    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: '',
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setVerification({
                ...verification,
                state: 'pending',
            })
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling

            console.error(JSON.stringify(err, null, 2))
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                //TODO: create a database user!
                await setActive({ session: signUpAttempt.createdSessionId })
                setVerification({
                    ...verification,
                    state: 'complete',
                })
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                setVerification({
                    ...verification,
                    error: 'verification failed',
                    state: 'failed',
                })
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setVerification({
                ...verification,
                error: err.errors[0].longMessage,
                state: 'failed',
            })
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (pendingVerification) {
        return (
            <>
                <Text>Verify your email</Text>
                <TextInput
                    value={verification.code}
                    placeholder="Enter your verification code"
                    onChangeText={(code) => setVerification({ ...verification, code })}
                />
                <Button title="Verify" onPress={onVerifyPress} />
            </>
        )
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[180px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[300px]" />
                    <Text className=" text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">Create Your Account</Text>
                </View>
                <View className="p-5">
                    <InputField label={"Name"}
                        placeholder="Enter your name"
                        value={form.name}
                        icon={icons.person}
                        onChangeText={
                            (value) => { setform({ ...form, name: value, }); }
                        }
                    />
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
                    <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text className="">Already have an account? </Text>
                        <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>
                
            </View>
        </ScrollView>
    )
}
export default SignUp;