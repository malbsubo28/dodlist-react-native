import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  useColorScheme,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { titles } from '../App';
import deleteButton from '../assets/icons/deleteButton.png';
import editButton from '../assets/icons/editButton.png';
import optButton from '../assets/icons/optButton.png';
import deleteButtonSelected from '../assets/icons/deleteButtonSelected.png';
import editButtonSelected from '../assets/icons/editButtonSelected.png';
import optButtonSelected from '../assets/icons/optButtonSelected.png';

const TitleTask = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isOnInput, setOnInput] = useState(titles[props.index] === "" ? true : false);
  const [titleBefore, setTitleBefore] = useState("");
  const fontScale = Dimensions.get('window').fontScale > 1.15 ? 1.15 : Dimensions.get('window').fontScale;
  const colorTextMode = isDarkMode ? '#000505' : '#eee8d5'
  const isSelected = props.isSelected;
  const isShowOpt = props.isShowOpt;

  return (
    <View style={{
      backgroundColor: isSelected ? '#b58900' : '#93a1a1',
      height: 24 + ((fontScale * 24) - 24),
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    }}>
      {!isOnInput && <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={props.onPressTitleTask}>
          <Text style={{
            color: isSelected ? '#eee8d5' : colorTextMode,
            marginRight: 5 + ((fontScale * 5) - 5),
            marginLeft: 10 + ((fontScale * 10) - 10),
            fontWeight: '500'
          }}>{titles[props.index]}</Text>
        </TouchableOpacity>
        <View style={{
            marginLeft: 5 + ((fontScale * 5) - 5),
            marginRight: 10 + ((fontScale * 10) - 10),
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <TouchableOpacity onPress={props.onPressShowOpt}>
            <Image source={isSelected ? optButtonSelected : optButton} style={{
              height: 10 + ((fontScale * 10) - 10),
              width: 10 + ((fontScale * 10) - 10)
            }}/>
          </TouchableOpacity>
        </View>
        {isShowOpt && <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TouchableOpacity onPress={() => {
            props.onPressEdit();
            setOnInput(true);
            setTitleBefore(titles[props.index]);
          }}>
            <Image source={isSelected ? editButtonSelected : editButton} style={{
              height: 20 + ((fontScale * 20) - 20),
              width: 20 + ((fontScale * 20) - 20)
            }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressDelete}>
            <Image source={isSelected ? deleteButtonSelected : deleteButton} style={{
              height: 15 + ((fontScale * 15) - 15),
              width: 15 + ((fontScale * 15) - 15),
              marginLeft: 10 + ((fontScale * 10) - 10),
              marginRight: 10 + ((fontScale * 10) - 10)
            }}/>
          </TouchableOpacity>
        </View>}
      </View>}
      {isOnInput && <View style={{
        flexDirection: 'row',
        padding: 0,
        marginLeft: 10 + ((fontScale * 10) - 10),
        marginRight: 5 + ((fontScale * 5) - 5),
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View>
          <TextInput placeholder='Title' 
          autoFocus
          onChangeText={props.onChangeTitleInput}
          onPointerLeave={props.onPressDelete}
          onSubmitEditing={() => {
            props.onPressCreate();
            titles[props.index] === "" ? setOnInput(true) : setOnInput(false);
          }}
          placeholderTextColor={isSelected ? '#5d4900' : '#586e75'}
          maxLength={10}
          defaultValue={titleBefore}
          style={{
            color: isSelected ? '#eee8d5' : colorTextMode,
            borderWidth: 0,
            padding: 0
          }}/>
        </View>
        <TouchableOpacity onPress={() => {
          props.onPressCreate();
          isShowOpt ? setOnInput(false) : titles[props.index] === "" ? props.onPressDelete() : setOnInput(false);
        }}>
          {titleBefore === "" && <Text style={{
            color: isSelected ? '#5d4900' : '#586e75',
            marginLeft: 10 + ((fontScale * 10) - 10),
            marginRight: 5 + ((fontScale * 5) - 5),
            fontWeight: '500'
          }}>{'Create'}</Text>}
          {titleBefore != "" && <Text style={{
            color: isSelected ? '#5d4900' : '#586e75',
            marginLeft: 10 + ((fontScale * 10) - 10),
            marginRight: 5 + ((fontScale * 5) - 5),
            fontWeight: '500'
          }}>{'Save'}</Text>}
        </TouchableOpacity>
      </View>}
    </View>
  )
}

export default TitleTask;
