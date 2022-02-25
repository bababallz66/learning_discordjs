import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity({ tableName: "stats" })
export class Stats {
  @PrimaryKey()
  name!: string;

  @Property()
  strength!: number;

  @Property()
  agility!: number;

  @Property()
  mana!: number;

  @Property()
  magicpower!: number;

  @Property()
  vitality!: number;

  @Property()
  luck!: number;

  @Property()
  point!: number;

  constructor(
    name: string,
    strength: number = 1,
    agility: number = 1,
    mana: number = 100,
    magicpower: number = 1,
    vitality: number = 200,
    luck: number = 1,
    point: number = 5
  ) {
    this.name = name;
    this.strength = strength;
    this.agility = agility;
    this.mana = mana;
    this.magicpower = magicpower;
    this.vitality = vitality;
    this.luck = luck;
    this.point = point;
  }
}
