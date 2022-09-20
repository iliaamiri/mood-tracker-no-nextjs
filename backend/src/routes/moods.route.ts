import { Router } from 'express';
import MoodsController from '@controllers/moods.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import {AddMoodPayloadDTO} from "@/models/AddMoodPayloadDTO";
import {UpdateMoodPayloadDTO} from "@/models/UpdateMoodPayloadDTO";

class MoodsRoute implements Routes {
  public path = '/api/moods';
  public router = Router();
  public moodsController = new MoodsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.moodsController.getMoods);
    this.router.get(`${this.path}/:id(\\d+)`, this.moodsController.getOneMood);
    this.router.post(`${this.path}`, validationMiddleware(AddMoodPayloadDTO, 'body'), this.moodsController.createMood);
    this.router.put(`${this.path}`, validationMiddleware(UpdateMoodPayloadDTO, 'body', true), this.moodsController.updateMood);
    this.router.delete(`${this.path}/:id(\\d+)`, this.moodsController.deleteMood);
  }
}

export default MoodsRoute;
