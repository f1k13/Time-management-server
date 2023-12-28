import { Module } from "@nestjs/common";
import { WorkController } from "./work.controller";
import { WorkService } from "./work.service";
import { Work } from "./work.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";

@Module({
  controllers: [WorkController],
  providers: [WorkService],
  exports: [WorkService],
  imports: [SequelizeModule.forFeature([Work, User])],
})
export class WorkModule {}
