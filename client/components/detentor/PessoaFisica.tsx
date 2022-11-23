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
                {...register('pessoaFisica.cpf')}
                type="text" name="cpf" id="cpf" className={styles.fieldText}
            />
            <p className='text-sm text-red-500 mt-1'>{errors.cpf_cnpj?.message}</p>
        </div>
        <div className="sm:col-span-3 w-48">
            <label htmlFor="rg" className={styles.fieldLabel}>RG</label>
            <input
                {...register('pessoaFisica.rg')}
                type="text" name="rg" id="rg" className={styles.fieldText}
            />
            <p className='text-sm text-red-500 mt-1'>{errors.rg_inscricao?.message}</p>
        </div>
    </>)
}

export default PessoaFisica