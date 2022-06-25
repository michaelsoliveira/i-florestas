import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { CategoriaEspeciePoa } from "./CategoriaEspeciePoa";
import { User } from "./User";
import { BaseModel } from "./BaseEntity";

@Entity("refresh_token", { schema: "public" })
export class RefreshToken extends BaseModel {

  @Column({ name: "expires_in" })
  expiresIn: number;

  @Column()
  token: string

  @ManyToOne(
    () => User,
    (user) => user.refreshTokens
  )
  @JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
  user: User;
}
