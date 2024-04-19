import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase {
    Id: number | undefined = 0;
    SellRent: number = 0;
    Name: string | undefined = '';
    propertyTypeId: number = 0;
    PType: string = '';
    Bhk: number = 0;
    furnishingTypeId: number = 0;
    FType: string = '';
    Price: number = 0;
    BuiltArea: number = 0;
    carpetArea?: number;
    address: string = '';
    address2?: string;
    CityId: number = 0;
    City: string = '';
    floorNo?: string;
    totalFloors?: string;
    ReadyToMove: boolean = false;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean = false;
    maintenance?: number;
    Possession?: string;
    photo?: string;
    description?: string;
}