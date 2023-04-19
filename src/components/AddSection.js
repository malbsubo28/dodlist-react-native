import React from 'react';
import {
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import checkTaskEdit from '../assets/icons/checkTaskEdit.png';
import addTask from '../assets/icons/addTask.png';

export default AddSection = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const fontScale = Dimensions.get('window').fontScale > 1 ? 1.1 : Dimensions.get('window').fontScale;

  return(
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: 10 + ((fontScale * 10) - 10),
      paddingBottom: 10 + ((fontScale * 10) - 10),
      paddingTop: 8 + ((fontScale * 8) - 8),
      maxHeight: 150 + ((fontScale * 150) - 150),
      bottom: 0
    }}>
      <View style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#000505' : '#ececed',
        borderRadius: 25,
      }}>
      <TextInput multiline scrollEnabled
        ref={props.inputRef}
        value={props.textInputVal}
        onChangeText={props.onChangeText}
        onPointerEnter={props.onPointerEnter}
        placeholder='New task' 
        placeholderTextColor='#93a1a1'
        style={{
          minHeight: 47 + ((fontScale * 47) - 47),
          fontSize: 16,
          marginHorizontal: 10 + ((fontScale * 10) - 10),
          paddingVertical:  10 + ((fontScale * 10) - 10),
          color: isDarkMode ? '#eee8d5' : '#000000'
        }}/>
      </View>
      <TouchableOpacity onPress={() => props.onPressAdd()}>
        <View style={{
          height: 47 + ((fontScale * 47) - 47),
          width: 47 + ((fontScale * 47) - 47),
          marginLeft: 7 + ((fontScale * 7) - 7),
          backgroundColor: isDarkMode ? '#000505' : '#ececed',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {!props.isOnEditTask && <Image source={addTask} style={{
            width: 20 + ((fontScale * 20) - 20),
            height: 20 + ((fontScale * 20) - 20)
          }}/>}
          {props.isOnEditTask && <Image source={checkTaskEdit} style={{
            width: 22 + ((fontScale * 20) - 22),
            height: 22 + ((fontScale * 20) - 22)
          }}/>}
        </View>
      </TouchableOpacity>
    </View>
  )
}
