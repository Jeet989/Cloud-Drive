import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IpAddressContext } from '../../../App';

interface Props { }

const LogoutScreen: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation()
    const ipAddress = useContext(IpAddressContext)
    const onLogoutPress = () => {
        console.log('Logout Pressed')
        axios.post(`http://${ipAddress.ipAddress}:3000/logout`).then((response) => {
            console.log(response.data)
            // @ts-ignore
            navigation.navigate('auth')
        }).catch((error) => {
            console.log('rerreerr ==>', error)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.logoutBttn} onPress={onLogoutPress}>
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logout: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutBttn: {
        padding: 13,
        backgroundColor: '#fca311',
        marginHorizontal: 13,
        borderRadius: 13,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
})

export default LogoutScreen;