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
    const user = await User.findByPk(dto.userId);

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(note);
    await user.save();
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
  async deleteNotes(id: number) {
    const notes = await this.NotesRepository.destroy({ where: { id } });
    return notes;
  }
}
