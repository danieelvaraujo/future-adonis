import BusinessTime from "App/Models/BusinessTime";
import BusinessTimesRepository from "App/Repositories/BusinessTimesRepository";
import StoresRepository from "App/Repositories/StoresRepository";
import FilterPossibilitiesService from "App/Services/FilterPossibilitiesService";
import Days from "Contracts/Enums/Days";
import { getDataGMT } from "./Helpers/getDataGMT";
import { messages } from "./Helpers/Messages";

export default class IsOpenController {
    public async isOpen ({ request, response }): Promise<any> {        
        const storeToCheck = await StoresRepository.findById(request.requestData.store)

        if (!storeToCheck) {
            return response.notFound({ message: messages.store.NOT_FOUND });
        }

        const dateToCheck = request.requestData.data
        const dateGMT: Date = getDataGMT(dateToCheck)
        
        const weekDay = Object.values(Days).slice(0, 7)[dateGMT.getUTCDay()]         

        const possibilities: BusinessTime[] | null = await BusinessTimesRepository
            .possibilities(weekDay, storeToCheck.id)
        const filterResults = FilterPossibilitiesService.applyFilter(possibilities, dateGMT)

        return response.ok({
            isOpen: filterResults.length > 0            
        })               
    }
}
