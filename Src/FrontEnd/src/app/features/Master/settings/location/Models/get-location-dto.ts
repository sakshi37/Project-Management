export interface GetLocationDto{
    locationId: number;
    locationName: string;
    locationCode: string;
    locationStatus: boolean;
    cityId:number; 
    cityName:string;
    countryId:number;
    stateId:number;
    stateName: string;
    countryName:string;

  
}
// export interface CreateLocationDto {
//     locationName: string;
//     locationCode: string;
//     createdBy: number ;
// }