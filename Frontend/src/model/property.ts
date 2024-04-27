import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase {
    id: number | undefined = 0;
    sellRent: number = 0;
    name: string | undefined = '';
    propertyTypeId: number = 0;
    propertyType?: string = '';
    bhk: number = 0;
    furnishingTypeId: number = 0;
    furnishingType?: string = '';
    price: number = 0;
    builtArea: number = 0;
    carpetArea?: number;
    address: string = '';
    address2?: string;
    CityId: number = 0;
    city?: string = '';
    floorNo?: number;
    totalFloors?: number;
    readyToMove: boolean = false;
    age?: number;
    mainEntrance?: string;
    security?: number;
    gated?: boolean = false;
    maintenance?: number;
    estPossessionOn?: Date;
    photo?: string;
    description?: string;
}