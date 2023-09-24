export interface Journey {
  _id: string;
  title: string;
  image_header: string;
  total_subcriber: number;
  createdAt?: string;
  status?: JourneyStatus;
  checkpointIds?: string[] // store checkpoint ids
}

export type JourneyModel = Journey | undefined;

// export const JourneyStatus = 'STARTED' || 'FINISHED' || 'PAUSED' || undefined
export enum JourneyStatus {
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  PAUSED = "PAUSED",
  UNDEFINED = "UNDEFINED",
};
