import { Body, Controller, Post } from "@nestjs/common";
import { CalendarService } from "./calendarTasks.service";
import { CreateTasksDto } from "./dto/create-tasks.dto";

@Controller("calendar")
export class CalendarController {
  constructor(private calendarService: CalendarService) {}
  @Post("/createTask")
  createTask(@Body() createTasksDto: CreateTasksDto) {
    return this.calendarService.createTasks(createTasksDto);
  }
}
