import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arvore } from "./Arvore";
import { DestinoTora } from "./DestinoTora";
import { Saida } from "./Saida";
import { Ut } from "./Ut";

@Index("tora_pkey", ["idTora"], { unique: true })
@Entity("tora", { schema: "public" })
export class Tora {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_tora" })
  idTora: string;

  @Column("smallint", { name: "patio", nullable: true })
  patio: number | null;

  @Column("character varying", { name: "sequencia", length: 17 })
  sequencia: string;

  @Column("character varying", { name: "secao", length: 3 })
  secao: string;

  @Column("double precision", {
    name: "diametro_tora_1",
    nullable: true,
    precision: 53,
  })
  diametroTora_1: number | null;

  @Column("double precision", {
    name: "diametro_tora_2",
    nullable: true,
    precision: 53,
  })
  diametroTora_2: number | null;

  @Column("double precision", {
    name: "diametro_tora_3",
    nullable: true,
    precision: 53,
  })
  diametroTora_3: number | null;

  @Column("double precision", {
    name: "diametro_tora_4",
    nullable: true,
    precision: 53,
  })
  diametroTora_4: number | null;

  @Column("double precision", {
    name: "diametro_oco_1",
    nullable: true,
    precision: 53,
  })
  diametroOco_1: number | null;

  @Column("double precision", {
    name: "diametro_oco_2",
    nullable: true,
    precision: 53,
  })
  diametroOco_2: number | null;

  @Column("double precision", {
    name: "diametro_oco_3",
    nullable: true,
    precision: 53,
  })
  diametroOco_3: number | null;

  @Column("double precision", {
    name: "diametro_oco_4",
    nullable: true,
    precision: 53,
  })
  diametroOco_4: number | null;

  @Column("double precision", {
    name: "comprimento_tora",
    nullable: true,
    precision: 53,
  })
  comprimentoTora: number | null;

  @Column("double precision", {
    name: "comprimento_oco",
    nullable: true,
    precision: 53,
  })
  comprimentoOco: number | null;

  @Column("double precision", {
    name: "volume_tora",
    nullable: true,
    precision: 53,
  })
  volumeTora: number | null;

  @Column("double precision", {
    name: "volume_oco",
    nullable: true,
    precision: 53,
  })
  volumeOco: number | null;

  @Column("date", { name: "data_digitacao", nullable: true })
  dataDigitacao: string | null;

  @Column("smallint", { name: "tipo", nullable: true })
  tipo: number | null;

  @ManyToOne(() => Arvore, (arvore) => arvore.toras)
  @JoinColumn([{ name: "id_arvore", referencedColumnName: "idArvore" }])
  idArvore: Arvore;

  @ManyToOne(() => DestinoTora, (destinoTora) => destinoTora.toras)
  @JoinColumn([{ name: "id_destino", referencedColumnName: "id" }])
  destino: DestinoTora;

  @ManyToOne(() => Saida, (saida) => saida.toras)
  @JoinColumn([{ name: "id_saida", referencedColumnName: "id" }])
  saida: Saida;

  // @ManyToOne(() => Ut, (ut) => ut.toras)
  // @JoinColumn([{ name: "id_ut", referencedColumnName: "id" }])
  // ut: Ut;
}
