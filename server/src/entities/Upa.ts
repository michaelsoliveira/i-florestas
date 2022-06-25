import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "./BaseEntity";
import { EquacaoVolume } from "./EquacaoVolume";
import { SpatialRefSys } from "./SpatialRefSys";
import { Umf } from "./Umf";
import { Ut } from "./Ut";

// @Index("upa_pkey", ["idUpa"], { unique: true })
@Entity("upa", { schema: "public" })
export class Upa extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_upa" })
  // idUpa: string;

  @Column("integer", { name: "ano" })
  ano: number;

  @Column({
    name: "descricao",
    nullable: true,
    length: 50,
  })
  descricao: string;

  @ManyToOne(() => EquacaoVolume, (equacaoVolume) => equacaoVolume.upa)
  @JoinColumn([{ name: "id_equacao_volume", referencedColumnName: "id" }])
  equacaoVolume: EquacaoVolume[]

  @Column({ name: "tipo", nullable: true })
  tipo: number;

  @Column({ name: "epsg", nullable: true })
  epsg: number;

  @ManyToOne(() => Umf, (umf) => umf.upas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_umf", referencedColumnName: "id" }])
  umf: Umf;

  @OneToMany(() => Ut, (ut) => ut.upa)
  uts: Ut[];

  @ManyToOne(() => SpatialRefSys, (spatialRefSys) => spatialRefSys.upa)
  @JoinColumn([{ name: "srid", referencedColumnName: "srid" }])
  spatialRefSys: SpatialRefSys[]
}
