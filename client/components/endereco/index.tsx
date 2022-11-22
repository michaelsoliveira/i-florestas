const Endereco = ({register, styles, errors}: any) => {
    return (<>
        <div className="col-span-6 w-48 lg:w-48">
            <label htmlFor="CEP" className={styles.fieldLabel}>CEP</label>
            <input
                {...register('cep')}
                type="text" name="cep" id="cep" className={styles.fieldText} />
        </div>

        <div className="col-span-4">
            <label htmlFor="street_address" className={styles.fieldLabel}>Endereço</label>
            <input
                {...register('endereco')}
                type="text" name="endereco" id="endereco" className={styles.fieldText} />
        </div>
        
        <div className="col-span-2 sm:col-span-2">
            <label htmlFor="country" className={styles.fieldLabel}>Estado</label>
                <select 
                    {...register('estado')}
                    id="estado" name="estado" className="mt-1 relative flex w-24 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <option>AP</option>
                    <option>BA</option>
                    <option>PA</option>
                    <option>MA</option>
                </select>
                <p className='text-sm text-red-500 mt-1'>{errors.estado?.message}</p>
        </div>

        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
            <label htmlFor="municipio" className={styles.fieldLabel}>Cidade</label>
            <input
                {...register('municipio')}
                type="text" name="municipio" id="municipio" className={styles.fieldText} />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-3">
            <label htmlFor="complemento" className={styles.fieldLabel}>Complemento</label>
            <input
                {...register('complemento')}
                type="text" name="complemento" id="complemento" className={styles.fieldText} />
        </div>
    </>)
}

export default Endereco