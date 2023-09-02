export interface TrekkingJourney {
  title: string;
  image_header: string;
  total_subcriber: number;
  createdAt: number;
  status: JourneyStatus
}

// export const JourneyStatus = 'STARTED' || 'FINISHED' || 'PAUSED' || undefined
export enum JourneyStatus {
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  PAUSED = "PAUSED",
};
