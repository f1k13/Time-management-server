import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Work } from "./work.model";
import { CreateWorkDto } from "./dto/create-work.dto";
import { User } from "src/users/users.model";

@Injectable()
export class WorkService {
  constructor(@InjectModel(Work) private WorkRepository: typeof Work) {}

  async createWork(dto: CreateWorkDto) {
    const find = await this.WorkRepository.findOne({
      where: {
        userId: dto.userId,
        date: dto.date,
      },
    });
    if (find) {
      throw new Error("Already exist");
    }
    const work = await this.WorkRepository.create(dto);
    return work;
  }

  async getHoursOfWorks(userId: number) {
    const works = await this.WorkRepository.findAll({
      where: { userId: userId },
    });

    return works;
  }
}
