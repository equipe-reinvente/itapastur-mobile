import { View, StyleSheet } from 'react-native';
import { GetContext } from '../components/AppContext';
import { Divider } from "@react-native-material/core";
import Comments from '../components/Comments';
import SendMessageInput from '../components/SendMessageInput';
import axios from 'axios';
import { useState } from 'react';

const Chat = ({route}) => {
    const { comments, setComments, currentPlaceData } = route.params;
    const [ commentsState, setCommentsState ] = useState(comments);
    const { user, authToken } = GetContext();

    console.log(commentsState);

    const addComment = (comment) => {
        const commentObject = {"enterprise_id": currentPlaceData['id'], "user_id": user['user']['id'], "user_name": user['user']['name'], "text_content": comment, 'id': commentsState[commentsState.length - 1]['id'] + 1};
        setCommentsState([...commentsState, commentObject]);
        setComments([...commentsState, commentObject]);
        postCommentToBackend(comment);
    };

    const postCommentToBackend = async (comment) => {
        try {
        const response = await axios.post(
            'https://itapastur-api.fly.dev/comments/', {
                user_id: user['user']['id'],
                enterprise_id: currentPlaceData['id'],
                text_content: comment
            },
            {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
            }
          );
        } catch (error) {console.log(error);};
    };

    return (
        <View style={styles.container}>
            <Comments comments={commentsState} enableScrollView={true} style={styles.messages}/>
            <Divider/>
            <SendMessageInput onSend={addComment} style={styles.sendMessageInput}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        width: '100%',
    },  
    scrollView: {
        alignItems: 'center',
        width: '100%',
    },
    messages: {
        flex: 1,
        height: '90%',
        width: "100%",
        padding: 20,
        alignItems: 'flex-start',
        marginTop: 50,
    },
    sendMessageInput: {
        position: 'relative',
        height: 100,
        width: '100%',
        top: 0,
        alignItems: 'center',
        backgroundColor: '#D9D9D9'
    }
});

export default Chat;