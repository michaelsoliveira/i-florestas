import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arvore } from "./Arvore";

@Index("motivo_preservacao_arvore_pkey", ["idMotivoPreservacao"], {
  unique: true,
})
@Entity("motivo_preservacao_arvore", { schema: "public" })
export class MotivoPreservacaoArvore {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_motivo_preservacao" })
  idMotivoPreservacao: string;

  @Column("character varying", { name: "nome", nullable: true, length: 100 })
  nome: string | null;

  @OneToMany(() => Arvore, (arvore) => arvore.idMotivoPreservacao)
  arvores: Arvore[];
}
