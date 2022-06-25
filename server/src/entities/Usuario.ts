import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("usuario_pkey", ["idUsuario"], { unique: true })
@Entity("usuario", { schema: "public" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

  @Column("character varying", { name: "nome", nullable: true, length: 55 })
  nome: string | null;

  @Column("character varying", { name: "login", length: 15 })
  login: string;

  @Column("character varying", { name: "senha", length: 50 })
  senha: string;

  @Column("integer", { name: "tipo" })
  tipo: number;

  @Column("character varying", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("character varying", { name: "cpf", nullable: true, length: 50 })
  cpf: string | null;
}
