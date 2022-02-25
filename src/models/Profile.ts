import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "profiles" })
export class Profile {
  @PrimaryKey()
  name!: string;

  @Property()
  username!: string;

  @Property()
  race!: string;

  @Property()
  job!: string;

  @Property()
  description!: string;

  @Property()
  level!: number;

  @Property()
  experience!: number;

  constructor(
    name: string,
    username: string,
    race: string,
    job: string,
    description: string = "description par defaut",
    level: number = 1,
    experience: number = 0
  ) {
    this.name = name;
    this.username = username;
    this.race = race;
    this.job = job;
    this.description = description;
    this.level = level;
    this.experience = experience;
  }
}
