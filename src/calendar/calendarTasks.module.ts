import { Module } from "@nestjs/common";
import { CalendarController } from "./calendarTasks.controller";
import { CalendarService } from "./calendarTasks.service";
import { CalendarTasks } from "./calendarTasks.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";

@Module({
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
  imports: [SequelizeModule.forFeature([CalendarTasks, User])],
})
export class CalendarModule {}
