import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Notes } from "./notes.model";
import { CreateNotesDto } from "./dto/create-notes.dto";
import { User } from "src/users/users.model";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes) private NotesRepository: typeof Notes) {}
  async createNotes(dto: CreateNotesDto) {
    const note = await this.NotesRepository.create(dto);
    const user = await User.findOne({ where: { id: dto.userId } });
    await user.update({ notes: [...user.notes, note] });
    return note;
  }
  async getAllNotes() {
    const notes = await this.NotesRepository.findAll();
    return notes;
  }
  async getNotesForUserIdDate(userId: number) {
    const notes = await this.NotesRepository.findAll({
      where: { userId },
    });
    return notes;
  }
  async deleteNotes(id: number, userId: number) {
    const note = await this.NotesRepository.destroy({ where: { id } });
    const user = await User.findOne({ where: { id: userId } });
    const updatedNotes = user.notes.filter((item) => item.id !== id);
    await user.update({ notes: updatedNotes });
    return note;
  }
}
