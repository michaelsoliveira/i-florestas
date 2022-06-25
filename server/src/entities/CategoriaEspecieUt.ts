import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Poa } from "./Poa";
import { Ut } from "./Ut";

@Entity("categoria_especie_ut", { schema: "public" })
export class CategoriaEspecieUt extends BaseModel {
  @Column("integer", { name: "id_categoria", nullable: true })
  idCategoria: number | null;

  @Column("character varying", { name: "nome", nullable: true, length: 100 })
  nome: string | null;

  @Column("integer", { name: "criterio_fuste", nullable: true })
  criterioFuste: number | null;

  @Column("integer", { name: "criterio_dminc", nullable: true })
  criterioDminc: number | null;

  @Column("integer", { name: "criterio_dmaxc", nullable: true })
  criterioDmaxc: number | null;

  @Column("integer", { name: "criterio_n_min_ut", nullable: true })
  criterioNMinUt: number | null;

  @Column("integer", { name: "criterio_perc_min_ut", nullable: true })
  criterioPercMinUt: number | null;

  @Column("boolean", { name: "preservar", nullable: true })
  preservar: boolean | null;

  @Column("integer", { name: "criterio_altura", nullable: true })
  criterioAltura: number | null;

  @Column("integer", { name: "criterio_volume", nullable: true })
  criterioVolume: number | null;

  // @ManyToOne(() => Poa, (poa) => poa.categoriaEspecieUts)
  // @JoinColumn([{ name: "id_poa", referencedColumnName: "id" }])
  // poa: Poa;

  // @ManyToOne(() => Ut, (ut) => ut.categoriaEspecieUts)
  // @JoinColumn([{ name: "id_ut", referencedColumnName: "idUt" }])
  // idUt: Ut;
}
