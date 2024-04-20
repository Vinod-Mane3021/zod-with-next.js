import { errorMessages } from "@/constants/validationMessages"

export const joinStrings = (stringList: string[] | undefined): string => {
    if(stringList && stringList.length > 0) {
        return stringList.join(', ')
    }
    return errorMessages.invalidQueryParams
}