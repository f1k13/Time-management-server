import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { User } from './users.model'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/self')
	getSelf(@Req() req: { user: User }) {
		return this.usersService.getUserById(req.user.id)
	}
}
