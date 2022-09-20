import {Mood} from "@/databaseAccessLayer/Mood";
import {UpdateMoodPayloadDTO} from "@/models/UpdateMoodPayloadDTO";
import {AddMoodPayloadDTO} from "@/models/AddMoodPayloadDTO";

interface IMoodRepository {
  getAll: () => Promise<Mood[]>

  getOne: (moodId: number) => Promise<Mood>

  update(updateMoodPayloadDTO: UpdateMoodPayloadDTO): Promise<Mood>

  add(newMood: AddMoodPayloadDTO): Promise<Mood>

  remove(moodId: number): Promise<void>
}
export default IMoodRepository;
