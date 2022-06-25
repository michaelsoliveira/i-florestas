import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especie } from "./Especie";
import { MotivoPreservacaoArvore } from "./MotivoPreservacaoArvore";
import { ObservacaoArvore } from "./ObservacaoArvore";
import { SituacaoArvore } from "./SituacaoArvore";
import { Ut } from "./Ut";
import { Tora } from "./Tora";

@Index("inventario_pkey", ["idArvore"], { unique: true })
@Index("arvore_ut_unique", ["ut", "numeroArvore"], { unique: true })
@Entity("arvore", { schema: "public" })
export class Arvore {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_arvore" })
  idArvore: string;

  @Column({ name: "id_ut", nullable: true, unique: true })
  ut: string;

  @Column({ type: "integer", name: "numero_arvore", nullable: true, unique: true })
  numeroArvore: number;

  @Column({ type: "double precision", name: "dap", nullable: true, precision: 53 })
  dap: number;

  @Column({ type: "double precision", name: "altura", nullable: true, precision: 53 })
  altura: number;

  @Column({ type: "smallint", name: "fuste", nullable: true })
  fuste: number;

  @Column({
    type: "double precision",
    name: "area_basal",
    nullable: true,
    precision: 53,
  })
  areaBasal: number;

  @Column({ type: "double precision", name: "volume", nullable: true, precision: 53 })
  volume: number;

  @Column({
    name: "comentario",
    nullable: true,
    length: 100,
  })
  comentario: string;

  @Column({ name: "orient_x", nullable: true, length: 1 })
  orientX: string;

  @Column({ type: "double precision", name: "lat_x", nullable: true, precision: 53 })
  latX: number;

  @Column({ type: "double precision", name: "long_y", nullable: true, precision: 53 })
  longY: number;

  @Column({ type: "integer", name: "faixa", nullable: true })
  faixa: number;

  @Column({ type: "integer", name: "gps", nullable: true })
  gps: number;

  @Column({ name: "derrubada", nullable: true })
  derrubada: boolean;

  @Column({
    name: "motivo_nao_derruba",
    nullable: true,
    length: 120,
  })
  motivoNaoDerruba: string;

  @Column({ type: "smallint", name: "secoes", nullable: true })
  secoes: number;

  @Column({ name: "id_substituida", nullable: true })
  idSubstituida: string;

  @Column({ name: "substituida", nullable: true })
  substituida: boolean;

  @Column({ type: "smallint", name: "ponto", nullable: true })
  ponto: number;

  @Column({ type: "geometry", name: "ponto_arvore", nullable: true })
  pontoArvore: string;

  @Column({ type: "point", name: "arv_ponto", nullable: true })
  arvPonto: object;

  @Column({type: "double precision", name: "lat", nullable: true, precision: 53 })
  lat: number;

  @Column({type: "double precision", name: "lng", nullable: true, precision: 53 })
  lng: number;

  @ManyToOne(() => Especie, (especie) => especie.arvores, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_especie", referencedColumnName: "id" }])
  especie: Especie;

  @ManyToOne(
    () => MotivoPreservacaoArvore,
    (motivoPreservacaoArvore) => motivoPreservacaoArvore.arvores
  )
  @JoinColumn([
    {
      name: "id_motivo_preservacao",
      referencedColumnName: "idMotivoPreservacao",
    },
  ])
  idMotivoPreservacao: MotivoPreservacaoArvore;

  @ManyToOne(
    () => ObservacaoArvore,
    (observacaoArvore) => observacaoArvore.arvores,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_observacao", referencedColumnName: "idObservacao" }])
  idObservacao: ObservacaoArvore;

  @ManyToOne(() => SituacaoArvore, (situacaoArvore) => situacaoArvore.arvores)
  @JoinColumn([{ name: "id_situacao", referencedColumnName: "idSituacao" }])
  idSituacao: SituacaoArvore;

  // @ManyToOne(() => Ut, (ut) => ut.arvores, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // @JoinColumn([{ name: "id_ut", referencedColumnName: "id" }])
  // ut: Ut;

  @OneToMany(() => Tora, (tora) => tora.idArvore)
  toras: Tora[];
}
