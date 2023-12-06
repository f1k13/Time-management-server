import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import { User } from "./users.model";
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/self")
  getSelf(@Req() req: { user: User }) {
    return this.usersService.getUserById(req.user.id);
  }
  @Get("/getAll")
  getAll() {
    return this.usersService.getAllUsers();
  }
  @Get("/search")
  search(@Query() query: { username: string }) {
    return this.usersService.searchUsers(query.username);
  }
  @Post('/sendRequestToFriend')
  sendRequestToFriend( @Body() req: { friendId: number, userId: number }) {
    return this.usersService.sendRequestToFriend(req.userId, req.friendId);
  }
  @Post('/acceptFriend')
  acceptFriend(@Body() req: { friendId: number, userId: number }) {
    return this.usersService.acceptRequestFriends(req.userId, req.friendId);
  }
}
