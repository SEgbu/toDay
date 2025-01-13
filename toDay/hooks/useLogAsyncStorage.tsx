import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogAsyncStorage = () => {
    const logAsyncStorage = () => {
        AsyncStorage.getAllKeys().then((keyArray) => {
            AsyncStorage.multiGet(keyArray).then((keyValArray) => {
                let myStorage: any = {};
                for (let keyVal of keyValArray) {
                myStorage[keyVal[0]] = keyVal[1]
                }
        
                console.log('CURRENT STORAGE: ', myStorage);
            })
        });
    }

    return logAsyncStorage;
}