import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const observacoes: Prisma.ObservacaoArvoreCreateInput[] = [
  {
    nome: 'Oca',
  },
  {
    nome: 'Morta',
  },
  {
    nome: 'Tombada',
  },
  {
    nome: 'Ninho',
  },
  {
    nome: 'Estimada',
    preservar: false
  },
  {
    nome: 'Caida',
  }
]

//1;"Remanescente Não Substituível"
//2;"Selecionada para Corte"
//3;"Estoque"
//5;"Não Selecionada"
//7;"Substituta"
//9;"Derrubada"
//10;"Não Derrubada"

const situacaoArvores: Prisma.SituacaoArvoreCreateInput[] = [
  { id: 1, nome: 'Remanescente Não Substituível' },
  { id: 2, nome: 'Selecionada para Corte' },
  { id: 3, nome: 'Estoque' },
  { id: 4, nome: 'Não Selecionada' },
  { id: 5, nome: 'Substituta' },
  { id: 6, nome: 'Derrubada' },
  { id: 7, nome: 'Não Derrubada' },
]

//1;"Qualidade Do Fuste"
//2;"Árvore Abaixo Do Dminc"
//3;"Árvore Acima Do Dmaxc"
//4;"Categoria Da Espécie"
//5;"Observações Na Árvore"
//7;"Altura Máxima Da Árvore"
//8;"Volume Máximo Da Árvore"
//9;"Percentual Mínimo De Indivíduos Por Ut"
//10;"Mínimo De Indivíduos A Cada 100 Hectares"
//11;"Decisão Pessoal"

const motivosPreservacao: Prisma.MotivoPreservacaoCreateInput[] = [
  { id: 1, nome: 'Qualidade Do Fuste' },
  { id: 2, nome: 'Árvore Abaixo Do Dminc' },
  { id: 3, nome: 'Árvore Acima Do Dmaxc' },
  { id: 4, nome: 'Categoria Da Espécie' },
  { id: 5, nome: 'Observações Na Árvore' },
  { id: 6, nome: 'Altura Máxima Da Árvore' },
  { id: 7, nome: 'Volume Máximo Da Árvore' },
  { id: 8, nome: 'Percentual Mínimo De Indivíduos Por Ut' },
  { id: 9, nome: 'Mínimo De Indivíduos A Cada 100 Hectares' },
  { id: 10, nome: 'Decisão Pessoal' },
]

const roles: Prisma.RoleCreateInput[] = [
  {
    name: 'Admin',
    description: 'Administrador do Projeto'
  },
  {
    name: 'Gerente',
    description: 'Gerente do Projeto'
  },
  {
    name: 'Funcionário',
    description: 'Usuário Padrão'
  }
]

const equacoesModelo: Prisma.EquacaoModeloCreateInput[] = [
  {
    nome: 'Schumacher - Hall',
    expressao: 'EXP(a + b * LN(DAP) + c * LN(ALTURA))'
  },
  {
    nome: 'Spurr',
    expressao: 'EXP(a + b * LN(DAP ^ 2 * ALTURA))'
  },
  {
    nome: 'Husch (1963)',
    expressao: 'EXP(a + b * LN(DAP))'
  },
  {
    nome: 'Fator de forma',
    expressao: 'a * (3.141592 * (DAP ^ 2) / 40000 ) * ALTURA'
  },
]

const equacoesVolume: Prisma.EquacaoVolumeCreateInput[] = [
  {
    nome: 'Fator de forma',
    expressao: '0.7 * (3.141592 * (DAP ^ 2) / 40000 ) * ALTURA',
  },
  {
    nome: 'Equação de Volume Flona Tapajós',
    expressao: 'EXP(-8.86102 + 1.93181 * LN(DAP) + 0.78683 * LN(ALTURA))'
  },
]

const situacoesPoa: Prisma.SituacaoPoaCreateInput[] = [
  { nome: 'Novo' },
  { nome: 'Validado' },
  { nome: 'Processado' },
  { nome: 'Finalizado/Fechado' },
]

const estados: Prisma.EstadoCreateInput[] = [
  {
    uf: 'AC',
    nome: 'Acre',
    ddd: 68
  },
  {
    uf: 'AL',
    nome: 'Alagoas',
    ddd: 82
  },
  {
    uf: 'AM',
    nome: 'Amazonas',
    ddd: 92
  },
  {
    uf: 'AP',
    nome: 'Amapá',
    ddd: 96
  },
  {
    uf: 'BA',
    nome: 'Bahia',
    ddd: 71
  },
  {
    uf: 'CE',
    nome: 'Ceará',
    ddd: 85
  },
  {
    uf: 'DF',
    nome: 'Distrito Federal',
    ddd: 61
  },
  {
    uf: 'ES',
    nome: 'Espírito Santo',
    ddd: 27
  },
  {
    uf: 'GO',
    nome: 'Goiás',
    ddd: 62
  },
  {
    uf: 'MA',
    nome: 'Maranhão',
    ddd: 98
  },
  {
    uf: 'MG',
    nome: 'Minas Gerais',
    ddd: 31
  },
  {
    uf: 'MS',
    nome: 'Mato Grosso do Sul',
    ddd: 67
  },
  {
    uf: 'MT',
    nome: 'Mato Grosso',
    ddd: 65
  },
  {
    uf: 'PA',
    nome: 'Pará',
    ddd: 91
  },
  {
    uf: 'PB',
    nome: 'Paraíba',
    ddd: 83
  },
  {
    uf: 'PE',
    nome: 'Pernambuco',
    ddd: 81
  },
  {
    uf: 'PI',
    nome: 'Piauí',
    ddd: 86
  },
  {
    uf: 'PR',
    nome: 'Paraná',
    ddd: 41
  },
  {
    uf: 'RJ',
    nome: 'Rio de Janeiro',
    ddd: 21
  },
  {
    uf: 'RN',
    nome: 'Rio Grande do Norte',
    ddd: 84
  },
  {
    uf: 'RO',
    nome: 'Rondônia',
    ddd: 69
  },
  {
    uf: 'RR',
    nome: 'Roraima',
    ddd: 95
  },
  {
    uf: 'RS',
    nome: 'Rio Grande do Sul',
    ddd: 51
  },
  {
    uf: 'SC',
    nome: 'Santa Catarina',
    ddd: 47
  },
  {
    uf: 'SE',
    nome: 'Sergipe',
    ddd: 79
  },
  {
    uf: 'SP',
    nome: 'São Paulo',
    ddd: 11
  },
  {
    uf: 'TO',
    nome: 'Tocantins',
    ddd: 63
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const e of estados) {
    const estado = await prisma.estado.create({
      data: e,
    })
    console.log(`Created estado with id: ${estado.id}`)
  }

  const ufAP = await prisma.estado.findFirst({
    where: {
      uf: {
        equals: 'AP'
      }
    }
  })

  for (const r of roles) {
    const role = await prisma.role.create({
      data: r
    })
    console.log(`Created role with id: ${role.id}`)
  }

  for (const s of situacoesPoa) {
    const situacaoPoa = await prisma.situacaoPoa.create({
      data: s
    })
    console.log(`Created role with id: ${situacaoPoa.id}`)
  }

  const roleAdmin = await prisma.role.findFirst({
    where: {
      name: {
        equals: 'Admin'
      }
    }
  })

    const projeto = await prisma.projeto.create({
      data: {
        nome: 'Projeto Inicial'
      }
    })

    const categorias: Prisma.CategoriaEspecieCreateInput[] = [
      {
        nome: 'Não definida',
        criterio_fuste: 999,
        criterio_dminc: 999,
        criterio_dmaxc: 999,
        criterio_n_min: 999,
        criterio_perc_min: 999,
        preservar: true,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'COMERCIAL 50+',
        criterio_fuste: 2,
        criterio_dminc: 50,
        criterio_dmaxc: 999,
        criterio_n_min: 3,
        criterio_perc_min: 10,
        preservar: false,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'COMERCIAL 55+',
        criterio_fuste: 2,
        criterio_dminc: 55,
        criterio_dmaxc: 999,
        criterio_n_min: 3,
        criterio_perc_min: 10,
        preservar: false,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'COMERCIAL 70+',
        criterio_fuste: 2,
        criterio_dminc: 70,
        criterio_dmaxc: 999,
        criterio_n_min: 3,
        criterio_perc_min: 10,
        preservar: false,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'VULNERAVEL 50+',
        criterio_fuste: 2,
        criterio_dminc: 50,
        criterio_dmaxc: 999,
        criterio_n_min: 4,
        criterio_perc_min: 15,
        preservar: false,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'VULNERAVEL 55+',
        criterio_fuste: 2,
        criterio_dminc: 55,
        criterio_dmaxc: 999,
        criterio_n_min: 4,
        criterio_perc_min: 15,
        preservar: false,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'VULNERAVEL 70+',
        criterio_fuste: 2,
        criterio_dminc: 70,
        criterio_dmaxc: 999,
        criterio_n_min: 4,
        criterio_perc_min: 15,
        preservar: false,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'PROTEGIDA',
        criterio_fuste: 999,
        criterio_dminc: 999,
        criterio_dmaxc: 999,
        criterio_n_min: 999,
        criterio_perc_min: 999,
        preservar: true,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      },
      {
        nome: 'NÃO SELECIONADA',
        criterio_fuste: 999,
        criterio_dminc: 999,
        criterio_dmaxc: 999,
        criterio_n_min: 999,
        criterio_perc_min: 999,
        preservar: true,
        criterio_altura: 999,
        criterio_volume: 999,
        projeto: {
          connect: {
            id: projeto?.id
          }
        }
      }
    ]

    const user = await prisma.user.create({
      data: {
            username: 'michaelsoliveira',
            email: 'michaelsoliveira@gmail.com',
            password: await bcrypt.hash('Fms237691', 10),
            id_projeto_ativo: projeto?.id,
            users_roles: {
              create: [
                  {
                      projeto: {
                          connect: {
                              id: projeto?.id
                          }
                      },
                      roles: {
                        connect: {
                          id: roleAdmin?.id
                        }
                      }
                  }
              ]
            }
        },
    })
    console.log(`Created user admin with id: ${user.id}`)

    const detentor = await prisma.pessoa.create({
      include: {
        pessoaJuridica: true
      },
        data: {
          tipo: 'J',
            endereco: {
              create: {
                logradouro: 'BR 210',
                municipio: 'Macapá',
                estado: {
                  connect: {
                    id: ufAP?.id
                  }
                }
              }
            },
            pessoaJuridica: {
              create: {
                cnpj: '322390487',
                nome_fantasia: 'iFlorestas - Gerenciamento Florestal Sustentável',
                razao_social: 'iFlorestal SA'
              }
            },
            projeto: {
              connect: {
                id: projeto?.id
              }
            }
        },
    })
    
    console.log(`Detentor criada com o id: ${detentor.id}`)

    for (const obs of observacoes) {
      const obsModelo = await prisma.observacaoArvore.create({
        data: {
          ...obs
        }
      })

      console.log(`Created observacao with id: ${obsModelo.id}`)
    }

    for (const sit of situacaoArvores) {
      const situacao = await prisma.situacaoArvore.create({
        data: {
          ...sit
        }
      })

      console.log(`Created situacao_arvore with id: ${situacao.id}`)
    }

    for (const eqModelo of equacoesModelo) {
      const equacaoModelo = await prisma.equacaoModelo.create({
        data: {
          ...eqModelo
        },
      })
      console.log(`Created user Equação Modelo with id: ${equacaoModelo.id}`)
    }

    for (const categoria of categorias) {
      const equacaoModelo = await prisma.categoriaEspecie.create({
        data: {
          ...categoria
        },
      })
      console.log(`Created user Equação Modelo with id: ${equacaoModelo.id}`)
    }

    for (const motivo of motivosPreservacao) {
      const motivoPreservacao = await prisma.motivoPreservacao.create({
        data: {
          ...motivo
        },
      })
      console.log(`Created motivo_preservacao with id: ${motivoPreservacao.id}`)
    }

    for (const eqVolume of equacoesVolume) {
      const equacaoVolume = await prisma.equacaoVolume.create({
        data: {
          ...eqVolume,
          projeto: {
            connect: {
              id: projeto?.id
            }
          }
        },
        
      })
      console.log(`Created user Equação Volume with id: ${equacaoVolume.id}`)
    }
  
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })