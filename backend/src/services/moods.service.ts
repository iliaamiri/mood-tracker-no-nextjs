import {PrismaClient} from '@prisma/client';
import {Mood} from "@/databaseAccessLayer/Mood";
import IMoodRepository from "@services/moods.service.interface";

class MoodService implements IMoodRepository {
  public moods = new PrismaClient().mood;

  public async getAll() {
    return await this.moods.findMany() as Mood[];
  }

  public async getOne(moodId: number) {
    return await this.moods.findUnique({
      where: {
        moodId: moodId
      }
    }) as Mood;
  }

  public async update(moodUpdatePayload) {
    return await this.moods.update({
      where: {
        moodId: moodUpdatePayload.moodId
      },
      data: {
        feelingText: moodUpdatePayload.feelingText,
        rating: moodUpdatePayload.rating
      }
    }) as Mood;
  }

  public async add(newMood) {
    return await this.moods.create({
      data: {
        feelingText: newMood.feelingText,
        rating: newMood.rating
      }
    }) as Mood;
  }

  public async remove(moodId) {
    await this.moods.delete({
      where: {
        moodId: moodId,
      },
    });
  }
}

export default MoodService;
