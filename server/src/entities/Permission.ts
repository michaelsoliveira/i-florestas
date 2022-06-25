import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseEntity";

@Entity("permissions")
export class Permission extends BaseModel {

    @Column()
    name: string;

    @Column()
    description: string;
}