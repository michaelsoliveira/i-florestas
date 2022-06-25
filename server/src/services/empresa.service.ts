import { Empresa } from "../entities/Empresa";
import { getRepository, ILike } from "typeorm";
import { User } from "../entities/User";

interface EmpresaRequest {
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: string,
    respTecnico: string,
    creaResp: string,
    cep: string,
    endereco: string,
    complemento: string,
    municipio: string,
    estado: string,
    telefone: string,
    regAmbiental: string
}

class EmpresaService {
    async create(data: EmpresaRequest, userId: any): Promise<Empresa | any> {
        const repositoryEmpresa = getRepository(Empresa)
        const empresaExists = await repositoryEmpresa.findOne({ where: { razaoSocial: data?.razaoSocial } })
        
        if (empresaExists) {
            throw new Error("Já existe uma empresa cadastrado com estas informações")
        }
        const user = await this.getUser(userId)

        const withUser = {
            // users: [user],
            ...data
        }
        
        const empresa = repositoryEmpresa.create(data)
        empresa.users = [user]

        await empresa.save()
        
        return empresa
    }

    async getUser(id: string): Promise<User> {
        const user = await getRepository(User).findOne(id)
        if (!user) throw new Error("Usuário não encontrada"); 

        return user
    }

    async update(id: string, data: any, userId: any): Promise<Empresa> {
        
        const user = await this.getUser(userId)
        
        const withUser = {
            user,
            ...data
        }
        await getRepository(Empresa).update(id, data);

        return this.findOne(id)
        // return userData
    }

    async delete(id: string): Promise<void> {
        await getRepository(Empresa).delete(id)
            .then(response => {
                console.log(response)
            })
    }

    async getAll(userId: any): Promise<Empresa[]> {
        
        let query = getRepository(Empresa).createQueryBuilder("empresa")
            .innerJoin("empresa.users", "users")
            query.where("users.id = :id", { id: userId })
        const empresas = await query.getMany()

        return empresas;
    }

    async getUsers(empresaId: string, query?: any): Promise<any> {
        const { perPage, page, order, search, orderBy } = query
        const skip = (page - 1) * perPage

        const [data, total] = await getRepository(User).createQueryBuilder('user')
            // .select(['user.id AS user_id', 'user.username', 'user.email'])
            .innerJoin('user.empresas', 'empresa')
            .skip(skip)
            .take(perPage)
            .where({
                username: search ? ILike(`%${search}%`) : ILike('%%')
            })
            .andWhere('empresa.id = :empresaId', { empresaId })
            .orderBy(orderBy, order ? order : 'ASC')
            .getManyAndCount()
                
        // const users = await query.getManyAndCount()

        // if(!users) throw new Error('Nenhum usuário cadastrado')

        return {
            orderBy,
            order,
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async findOne(id: string): Promise<Empresa> {
        const empresa = await getRepository(Empresa).findOne({ where: { id } });
        if (!empresa) throw new Error("Empresa não encontrada"); 

        return empresa
    }
}

export default new EmpresaService()