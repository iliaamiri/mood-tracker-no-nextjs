import express, { Router } from 'express';
import MoodsController from '@controllers/moods.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { AddMoodPayloadDTO } from '@/models/AddMoodPayloadDTO';
import { UpdateMoodPayloadDTO } from '@/models/UpdateMoodPayloadDTO';

class MoodsRoute implements Routes {
  public path = '/moods';
  public router = Router();
  public moodsController = new MoodsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //console.log(__dirname + '/../client');

    this.router.get(`${this.path}`, this.moodsController.getMoods);
    this.router.get(`${this.path}/:id(\\d+)`, this.moodsController.getOneMood);
    this.router.post(`${this.path}`, validationMiddleware(AddMoodPayloadDTO, 'body'), this.moodsController.createMood);
    this.router.put(`${this.path}`, validationMiddleware(UpdateMoodPayloadDTO, 'body', true), this.moodsController.updateMood);
    this.router.delete(`${this.path}/:id(\\d+)`, this.moodsController.deleteMood);

    // this.router.use(express.static(__dirname + '/../client'));
  }
}

export default MoodsRoute;
