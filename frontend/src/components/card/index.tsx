import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface Props {
    fileName: string,
    fileType: string,
    fileSize: string,
    onPress?: () => void,
}

const Card: React.FC<Props> = (props: Props) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={props.onPress}>
            <Text style={styles.fileName}>{props.fileName}</Text>
            <Text style={styles.fileType}>FileType: {props.fileType}</Text>
            <Text style={styles.fileSize}>FileSize: {props.fileSize}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fileSize: {
        fontSize: 14
    },
    fileType: {
        fontSize: 14
    },
    fileName: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#94D2BD',
        marginBottom: 3,
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})

export default Card;