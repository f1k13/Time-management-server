import { NotesService } from "./notes.service";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { NotesController } from "./notes.controller";
import { User } from "src/users/users.model";
import { Notes } from "./notes.model";

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
  imports: [SequelizeModule.forFeature([Notes, User])],
})
export class NotesModule {}
