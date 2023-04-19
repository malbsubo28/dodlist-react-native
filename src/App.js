import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment';
import Task from './components/Task';
import AddSection from './components/AddSection';
import TitleTask from './components/TitleTask';

export var titles = [];
export var tasks = [];
var globalVar = {
  selectedTitleIndex: 0,
  titleCount: 0,
  newTitleIndex: 0,
  newItemIndex: 0
}

const App = () => {
  const [taskTitleCount, setTaskTitleCount] = useState(globalVar.titleCount);
  const [isTitleAvailable, setTitleAvailable] = useState(true);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(globalVar.selectedTitleIndex);
  const [isNotOnTitleInput, setNotOnTitleInput] = useState(true);
  const [scrollTitlesEnd, setScrollTitlesEnd] = useState(false);
  const [isShowTitleIndexOpt, setShowTitleIndexOpt] = useState(null);
  const [taskItemCount, setTaskItemCount] = useState(0);
  const [isItemAvailable, setItemAvailable] = useState(false);
  const [isShowAddItem, setShowAddItem] = useState(false);
  const [scrollItemsEnd, setScrollItemsEnd] = useState(false);
  const [isOnEditTask, setOnEditTask] = useState(false);
  const [addTextInputVal, setAddTextInputVal] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(0);
  const [isLoadData, setLoadData] = useState(1);
  const currentTime = moment().format('hh:mm a, MMMM Do, YYYY');
  const fontScale = Dimensions.get('window').fontScale > 1.15 ? 1.15 : Dimensions.get('window').fontScale;
  const isDarkMode = useColorScheme() === 'dark';
  const titleScrollRef = useRef();
  const itemScrollRef = useRef();
  const editTaskRef = useRef();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000505' : '#ececed'
  }

  useEffect(() => {
    if(isTitleAvailable && scrollTitlesEnd){
      titleScrollRef.current.scrollToEnd({
        x: 0, animation: true
      })
      setScrollTitlesEnd(false);
    }
    if(titles[selectedTitleIndex] === undefined){
      setShowAddItem(false)
    }else{
      setShowAddItem(true)
    }
    setTitleAvailable(taskTitleCount === 0 ? false : true);
    console.log(`===> isTitleAvailable ? ${isTitleAvailable}`);
    setShowTitleIndexOpt(null);
  }, [taskTitleCount, selectedTitleIndex, isOnEditTask])

  useEffect(() => {
    if(isItemAvailable && scrollItemsEnd){
      itemScrollRef.current.scrollToEnd({
        y:0, animation: true
      })
      setScrollItemsEnd(false);
    }
    if(tasks[selectedTitleIndex] === undefined){
      setTaskItemCount(0);
    }else{
      setTaskItemCount(tasks.find(x => x.id === selectedTitleIndex).taskCount)
    }
    setItemAvailable(taskItemCount === 0 ? false : true);
    console.log("===> isItemAvailable ?", isItemAvailable);
    setShowTitleIndexOpt(null);
  }, [taskItemCount, selectedTitleIndex, isOnEditTask])

  useEffect(() => {
    if(isTitleAvailable && scrollTitlesEnd){
      titleScrollRef.current.scrollToEnd({
        x: 0, animation: true
      })
      setScrollTitlesEnd(false);
    }
    console.log(`===> scrolled titles`)
  }, [scrollTitlesEnd], 1)

  useEffect(() => {
    if(isItemAvailable && scrollItemsEnd){
      itemScrollRef.current.scrollToEnd({
        y:0, animation: true
      })
      setScrollItemsEnd(false);
    }
    console.log(`===> scrolled items`)
  }, [scrollItemsEnd], 1)

  useEffect(() => {
    isOnEditTask ? editTaskRef.current.focus({animation: true}) : isOnEditTask;
  }, [isOnEditTask])

  const changeSelectedTitle = () => {
    let i;
    for(i=0; i<=titles.length ; i++){
      if(titles[i] != undefined){
        setSelectedTitleIndex(i);
        globalVar.selectedTitleIndex = i;
        break;
      }
    }
  }

  setData = async () => {
    if (titles.length != 0){
      try{
        console.log(`===> updating data !`);
        await AsyncStorage.setItem('@dodlist_titles', JSON.stringify(titles));
        await AsyncStorage.setItem('@dodlist_tasks', JSON.stringify(tasks));
        await AsyncStorage.setItem('@dodlist_globalVar', JSON.stringify(globalVar));
        console.log(`===> datas are saved !`);
      }catch(error){
        console.log(`===> error saving datas, ${error} !`);
      }
    }
  }

  getData = async () => {
    try{
      console.log(`===> loading data !`);
      let titlesInString = await AsyncStorage.getItem('@dodlist_titles');
      let tasksInString = await AsyncStorage.getItem('@dodlist_tasks');
      let globalVarInString = await AsyncStorage.getItem('@dodlist_globalVar');
      console.log(`===> get the datas !`)
      if(titlesInString != null){
        titles = JSON.parse(titlesInString);
        tasks = JSON.parse(tasksInString);
        globalVar = JSON.parse(globalVarInString);
        console.log(`===> datas are loaded !`);
      }
    }catch(error){
      console.log(`===> error getItem on internal storage, ${error} !`);
    }
    if(titles.length != 0){
      for(let i=0; titles.length; i++){
        if(titles[i] === ''){
          delete titles[i];
        }
      }
      setTaskTitleCount(globalVar.titleCount);
      setSelectedTitleIndex(globalVar.selectedTitleIndex);
      if(tasks.length != 0){
        setTaskItemCount(tasks.find(x => x.id === selectedTitleIndex).taskCount);
      }
    }
  }

  useEffect(() => {
    if(isLoadData === 1){
      if(getData()){
        setLoadData(0);
      }
    }
  })

  return(
    <SafeAreaView style={{backgroundColor: isDarkMode ? '#000505' : '#eee8d5', flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{
        backgroundColor: isDarkMode ? '#000505' : '#ececed',
        shadowColor: isDarkMode ? '#ececed' : '#000505'
      }}>
        <Text style={{
          marginLeft: 10 + ((fontScale * 10) - 10),
          marginTop: 10 + ((fontScale * 10) - 10),
          marginBottom: 10 + ((fontScale * 10) - 10),
          fontSize: 20,
          fontWeight: 'bold',
          color: isDarkMode ? '#eee8d5' : '#000000',
        }}>DodList</Text>
        <View style={{
          marginLeft: 10 + ((fontScale * 10) - 10),
          marginRight: 10 + ((fontScale * 10) - 10),
          marginBottom: 15 + ((fontScale * 15) - 15),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {isTitleAvailable && <ScrollView horizontal 
          showsHorizontalScrollIndicator={false}
          ref={titleScrollRef}>
            {isTitleAvailable && titles.map((title, index) => (
              <TitleTask index={index} key={index}
              title={title}
              isShowOpt={isShowTitleIndexOpt === index ? true : false}
              isSelected={globalVar.selectedTitleIndex === index ? true : false}
              onChangeTitleInput={(newTitleVal) => titles[index] = `${newTitleVal}`}
              onPressCreate={() => setNotOnTitleInput(true) & setData()}
              onPressTitleTask={() => {
                setSelectedTitleIndex(index); 
                globalVar.selectedTitleIndex = index;
              }}
              onPressShowOpt={() => isShowTitleIndexOpt === index ? setShowTitleIndexOpt(null) : setShowTitleIndexOpt(index)}
              onPressEdit={() => setNotOnTitleInput(false) & setShowTitleIndexOpt(null)}
              onPressDelete={() => {
                tasks[index] = {id: index, parent: [], taskCount: 0, isChecked: []};
                setTaskItemCount(tasks.find(x => x.id === index).taskCount);
                delete titles[index];
                setTaskTitleCount(taskTitleCount - 1);
                globalVar.titleCount = globalVar - 1;
                changeSelectedTitle();
                setData();
              }}/>
            ))}
          </ScrollView>}
          {!isTitleAvailable && <Text style={{
            color: '#93a1a1'
          }}>Create some title !</Text>}
          <TouchableOpacity onPress={() => {
            setTaskTitleCount(taskTitleCount + 1);
            globalVar.titleCount = globalVar.titleCount + 1;
            setNotOnTitleInput(false);
            titles[globalVar.newTitleIndex] = '';
            tasks[globalVar.newTitleIndex] = {id: globalVar.newTitleIndex, parent: [], taskCount: 0, isChecked: [], parentTime: []};
            setScrollTitlesEnd(true);
            globalVar.newTitleIndex = globalVar.newTitleIndex + 1;
            isTitleAvailable ? '' : changeSelectedTitle();
          }}>
            <View style={{
              backgroundColor: '#268bd2',
              height: 24 + ((24 * fontScale) - 24),
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10
            }}>
              <Text style={{
                color: '#eee8d5',
                marginLeft: 8 + ((10 * fontScale) - 10),
                marginRight: 8 + ((10 * fontScale) - 10),
                fontWeight: '500'
              }}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        paddingTop: 8 + ((fontScale * 8) - 8),
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: 'space-between',
        flex: 1
      }}>
        {isItemAvailable && <ScrollView 
        ref={itemScrollRef}
        InsetAdjustmentBehavior='automatic'
        onScrollAnimationEnd={true}
        alwaysBounceVertical={true}
        bounces={true}>
          {tasks?.find(x => x?.id === selectedTitleIndex)?.parent.map((item, itemIndex) => (
            <Task titleIndex={selectedTitleIndex} itemIndex={itemIndex} 
            isOnEditTask={isOnEditTask && editTaskIndex === itemIndex ? true : false}
            item={item}
            key={itemIndex}
            isChecked={tasks.find(x => x.id === selectedTitleIndex).isChecked[itemIndex]}
            onPressCheck={() => {
              tasks.find(x => x.id === selectedTitleIndex).isChecked[itemIndex] = tasks.find(x => x.id === selectedTitleIndex).isChecked[itemIndex] ? false : true;
              setData();
            }}
            onPressDelete={() => {
              tasks.find(x => x.id === selectedTitleIndex).taskCount = tasks.find(x => x.id === selectedTitleIndex).taskCount - 1;
              setTaskItemCount(tasks.find(x => x.id === selectedTitleIndex).taskCount);
              delete tasks.find(x => x.id === selectedTitleIndex).parent[itemIndex];
              console.log(tasks.find(x => x.id === selectedTitleIndex).parent[itemIndex]);
            }}
            onPressTaskText={() => {
              setEditTaskIndex(itemIndex);
              setOnEditTask(true);
              setAddTextInputVal(tasks.find(x => x.id === selectedTitleIndex).parent[itemIndex]);
            }}/>
          ))}
        </ScrollView>}
        {!isItemAvailable && <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            color: '#93a1a1'
          }}>There is no task to do !</Text>
        </View>}
        {isNotOnTitleInput && isShowAddItem && <AddSection
        inputRef={editTaskRef}
        isOnEditTask={isOnEditTask}
        textInputVal={addTextInputVal}
        onChangeText={(itemVal) => setAddTextInputVal(itemVal)}
        onPressAdd={() => {
          setData();
          if(addTextInputVal === ""){
            isOnEditTask ? alert('Cannot edit to an empty task !') : alert('Cannot add an empty task !');
          }else{
            isOnEditTask ? setOnEditTask(false) : setOnEditTask(false);
            tasks.find(x => x.id === selectedTitleIndex).parent[isOnEditTask ? editTaskIndex : globalVar.newItemIndex] = `${addTextInputVal}`;
            tasks.find(x => x.id === selectedTitleIndex).parentTime[isOnEditTask ? editTaskIndex : globalVar.newItemIndex] = isOnEditTask ? tasks.find(x => x.id === selectedTitleIndex).parentTime[editTaskIndex] :`${currentTime}`;
            tasks.find(x => x.id === selectedTitleIndex).isChecked[isOnEditTask ? editTaskIndex : globalVar.newItemIndex] = isOnEditTask ? tasks.find(x => x.id === selectedTitleIndex).isChecked[editTaskIndex] : false;
            setAddTextInputVal("");
            if(!isOnEditTask){
              tasks.find(x => x.id === selectedTitleIndex).taskCount = tasks.find(x => x.id === selectedTitleIndex).taskCount + 1;
              setTaskItemCount(tasks.find(x => x.id === selectedTitleIndex).taskCount);
              globalVar.newItemIndex = globalVar.newItemIndex + 1;
              setScrollItemsEnd(true);
            }else{
              setOnEditTask(false);
            }
          }
        }}/>}
      </View>
    </SafeAreaView>
  );
};

export default App;
