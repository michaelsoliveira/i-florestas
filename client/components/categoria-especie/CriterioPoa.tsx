export const CriterioPoa = ({ checkedCategorias, categorias, handleSelectAllCategorias, handleSelectCategoria }: any) => {
    return (
        <div id='criterios'>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {checkedCategorias && (
                            <th className="w-1/12">
                                <div className="flex justify-center">
                                <input  
                                    checked={checkedCategorias?.length === categorias?.length}
                                    onChange={handleSelectAllCategorias}                
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                />
                                </div>
                            </th>
                        )}
                        <th
                            className="w-4/12"
                        >
                            <span className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                Nome
                            </span>        
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Fuste
                        </th>
                        <th
                            scope="col"
                            className="w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Diametro Mínimo
                        </th>
                        <th
                            scope="col"
                            className="w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Diametro Máximo
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Altura
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Volume
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Preservada
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {categorias?.map((categoria: any) => (
                    <tr key={categoria.id}>
                        { checkedCategorias && (
                            <td className="flex justify-center">
                                <input                 
                                    value={categoria?.id}
                                    checked={checkedCategorias.includes(categoria?.id)}
                                    onChange={handleSelectCategoria}
                                    id="poaId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                        ) }
                        <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                <div className="text-sm font-medium text-gray-900">{categoria?.nome}</div>
                            </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{categoria?.criterio_fuste}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{categoria?.criterio_dminc}</div>
                            </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{categoria?.criterio_dmaxc}</div>
                            </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{categoria?.criterio_altura}</div>
                            </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{categoria?.criterio_volume}</div>
                            </span>
                        </td> 
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">
                                    {
                                        categoria?.preservar
                                            ? (<div>Sim</div>)
                                            : (<div>Não</div>)
                                    }
                                </div>
                            </span>
                        </td>  
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}