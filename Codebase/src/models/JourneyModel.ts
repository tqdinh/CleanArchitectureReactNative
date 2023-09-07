export interface Journey {
  _id: Realm.BSON.ObjectId;
  title: string;
  image_header: string;
  total_subcriber: number;
  createdAt: Date;
  status: JourneyStatus;
  checkpointIds: string[] // store checkpoint ids
}

export type JourneyModel = Journey | undefined;

// export const JourneyStatus = 'STARTED' || 'FINISHED' || 'PAUSED' || undefined
export enum JourneyStatus {
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  PAUSED = "PAUSED",
  UNDEFINED = "UNDEFINED",
};
