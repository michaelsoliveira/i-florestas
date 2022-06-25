import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Comprador } from "./Comprador";

@Index("pessoa_pkey", ["idPessoa"], { unique: true })
@Entity("pessoa", { schema: "public" })
export class Pessoa extends BaseModel {
  // @Column("integer", { primary: true, name: "id_pessoa" })
  // idPessoa: number;

  @Column({ name: "bairro", nullable: true, length: 50 })
  bairro: string;

  @Column({ name: "cep", nullable: true, length: 15 })
  cep: string;

  @Column({ name: "cnf_cnpj", nullable: true, length: 20 })
  cnfCnpj: string;

  @Column({ name: "endereco", nullable: true, length: 50 })
  endereco: string;

  @Column("character varying", { name: "estado", nullable: true, length: 50 })
  estado: string;

  @Column({
    name: "municipio",
    nullable: true,
    length: 50,
  })
  municipio: string;

  @Column({ name: "nome", nullable: true, length: 50 })
  nome: string;

  @Column({ name: "numero", nullable: true, length: 50 })
  numero: string;

  @Column({
    name: "pessoa_tipo",
    nullable: true,
    length: 50,
  })
  pessoaTipo: string;

  @OneToOne(() => Comprador, (comprador) => comprador.pessoa)
  comprador: Comprador[];
}
