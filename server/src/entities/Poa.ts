import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoriaEspecie } from "./CategoriaEspecie";
import { CategoriaEspecieUt } from "./CategoriaEspecieUt";
import { SituacaoPoa } from "./SituacaoPoa";
import { Saida } from "./Saida";
import { Ut } from "./Ut";
import { BaseModel } from "./BaseEntity";
import { Usuario } from "./Usuario";
import { User } from "./User";

// @Index("poa_pkey", ["idPoa"], { unique: true })
@Entity("poa", { schema: "public" })
export class Poa extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_poa" })
  // idPoa: string;

  @Column({
    name: "descricao",
    nullable: true,
    length: 50,
  })
  descricao: string;

  @Column({
    name: "data_ultimo_plan",
    nullable: true,
    length: 50,
  })
  dataUltimoPlan: Date;

  @Column({ name: "pmfs", nullable: true, length: 50 })
  pmfs: string;

  @Column({
    name: "nome_resp_elab",
    nullable: true,
    length: 50,
  })
  nomeRespElab: string;

  @Column({
    name: "crea_resp_elab",
    nullable: true,
    length: 25,
  })
  creaRespElab: string;

  @Column({
    name: "art_resp_elab",
    nullable: true,
    length: 25,
  })
  artRespElab: string;

  @Column("character varying", {
    name: "nome_resp_exec",
    nullable: true,
    length: 50,
  })
  nomeRespExec: string;

  @Column({
    name: "crea_resp_exec",
    nullable: true,
    length: 25,
  })
  creaRespExec: string;

  @Column({
    name: "art_resp_exec",
    nullable: true,
    length: 25,
  })
  artRespExec: string;

  @Column({
    name: "nome_detentor",
    nullable: true,
    length: 50,
  })
  nomeDetentor: string;

  @Column({
    name: "cpf_detentor",
    nullable: true,
    length: 11,
  })
  cpfDetentor: string;

  @Column("character varying", {
    name: "nome_proponente",
    nullable: true,
    length: 50,
  })
  nomeProponente: string;

  @Column({
    name: "cpf_proponente",
    nullable: true,
    length: 11,
  })
  cpfProponente: string;

  // @ManyToOne(() => User, (user) => user.poas)
  // @JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
  // user: User;

  @Column({
    type: "double precision",
    name: "corte_maximo",
    nullable: true,
    precision: 53,
  })
  corteMaximo: number;

  @Column({ name: "id_parent", nullable: true })
  idParent: number;

  @ManyToMany(
    () => CategoriaEspecie,
    // (categoriaEspecie) => categoriaEspecie.poas,
    {
      cascade: false
    }
  )
  @JoinTable()
  categoriaEspecies: CategoriaEspecie[];

  // @OneToMany(
  //   () => CategoriaEspecieUt,
  //   (categoriaEspecieUt) => categoriaEspecieUt.poa
  // )
  // categoriaEspecieUts: CategoriaEspecieUt[];

  // @ManyToOne(() => SituacaoPoa, (situacaoPoa) => situacaoPoa.poas)
  // @JoinColumn([{ name: "id_situacao", referencedColumnName: "id" }])
  // situacao: SituacaoPoa;

  // @OneToMany(() => Saida, (saida) => saida.poa)
  // saidas: Saida[];

  // @OneToMany(() => Ut, (ut) => ut.poa)
  // uts: Ut[];
}
