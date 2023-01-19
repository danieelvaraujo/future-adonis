import BusinessTime from "App/Models/BusinessTime";
import StoresRepository from "App/Repositories/StoresRepository";
import FilterPossibilitiesService from "App/Services/FilterPossibilitiesService";
import Days from "Contracts/Enums/Days";
import { getDataGMT } from "./Helpers/getDataGMT";

export default class IsOpenController {
    public async isOpen ({ request, response }): Promise<any> {        
        const storeToCheck = await StoresRepository.findById(request.requestData.store)

        if (!storeToCheck) {
            return response.notFound({ message: "A não foi encontrada"});
        }

        const dateToCheck = request.requestData.data
        const dateGMT = getDataGMT(dateToCheck)
        
        const weekDay = Object.values(Days).slice(0, 7)[dateGMT.getUTCDay()]         

        const possibilities = await BusinessTime.query().where({day: weekDay, store_id: storeToCheck.id})
        const filterResults = FilterPossibilitiesService.applyFilter(possibilities, dateGMT)

        return response.ok({
            isOpen: filterResults.length > 0            
        })               
    }
}
