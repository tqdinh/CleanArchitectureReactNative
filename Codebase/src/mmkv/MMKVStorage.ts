import { MMKV } from "react-native-mmkv";

class MMKVStorage {
  private static _instance: MMKVStorage;
  public localStorage: MMKV;
  private constructor() {
    this.localStorage = new MMKV();
  }

  public static getInstance() {
    if (!MMKVStorage._instance) {
      MMKVStorage._instance = new MMKVStorage();
    }
    return MMKVStorage._instance;
  }

  public static saveStringValue(key: string, value: string) {
    this.getInstance().localStorage.set(key, value);
  }

  public static getStringValueFromKey(key: string) {
    return this.getInstance().localStorage.getString(key)
  }
}

export default MMKVStorage;
