import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arvore } from "./Arvore";
// import { CategoriaEspeciePoa } from "./CategoriaEspeciePoa";
import { CategoriaEspecie } from "./CategoriaEspecie";
import { BaseModel } from "./BaseEntity";

// @Index("especie_pkey", ["idEspecie"], { unique: true })
@Entity("especie", { schema: "public" })
export class Especie extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_especie" })
  // idEspecie: string;

  @Column({ name: "nome", nullable: true, length: 50 })
  nome: string;

  @Column({
    name: "nome_orgao",
    nullable: true,
    length: 50,
  })
  nomeOrgao: string;

  @Column({
    name: "nome_cientifico",
    nullable: true,
    length: 100,
  })
  nomeCientifico: string;

  // @OneToMany(() => Arvore, (arvore) => arvore.especie)
  // arvores: Arvore[];

  // @OneToMany(
  //   () => CategoriaEspeciePoa,
  //   (categoriaEspeciePoa) => categoriaEspeciePoa.idEspecie
  // )
  // categoriaEspeciePoas: CategoriaEspeciePoa[];

  @ManyToOne(
    () => CategoriaEspecie,
    (categoriaEspecie) => categoriaEspecie.especies
  )
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
  categoria: CategoriaEspecie;
}
