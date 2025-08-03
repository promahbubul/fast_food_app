import {Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const SignUp = () => {
    return (
        <View>
            <Text>SignUp</Text>
            <Button title={"Sign In"}  onPress={() => router.push('/sign-in')}  />
        </View>
    )
}
export default SignUp
const styles = StyleSheet.create({})
