export interface Journey {
  _id: number;
  title?: string;
  image_header?: string;
  total_subcriber?: number;
  createdAtTimestamp?: number;
  status?: JourneyStatus;
  checkpointIds?: number[]; // store checkpoint ids
}

export type JourneyModel = Journey | undefined;

// export const JourneyStatus = 'STARTED' || 'FINISHED' || 'PAUSED' || undefined
export enum JourneyStatus {
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  PAUSED = "PAUSED",
  UNDEFINED = "UNDEFINED",
}
