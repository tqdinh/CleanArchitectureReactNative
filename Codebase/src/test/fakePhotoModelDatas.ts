import { PhotoModel } from "models/PhotoModel";

// mock datas: get from redux store
const fakePhotoModelDatas: PhotoModel[] = [
  {
    photo_path: "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
    checkpoint_id: 0,
    name: "Photo 1",
    createdAtTimestamp: new Date().getTime(),
    description: "Description for Photo 1",
    location: {
      latitude: 10.8080586 + (Math.random() - 0.5) * 0.008,
      longitude: 106.7135442 + (Math.random() - 0.5) * 0.008,
    },
  },

  {
    photo_path: "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7",
    checkpoint_id: 0,
    name: "Photo 2",
    createdAtTimestamp: new Date().getTime(),
    description: "Description for Photo 2",
    location: {
      latitude: 10.8080586 + (Math.random() - 0.5) * 0.008,
      longitude: 106.7135442 + (Math.random() - 0.5) * 0.008,
    },
  },

  {
    photo_path: "https://images.unsplash.com/photo-1627522460108-215683bdc9f6",
    checkpoint_id: 0,
    name: "Photo 3",
    createdAtTimestamp: new Date().getTime(),
    description: "Description for Photo 3",
    location: {
      latitude: 10.8080586 + (Math.random() - 0.5) * 0.008,
      longitude: 106.7135442 + (Math.random() - 0.5) * 0.008,
    },
  },

  {
    photo_path: "https://images.unsplash.com/photo-1588628566587-dbd176de94b4",
    checkpoint_id: 0,
    name: "Photo 4",
    createdAtTimestamp: new Date().getTime(),
    description: "Description for Photo 4",
    location: {
      latitude: 10.8080586 + (Math.random() - 0.5) * 0.008,
      longitude: 106.7135442 + (Math.random() - 0.5) * 0.008,
    },
  },
];

export default fakePhotoModelDatas
