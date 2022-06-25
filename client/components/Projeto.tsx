const Projeto = () => {
    return (
        <div>
            <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 w-11/12 max-w-xl sm:mx-auto">
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
                    <form className="w-full">
                        <div className="floating-input mb-5 relative">
                        <input type="text" id="nome" className="input-text" placeholder="Nome" autoComplete="off" />
                        <label className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">Nome</label>
                        </div>
                            <div className="floating-input mb-5 relative">
                        <input type="password" id="password" className="input-text" placeholder="password" autoComplete="off" />
                        <label className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">Password</label>
                        </div>
                        <button className="w-full bg-green-600 text-white p-3 rounded-md">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projeto