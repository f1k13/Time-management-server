import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import { CalendarModule } from "./calendar/calendarTasks.module";
import { CalendarTasks } from "./calendar/calendarTasks.model";
import { NotesController } from "./notes/notes.controller";
import { NotesService } from "./notes/notes.service";
import { NotesModule } from "./notes/notes.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, CalendarTasks],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    CalendarModule,
    NotesModule,
  ],
})
export class AppModule {}
