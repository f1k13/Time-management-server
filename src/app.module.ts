import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import { CalendarModule } from "./calendar/calendarTasks.module";
import { CalendarTasks } from "./calendar/calendarTasks.model";
import { NotesModule } from "./notes/notes.module";
import { Notes } from "./notes/notes.model";
import { WorkModule } from "./work/work.module";
import { Work } from "./work/work.model";

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
      models: [User, CalendarTasks, Notes, Work],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    CalendarModule,
    NotesModule,
    WorkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
