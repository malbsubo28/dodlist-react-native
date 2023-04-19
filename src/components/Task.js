import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { tasks } from '../App'
import trash from '../assets/icons/trash.png';
import checkBox from '../assets/icons/checkBox.png';
import checkedBox from '../assets/icons/checkedBox.png';

class checkSource {
  static checkMode=checkBox;
}

const Task = (props) => {
  const [isChecked, setChecked] = useState(props.isChecked);
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {color: isDarkMode ? '#eee8d5' : '#000000'}
  const fontScale = Dimensions.get('window').fontScale;

  isChecked ? checkSource.checkMode = checkedBox : checkSource.checkMode = checkBox;

  return(
    <View>
      {!props.isOnEditTask && <View style={{
        backgroundColor: isDarkMode ? '#000505' : '#ececed',
        padding: 10 + ((fontScale * 10) - 10),
        marginHorizontal: 16 + ((fontScale * 16) - 16),
        marginVertical: 8 + ((fontScale * 8) - 8),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5,
        shadowColor: isDarkMode ? '#586e75' : '#000000',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
          width: 5,
          height: 5
        }
      }}>
        <View>
          <TouchableOpacity onPress={() => {
            props.onPressCheck();
            setChecked(isChecked ? false : true);
            console.log(`==== did ${isChecked ? 'uncheck' : 'check'} a task with index ${props.itemIndex} ====`);
          }}>
            <Image source={checkSource.checkMode} style={{
              width: 20 + ((fontScale * 20) - 20),
              height: 20 + ((fontScale * 20) - 20),
              position: 'absolute',
              left: 0 + ((fontScale * 1) - 1),
              top: 2 + ((fontScale * 2) - 2)
            }}></Image>
          </TouchableOpacity>
          <View style={{
            marginRight: 28 + ((fontScale * 28) - 28),
            marginLeft: 28 + ((fontScale * 28) - 28),
            flex: 1
          }}>
            <TouchableOpacity onPress={props.onPressTaskText}>
              <Text style={{
                fontSize: 17,
                textDecorationLine: isChecked ? 'line-through' : 'none',
                color: isChecked ?  '#586e75' : textColor.color,
                flexWrap: 'wrap'
              }}>{tasks.find(x => x.id === props.titleIndex).parent[props.itemIndex]}</Text>
            </TouchableOpacity>
          </View>
          <Text style={{
            color : '#93a1a1',
            fontSize: 11,
            fontWeight: '350',
            marginLeft: 28 + ((fontScale * 28) - 28)
          }}>{tasks.find(x => x.id === props.titleIndex).parentTime[props.itemIndex]}</Text>
        </View>
        <View style={{
          position: 'absolute',
          right: 10 + ((fontScale * 10) - 10),
          top: 12 + ((fontScale * 12) - 12)
        }}>
          <TouchableOpacity onPress={props.onPressDelete}>
            <Image source={trash} style={{
              width: 18 + ((fontScale * 18) - 18),
              height: 18 + ((fontScale * 18) - 18)
            }}/>
          </TouchableOpacity>
        </View>
      </View>}
      {props.isOnEditTask && <View style={{
        backgroundColor: isDarkMode ? '#000505' : '#ececed',
        height: 10 + ((fontScale * 10) - 10),
        marginHorizontal: 14 + ((fontScale * 14) - 14),
        marginVertical: 7 + ((fontScale * 7) - 7),
        borderRadius: 15,
        elevation: 5,
        shadowColor: isDarkMode ? '#586e75' : '#000000',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
          width: 5,
          height: 5
        }
      }}/>}
    </View>
  );
}

export default Task;
