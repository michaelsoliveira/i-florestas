import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Especie } from "./Especie";

// @Entity("categoria_especie_poa", { schema: "public" })
// export class CategoriaEspeciePoa {
//   @Column("integer", { name: "id_categoria", nullable: true })
//   idCategoria: number | null;

  // @ManyToOne(() => Especie, (especie) => especie.categoriaEspeciePoas)
  // @JoinColumn([{ name: "id_especie", referencedColumnName: "idEspecie" }])
  // idEspecie: Especie;
// }
