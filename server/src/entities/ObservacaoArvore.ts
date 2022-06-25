import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arvore } from "./Arvore";

@Index("observacao_arvore_pkey", ["idObservacao"], { unique: true })
@Index("observacao_arvore_nome_unique", ["nome"], { unique: true })
@Entity("observacao_arvore", { schema: "public" })
export class ObservacaoArvore {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_observacao" })
  idObservacao: string;

  @Column("character varying", { name: "nome", unique: true, length: 30 })
  nome: string;

  @Column("boolean", { name: "preservar", nullable: true })
  preservar: boolean | null;

  @OneToMany(() => Arvore, (arvore) => arvore.idObservacao)
  arvores: Arvore[];
}
