const PessoaFisica = ({register, styles, errors}: any) => {
    return (<>      
        <div className="col-span-6 w-full lg:w-4/6">
            <label htmlFor="nome" className={styles.fieldLabel}>Nome</label>
            <input
                {...register('nome')}
                type="text" name="nome" id="nome" className={styles.fieldText} />
                <p className='text-sm text-red-500 mt-1'>{errors.nome?.message}</p>
        </div>
        <div className="col-span-3 w-48">
            <label htmlFor="cpf_cnpj" className={styles.fieldLabel}>CPF</label>
            <input
                {...register('cpf_cnpj')}
                type="text" name="cpf_cnpj" id="cnpj" className={styles.fieldText}
            />
            <p className='text-sm text-red-500 mt-1'>{errors.cpf_cnpj?.message}</p>
        </div>
        <div className="sm:col-span-3 w-48">
            <label htmlFor="rg_inscricao" className={styles.fieldLabel}>RG</label>
            <input
                {...register('rg_inscricao')}
                type="text" name="rg_inscricao" id="cnpj" className={styles.fieldText}
            />
            <p className='text-sm text-red-500 mt-1'>{errors.rg_inscricao?.message}</p>
        </div>
    </>)
}

export default PessoaFisica