import AsyncStorage from '@react-native-async-storage/async-storage';
const getObject = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log('JSON value: ', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to fetch the object from storage');
    }
  };

  export default getObject;