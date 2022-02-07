import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { threadId } from "worker_threads";

@Entity({ tableName: "profiles" })
export class Profile {
  @PrimaryKey()
  name!: string;

  @Property()
  username!: string;

  @Property()
  description!: string;

  @Property()
  level!: number;

  constructor(
    name: string,
    username: string,
    description: string = "description par defaut",
    level: number = 1
  ) {
    this.name = name;
    this.username = username;
    this.description = description;
    this.level = level;
  }
}
