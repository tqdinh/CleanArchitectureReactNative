import { MMKV } from "react-native-mmkv";
import { MMKVKeys } from "./MMKVKeys";
import { JourneyModel } from "models/JourneyModel";

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
    return this.getInstance().localStorage.getString(key);
  }

  public static saveCurrentJourney(currentJourney: JourneyModel) {
    // TODO: check to see if ObjectId is saved correctly
    this.getInstance().localStorage.set(
      MMKVKeys.CURRENT_JOURNEY,
      JSON.stringify(currentJourney)  // convert from object to string
    );
  }

  public static getCurrentJourney() : JourneyModel {
    // TODO: check to see if ObjectId is parsed correctly
    const currentJourneyStr = this.getInstance().localStorage.getString(MMKVKeys.CURRENT_JOURNEY)
    if (currentJourneyStr === undefined) return undefined
    return JSON.parse(currentJourneyStr)  // convert from string to model
  }
}

export default MMKVStorage;
