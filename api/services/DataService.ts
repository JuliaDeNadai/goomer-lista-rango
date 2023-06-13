import { AppDataSource } from '../../ormconfig'
import { ConflictError } from '../utils/internalErrors'

class DataService {

    public async execute(query: string){
        return AppDataSource.query(query)

    }
}

export { DataService }