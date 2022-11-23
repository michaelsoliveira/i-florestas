const PessoaJuridica = ({register, styles, errors}: any) => {
    return (<>
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="razao_social" className={styles.fieldLabel}>*Razão Social</label>
            <input
                {...register('pessoaJuridica.razao_social')}
                required
                name="razao_social"
                type="text" id="razao_social" className={styles.fieldText} />
                <p className='text-sm text-red-500 mt-1'>{errors.razao_social?.message}</p>
        </div>
                    
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="nome_fantasia" className={styles.fieldLabel}>Nome Fantasia</label>
            <input
                {...register('nome')}
                type="text" name="nome_fantasia" id="nome_fantasia" className={styles.fieldText} />
                <p className='text-sm text-red-500 mt-1'>{errors.nome?.message}</p>
        </div>
        <div className="col-span-3 sm:col-span-3 w-48">
            <label htmlFor="cnpj" className={styles.fieldLabel}>CNPJ</label>
            <input
                {...register('pessoaJuridica.cnpj')}
                // value={state.nomeFantasia}
                // onChange={handleChange}
                type="text" name="cnpj" id="cnpj" className={styles.fieldText}
            />
            <p className='text-sm text-red-500 mt-1'>{errors.cnpj?.message}</p>
        </div>
        <div className="col-span-3 sm:col-span-3 w-48">
            <label htmlFor="rg_inscricao" className={styles.fieldLabel}>IE</label>
            <input
                {...register('pessoaJuridica.inscricao_estadual')}
                type="text" name="inscricao_estadual" id="inscricao_estadual" className={styles.fieldText}
            />
            <p className='text-sm text-red-500 mt-1'>{errors.rg_inscricao?.message}</p>
        </div>
        <div className="col-span-3 sm:col-span-3 w-48">
            <label htmlFor="inscricao_federal" className={styles.fieldLabel}>Inscrição Federal</label>
            <input
                {...register('pessoaJuridica.inscricao_federal')}
                type="text" name="inscricao_federal" id="inscricao_federal" className={styles.fieldText}
            />
            <p className='text-sm text-red-500 mt-1'>{errors.inscricao_federal?.message}</p>
        </div>
    </>)
}

export default PessoaJuridica