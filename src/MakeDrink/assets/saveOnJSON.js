import AsyncStorage from '@react-native-async-storage/async-storage';
const saveObject = async (key, object) => {
    try {
        if(object !== 0){
            const jsonValue = JSON.stringify(object);
            await AsyncStorage.setItem(key, jsonValue);
            console.log('Object successfully saved');
        }
      
    } catch (e) {
      console.error('Failed to save the object to the storage');
    }
  };

  export default saveObject;