import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Poa } from "./Poa";
import { Especie } from "./Especie";
import { BaseModel } from "./BaseEntity";

// @Index("categoria_especie_pkey", ["idCategoria"], { unique: true })
@Entity("categoria_especie", {
  schema: "public",
  })
export class CategoriaEspecie extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_categoria" })
  // idCategoria: string;

  @Column({ name: "nome", nullable: true, length: 50 })
  nome: string;

  @Column({type: "smallint",  name: "criterio_fuste", nullable: true })
  criterioFuste: number;

  @Column({type: "smallint",  name: "criterio_dminc", nullable: true })
  criterioDminc: number;

  @Column({type: "smallint",  name: "criterio_dmaxc", nullable: true })
  criterioDmaxc: number;

  @Column({type: "smallint",  name: "criterio_n_min", nullable: true })
  criterioNMin: number;

  @Column({type: "smallint", name: "criterio_perc_min", nullable: true })
  criterioPercMin: number;

  @Column({ name: "preservar", nullable: true })
  preservar: boolean;

  @Column({type: "double precision", name: "criterio_altura", nullable: true })
  criterioAltura: number;

  @Column({type: "double precision", name: "criterio_volume", nullable: true })
  criterioVolume: number;

  // @ManyToMany(() => Poa, (poa) => poa.categoriaEspecies)
  // poas: Poa[];

  @OneToMany(() => Especie, (especie) => especie.categoria)
  especies: Especie[];
}
