import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { Arvore } from "./Arvore";
// import { CategoriaEspecieUt } from "./CategoriaEspecieUt";
// import { Tora } from "./Tora";
// import { Poa } from "./Poa";
import { Upa } from "./Upa";
import { BaseModel } from "./BaseEntity";
import { Arvore } from "./Arvore";
import { Tora } from "./Tora";
import { Poa } from "./Poa";

// @Index("ut_pkey", ["idUt"], { unique: true })
@Entity("ut", { schema: "public" })
export class Ut extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_ut" })
  // idUt: string;

  @Column("integer", { name: "numero_ut" })
  numeroUt: number;

  @Column("double precision", {
    name: "area_util",
    nullable: true
  })
  areaUtil: number;

  @Column({ name: "quantidade_faixas", nullable: true })
  quantidadeFaixas: number;

  @Column({ name: "largura_faixas", nullable: true })
  larguraFaixas: number;

  @Column({ name: "comprimento_faixas", nullable: true })
  comprimentoFaixas: number;

  @Column("double precision", {
    name: "area_total",
    nullable: true
  })
  areaTotal: number;

  @Column("double precision", {
    name: "azimute",
    nullable: true
  })
  azimute: number;

  @Column({ name: "quadrante", nullable: true })
  quadrante: number;

  @Column("double precision", {
    name: "latitude",
    nullable: true
  })
  latitude: number;

  @Column("double precision", {
    name: "longitude",
    nullable: true
  })
  longitude: number;

  @Column({ type: "bytea", name: "shapefile", nullable: true })
  shapefile: Buffer;

  @Column({type: "geometry", name: "origem", nullable: true })
  origem: string;

  // @OneToMany(() => Arvore, (arvore) => arvore.ut)
  // arvores: Arvore[];

  // @OneToMany(
  //   () => CategoriaEspecieUt,
  //   (categoriaEspecieUt) => categoriaEspecieUt.idUt
  // )
  // categoriaEspecieUts: CategoriaEspecieUt[];

  // @OneToMany(() => Tora, (tora) => tora.ut)
  // toras: Tora[];

  // @ManyToOne(() => Poa, (poa) => poa.uts)
  // @JoinColumn([{ name: "id_poa", referencedColumnName: "id" }])
  // poa: Poa;

  @ManyToOne(() => Upa, (upa) => upa.uts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_upa", referencedColumnName: "id" }])
  upa: Upa;
}
