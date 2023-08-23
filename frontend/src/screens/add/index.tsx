import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Dimensions, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import { IpAddressContext } from '../../../App';

interface Props { }

const AddFileScreen: React.FC<Props> = (props: Props) => {
    const ipAddress = useContext(IpAddressContext)

    const onUploadPress = async () => {
        console.log('Upload Pressed')
        const imageData = await DocumentPicker.pick({
            allowMultiSelection: false,
            type: [DocumentPicker.types.images]
        })
        console.log('imageData ===>', imageData[0])
        try {
            const data = new FormData()
            data.append('image', imageData[0])
            data.append('user', ipAddress.email)
            const response = await axios.post(`http://${ipAddress.ipAddress}:3000/upload`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Response', response)

        } catch (error) {
            console.log('Error in uploading file', error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../../assets/images/upload.jpg')} style={styles.imgBackground} />
            <TouchableOpacity style={styles.uploadFiles} activeOpacity={0.6} onPress={onUploadPress}>
                <Text style={styles.uploadFilesTxt}>Upload Files</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    uploadFilesTxt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    uploadFiles: {
        padding: 13,
        backgroundColor: '#fca311',
        marginHorizontal: 13,
        borderRadius: 13,
        justifyContent: 'center',
    },
    imgBackground: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 0.6,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
})

export default AddFileScreen;