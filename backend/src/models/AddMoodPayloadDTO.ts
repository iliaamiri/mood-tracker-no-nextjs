import {IsNumber, IsString} from "class-validator";

export class AddMoodPayloadDTO {
  @IsString()
  public feelingText: string;

  @IsNumber()
  public rating: number;
}
