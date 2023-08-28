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
                <Text>
                    <Text style={styles.username}>{item['username']} </Text>
                    <Text style={styles.text}>{item['comment']} </Text>
                </Text>
            </View>
        );
    };

    return (
        <View style={style}>
            {enableScrollView && 
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
        flex: 1,
        position: 'relative',
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        marginBottom: 5
    },
    username: {
        fontSize: 12,
        fontWeight: 'bold'
    },
});

export default Comments;