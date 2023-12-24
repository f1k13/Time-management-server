import { CreateNotesDto } from "./dto/create-notes.dto";
import { NotesService } from "./notes.service";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";

@Controller("notes")
export class NotesController {
  constructor(private notesService: NotesService) {}
  @Post("/create")
  create(@Body() notesDto: CreateNotesDto) {
    return this.notesService.createNotes(notesDto);
  }
  @Get("/all")
  getAll() {
    return this.notesService.getAllNotes();
  }
  @Get("/getNotes")
  getNotesForUserIdDate(@Query() query: { userId: number }) {
    return this.notesService.getNotesForUserIdDate(query.userId);
  }
}
