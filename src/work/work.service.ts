import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Work } from "./work.model";
import { CreateWorkDto } from "./dto/create-work.dto";
import { User } from "src/users/users.model";

@Injectable()
export class WorkService {
  constructor(@InjectModel(Work) private WorkRepository: typeof Work) {}

  async createWork(dto: CreateWorkDto) {
    const work = await this.WorkRepository.create(dto);
    const user = await User.findByPk(dto.userId);

    if (!Array.isArray(user.works)) {
      user.works = [];
    }
    const isDateExists = user.works.map((item) => item.date);
    if (isDateExists) {
      throw new Error("Date already exist");
    }
    user.works.push(work);
    await user.save();
    return work;
  }
  async getHoursOfWorks(userId: number) {
    const user = await User.findByPk(userId);
    const works = await this.WorkRepository.findAll({
      where: { userId: userId },
    });

    return works;
  }
}
