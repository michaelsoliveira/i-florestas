import authHeader from "./auth-header"

class BaseService {
    protected static instance: BaseService
    protected headers: any

    constructor(instance: any) {
        BaseService.instance = instance
        this.headers = this.initializeHeaders()
    }

    async initializeHeaders() {
        this.headers = await authHeader()
    }

    public static getInstance() {
        if (!BaseService.instance) {
            this.instance = new BaseService(this.instance)
        }

        return BaseService.instance
    }
}

export default BaseService