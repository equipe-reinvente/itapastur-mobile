import {Text, View, StyleSheet, ScrollView, Image } from 'react-native';

const containerStyle = {
    flex: 1,
    height: 93,
    width: 311,
    alignItems: 'flex-start',
};

const Comments = ({comments = [], style = containerStyle, enableScrollView = false}) => {

    const renderComments = (item) => {
        let image = item['image'];
        if (image === undefined || image === null) image = require("../images/profile_photo.png");
        else image = {uri: image};

        let commentStyle = {
            flexDirection: 'row', 
            marginBottom: 3,
            marginTop: 5,
            width: '85%',
        };

        return (
            <View style={commentStyle} key={item['id']}>
                {enableScrollView && <Image source={image} style={styles.profileThumbnail}/>}
                <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%'}}>
                    {enableScrollView && <Text style={{flexWrap: 'wrap'}}>
                        <Text style={styles.usernameBig}>{item['user_name']} </Text>
                        <Text style={styles.textBig}>{item['text_content']} </Text>
                    </Text>}
                    {!enableScrollView && <Text>
                        <Text style={styles.username}>{item['user_name']} </Text>
                        <Text style={styles.text}>{item['text_content']} </Text>
                    </Text>}
                </View>
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
        marginBottom: 5,
    },
    username: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    textBig: {
        fontSize: 17,
        marginBottom: 5,
    },
    usernameBig: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileThumbnail: {
        position: 'relative',
        height: 40,
        width: 40,
        marginRight: 10,
        borderRadius: 20,
        top: -5
    }
});

export default Comments;