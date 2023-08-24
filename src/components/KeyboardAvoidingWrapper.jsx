import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
};

export default KeyboardAvoidingWrapper;
