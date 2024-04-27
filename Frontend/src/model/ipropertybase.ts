export interface IPropertyBase {
    id: number | null | undefined;
    sellRent: number | null;
    name: string | undefined;
    propertyType?: string | null;
    furnishingType?: string | null;
    price: number | null;
    bhk: number | null;
    builtArea: number | null;
    city?: string | null;
    readyToMove: boolean | null;
    photo?: string | null;
    estPossessionOn?: Date | null;
}