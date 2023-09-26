import EntityPhoto from "DOMAIN/entities/EntityPhoto";

const fakePhotoEntityDatas: EntityPhoto[] = [
  new EntityPhoto(
    "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
    0,
    "Photo 1",
    "Description for Photo 1",
    new Date().getTime(),
    {
      coords: {
        accuracy: 13.468000411987305,
        altitude: 11.5,
        course: 0,
        heading: 0,
        latitude: 20.8080541,
        longitude: 126.7135493,
        speed: 0.05658692121505737,
      },
      timestamp: 1695702617000,
    }
  ),

  new EntityPhoto(
    "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7",
    0,
    "Photo 2",
    "Description for Photo 2",
    new Date().getTime(),
    {
      coords: {
        accuracy: 13.468000411987305,
        altitude: 11.5,
        course: 0,
        heading: 0,
        latitude: 40.8080541,
        longitude: 146.7135493,
        speed: 0.05658692121505737,
      },
      timestamp: 1695702617200,
    }
  ),

  new EntityPhoto(
    "https://images.unsplash.com/photo-1627522460108-215683bdc9f6",
    0,
    "Photo 3",
    "Description for Photo 3",
    new Date().getTime(),
    {
      coords: {
        accuracy: 13.468000411987305,
        altitude: 11.5,
        course: 0,
        heading: 0,
        latitude: 20.8080541,
        longitude: 106.7135493,
        speed: 0.05658692121505737,
      },
      timestamp: 1695702617400,
    }
  ),

  new EntityPhoto(
    "https://images.unsplash.com/photo-1588628566587-dbd176de94b4",
    0,
    "Photo 4",
    "Description for Photo 4",
    new Date().getTime(),
    {
      coords: {
        accuracy: 13.468000411987305,
        altitude: 11.5,
        course: 0,
        heading: 0,
        latitude: 50.8080541,
        longitude: 106.7135493,
        speed: 0.05658692121505737,
      },
      timestamp: 1695702617800,
    }
  ),
];

export default fakePhotoEntityDatas;
