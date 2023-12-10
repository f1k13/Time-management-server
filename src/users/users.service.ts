import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { CalendarTasks } from "src/calendar/calendarTasks.model";
import { Op, where } from "sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async searchUsers(username: string) {
    const users = await this.userRepository.findAll({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    })

    return users
  }
  async sendRequestToFriend(userId: number, friendId: number) {
    const friend = await this.userRepository.findOne({where: {
      id: friendId
    }});
    const user = await this.userRepository.findOne({where: {
      id: userId
    }});
    const find = await friend.unacceptedRequests.find((item) => item === userId);
    if(find) {
      throw new Error ("Friend request already sent");
    } else {
      await friend.update({unacceptedRequests: [...friend.unacceptedRequests, userId]});
    }
    return friend
  }
  async acceptRequestFriends(userId: number, friendId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    const friend = await this.userRepository.findOne({where: {id: friendId}});
    const find = await user.friends.find((item) => item === friendId);
    if(find) {
      throw new Error ("Friend already added");
    } else {
      await user.update({friends: [...user.friends, friendId], unacceptedRequests: user.unacceptedRequests.filter((item) => item !== friendId)});
      await friend.update({friends: [...friend.friends, userId], unacceptedRequests: friend.unacceptedRequests.filter((item) => item !== userId)});
      return friend
    }
  }
}
