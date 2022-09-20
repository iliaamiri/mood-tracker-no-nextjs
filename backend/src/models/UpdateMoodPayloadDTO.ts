import {IsNumber, IsString} from "class-validator";

export class UpdateMoodPayloadDTO {
  @IsNumber()
  public moodId: number;

  @IsNumber()
  public rating: number;

  @IsString()
  public feelingText: string;
}
