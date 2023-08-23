import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Card from '../../components/card';
import axios from 'axios';
import { IpAddressContext } from '../../../App';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const ipAddress = useContext(IpAddressContext)
    console.log('ipAddress ===>', ipAddress)
    const [serverResponse, setServerResponse] = useState<any>()
    const navigation = useNavigation()

    useEffect(() => {
        if (navigation) {
            console.log('eresdsddsd')
            navigation.addListener('focus', () => {
                axios.get(`http://${ipAddress.ipAddress}:3000/get-file?user=${ipAddress.email}`)
                    .then(res => {
                        console.log('ressss ===>', res)
                        setServerResponse(res.data.files)
                    })
                    .catch(err => console.log('errrr =>>>>', err))
            })
        }
    }, [])

    const onCardPress = (item: string) => {
        Linking.openURL(item).then((res) => {
            console.log('res ===>', res)
        }).catch(err => {
            console.log('err ===>', err)
        })
    }

    const renderItem = ({ item, index }: any) => {
        console.log('item ===>', item)
        return (
            <Card
                fileName={item.name.S}
                fileSize={item.size.S}
                fileType={item.type.S}
                onPress={() => onCardPress(item.uri.S)}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={serverResponse}
                renderItem={renderItem}
                ListEmptyComponent={() => <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}><Text style={{ fontSize: 20 }}>No files found</Text></View>}
                contentContainerStyle={{ flexGrow: 1, }}
                style={{ flex: 1 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default HomeScreen;