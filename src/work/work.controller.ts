import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { WorkService } from "./work.service";
import { CreateWorkDto } from "./dto/create-work.dto";

@Controller("work")
export class WorkController {
  constructor(private workService: WorkService) {}

  @Post("/create")
  createWork(@Body() dto: CreateWorkDto) {
    return this.workService.createWork(dto);
  }
  @Get("/getHoursOfWorks")
  getHoursOfWorks(
    @Query()
    query: {
      userId: number;
    }
  ) {
    return this.workService.getHoursOfWorks(query.userId);
  }
}
