import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton } from "@react-native-material/core";

const containerStyle = {
    flex: 1,
    position: 'relative',
    height: 50,
    width: '100%',
};

const SendMessageInput = ({onSend = () => {}, style=containerStyle}) => {
    const [text, setText] = useState("");

    const changeTextValue = (value) => {
        setText(value);
    };

    const sendValue = () => {
        try {
            if (text.replace(" ", "").length > 0) {
                onSend(text);
                setText("");
            };
        } catch (error) {console.log(error)};
    };

    return (
        <View style={style}>
            <TextInput style={styles.input} 
            variant="outlined"
            color='gray'
            onChangeText={changeTextValue} 
            value={text}
            onSubmitEditing={sendValue}
            inputContainerStyle={{backgroundColor: 'rgba(231, 231, 231, 255)', width: "100%", marginHorizontal: 10}}
            trailing={props => (
                <IconButton icon={() => (
                    <MaterialCommunityIcons
                        name={"send"}
                        size={24}
                        color='#1DAF6E'
                        />
                    )}
                    onPress={() => {sendValue()}}
                />
            )}/>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        position: 'relative',
        backgroundColor: "#E7E7E7",
        width: 342,
        height: 50,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    sendButton: {
        position: 'absolute',
        marginRight: 0,
        left: -300,
    },
});

export default SendMessageInput;