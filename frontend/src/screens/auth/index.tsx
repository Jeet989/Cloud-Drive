import 'react-native-url-polyfill'
import 'react-native-get-random-values'
import React, { useContext, useState } from 'react';
// import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
const AWS = require('aws-sdk');
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert, Dimensions, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IpAddressContext } from '../../../App';

interface Props { }

AWS.config.update({
    region: 'us-east-1',
    credentials: {
        accessKeyId: '---------',
        secretAccessKey: '---------'
    }
})

// create a context and store the IpAddress in it and use it in the home screen


const AuthScreen: React.FC<Props> = (props: Props) => {
    const [tempEmail, setTempEmail] = React.useState<string>('')
    const navigation = useNavigation()
    const { email, setEmail, setIpAddress } = useContext(IpAddressContext)

    const handleNextPage = async () => {
        const secretsManagers = new AWS.SecretsManager()
        secretsManagers.getSecretValue({
            SecretId: '/cloudy/ec2-instance-public-ip'
        }, (err: any, data: any) => {
            if (err) console.log('erroo ==>', err)
            setIpAddress(data.SecretString)

            axios.post(`http://${data.SecretString}:3000/subscribe`, { user: email })
                .then(res => {
                    // @ts-ignore
                    navigation.navigate('home')
                })
                .catch(err => {
                    console.log('errrrrrr in catch===>', err)
                })
        })
    }

    const onBlur = () => {
        // validate email
        const regex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
        if (tempEmail.match(regex)) {
            console.log('valid email')
            setEmail(tempEmail)

        }
        else {
            console.log('invalid email')
            Platform.OS === 'android' ? Alert.alert('Invalid Email') : null
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={{ uri: 'https://images.pexels.com/photos/159519/back-to-school-paper-colored-paper-stationery-159519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.bcgImg} />

            <View style={styles.textView}>
                <Text style={styles.label}>Enter Email To Subscribe Notifications</Text>
                <TextInput
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1, marginTop: 10, fontSize: 18, paddingHorizontal: 10 }}
                    onChangeText={text => setTempEmail(text)}
                    value={tempEmail}
                    placeholder='Email'
                    onBlur={onBlur}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />

                <TouchableOpacity style={styles.signBttn} onPress={handleNextPage} >
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signBttn: {
        backgroundColor: '#fff',
        padding: 13,
        marginTop: 20
    },
    label: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 10
    },
    textView: {
        backgroundColor: '#005F73',
        padding: 13,
        marginHorizontal: 20,
        borderRadius: 13
    },
    bcgImg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 0.89,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
})

export default AuthScreen;