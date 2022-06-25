import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arvore } from "./Arvore";

@Index("situacao_arvore_pkey", ["idSituacao"], { unique: true })
@Entity("situacao_arvore", { schema: "public" })
export class SituacaoArvore {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_situacao" })
  idSituacao: number;

  @Column("character varying", { name: "nome", length: 40 })
  nome: string;

  @OneToMany(() => Arvore, (arvore) => arvore.idSituacao)
  arvores: Arvore[];
}
