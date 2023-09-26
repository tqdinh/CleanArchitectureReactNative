import { JourneyStatus } from "models/JourneyModel";

export default class EntityJourney {
  private id?: number;
  private title?: string;
  private image_header?: string;
  private total_subcriber?: number;
  private createdAt?: Date;
  private status?: JourneyStatus;

  constructor(
    _id?: number,
    _title?: string,
    _image_header?: string,
    _total_subcriber?: number,
    _createdAt?: Date,
    _status?: JourneyStatus
  ) {
    this.id = _id;
    this.title = _title;
    this.image_header = _image_header;
    this.total_subcriber = _total_subcriber;
    this.createdAt = _createdAt;
    this.status = _status;
  }

  getId = () => {
    return this.id;
  };

  getTitle = () => {
    return this.title ?? "Journey Title";
  };

  getImageHeader = () => {
    return this.image_header ?? "";
  };

  getTotalSubcriber = () => {
    return this.total_subcriber ?? 0;
  };

  getDateCreated = () => {
    return this.createdAt;
  };

  getStatus = () => {
    return this.status ?? JourneyStatus.UNDEFINED;
  };
}