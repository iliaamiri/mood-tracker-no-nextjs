import {NextFunction, Request, Response} from 'express';
import MoodsService from "@services/moods.service";
import {Mood} from "@/databaseAccessLayer/Mood";
import {AddMoodPayloadDTO} from "@/models/AddMoodPayloadDTO";
import {UpdateMoodPayloadDTO} from "@/models/UpdateMoodPayloadDTO";

class MoodsController {
  public moodService = new MoodsService();

  public getMoods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMoods: Mood[] = await this.moodService.getAll();

      res.status(200).json({data: findAllMoods, message: 'findAll'});
    } catch (error) {
      next(error);
    }
  };

  public getOneMood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const moodId = Number(req.params.id);
      const findOneMood: Mood = await this.moodService.getOne(moodId);

      res.status(200).json({data: findOneMood, message: 'findOne'});
    } catch (error) {
      next(error);
    }
  };

  public createMood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: AddMoodPayloadDTO = req.body;

      const createMood: Mood = await this.moodService.add(payload);

      res.status(201).json({data: createMood, message: 'created'});
    } catch (error) {
      next(error);
    }
  };

  public updateMood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: UpdateMoodPayloadDTO = req.body;
      const updateMood: Mood = await this.moodService.update(payload);

      res.status(200).json({data: updateMood, message: 'updated'});
    } catch (error) {
      next(error);
    }
  };

  public deleteMood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const moodId = Number(req.params.id);
      await this.moodService.remove(moodId);

      res.status(200).json({data: {}, message: 'deleted'});
    } catch (error) {
      next(error);
    }
  };
}

export default MoodsController;
