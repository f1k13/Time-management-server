import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CalendarService } from "./calendarTasks.service";
import { CreateTasksDto } from "./dto/create-tasks.dto";
import { query } from "express";

@Controller("calendar")
export class CalendarController {
  constructor(private calendarService: CalendarService) {}
  @Post("/createTask")
  createTask(@Body() createTasksDto: CreateTasksDto) {
    return this.calendarService.createTasks(createTasksDto);
  }
  @Get('/getTasks')
  getTasks(@Query() query: {userId: number, date: string}) {
    return this.calendarService.getTasks(query.userId, query.date);
  }
  @Get('/getAllTasks')
  getAllTasks(@Query() query: {userId: number}) {
    return this.calendarService.getTasksCells(query.userId);
  }
  @Delete('/deleteTask') 
  deleteTasks(@Query() query: {userId: number, id:number}) {
    return this.calendarService.deleteTasks(query.id, query.userId)
  }

}
