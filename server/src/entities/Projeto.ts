import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from './BaseEntity';
import { Empresa } from './Empresa';

@Entity("projeto")
export class Projeto extends BaseModel {

    @Column({ name: "nome" })
    nome: string

    @ManyToOne(() => Empresa, (empresa) => empresa.projetos)
    @JoinColumn([{ name: "id_empresa", referencedColumnName: "id" }])
    empresa: Empresa
}