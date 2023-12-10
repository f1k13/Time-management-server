import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CalendarTasks } from "./calendarTasks.model";
import { CreateTasksDto } from "./dto/create-tasks.dto";
import { User } from "src/users/users.model";

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(CalendarTasks) private calendarRepository: typeof CalendarTasks
  ) {}
  async createTasks(dto: CreateTasksDto) {
    const tasks = await this.calendarRepository.create(dto);
    const user = await User.findOne({ where: { id: dto.userId } });
    user.update({ tasks: [...user.tasks, tasks] });
    return tasks;
  }
  async getTasks (userId: number, date: string) {
    const user = await User.findOne({ where: { id: userId } });
    const tasks = await this.calendarRepository.findAll({
      where: {
        userId: user.id,
        calendarDate: date
      }
    })
    return tasks
  }
  async getTasksCells (userId: number) {
    const tasks = await this.calendarRepository.findAll({where: {userId: userId}});
    return tasks
  }
  async deleteTasks(id: number, userId: number) {
    const tasks = await this.calendarRepository.destroy({ where: { id } });
  
    const user = await User.findByPk(userId);
    const updatedTasks = user.tasks.filter((item) => item.id !== id);
    await user.update({ tasks: updatedTasks });
    console.log(user)
    return tasks; 
  }
}

