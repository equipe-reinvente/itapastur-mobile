import {Text, View, StyleSheet, ScrollView } from 'react-native';

const containerStyle = {
    flex: 1,
    height: 93,
    width: 311,
    alignItems: 'flex-start',
};

const Comments = ({comments = [], style = containerStyle, enableScrollView = false}) => {

    const renderComments = (item) => {
        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5}} key={item['id']}>
                {enableScrollView && <Text>
                    <Text style={styles.usernameBig}>{item['user_name']} </Text>
                    <Text style={styles.textBig}>{item['text_content']} </Text>
                </Text>}
                {!enableScrollView && <Text>
                    <Text style={styles.username}>{item['user_name']} </Text>
                    <Text style={styles.text}>{item['text_content']} </Text>
                </Text>}
            </View>
        );
    };

    return (
        <View style={style}>
            {enableScrollView && 
            <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView} overScrollMode='never'>
                {comments.map(renderComments)}
            </ScrollView>
            }
            {!enableScrollView && 
            <View>
                {comments.map(renderComments)}
            </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'flex-start',
    },
    scrollView: {
        position: 'relative',
        width: '100%',
    },
    text: {
        fontSize: 12,
        marginBottom: 5
    },
    username: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    textBig: {
        fontSize: 17,
        marginBottom: 5
    },
    usernameBig: {
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default Comments;