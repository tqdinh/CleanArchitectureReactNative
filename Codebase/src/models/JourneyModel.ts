export interface TrekkingJourney {
  journey_id: number;
  title: string;
  image_header: string;
  total_subcriber: number;
  createdAt: number;
}

// export const JourneyStatus = 'STARTED' || 'FINISHED' || 'PAUSED' || undefined
export enum JourneyStatus {
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  PAUSED = "PAUSED",
};
