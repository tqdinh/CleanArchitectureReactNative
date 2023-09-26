interface Location {
  latitude: number;
  longitude: number;
}

interface Photo {
  photo_path: string;
  checkpoint_id?: number;
  name?: string;
  createdAtTimestamp?: number;
  description?: string;
  location?: Location;
}

export type PhotoModel = Photo | undefined;
