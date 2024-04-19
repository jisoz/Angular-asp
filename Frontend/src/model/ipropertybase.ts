export interface IPropertyBase {
    Id: number | null | undefined;
    SellRent: number | null;
    Name: string | undefined;
    PType: string | null;
    FType: string | null;
    Price: number | null;
    Bhk: number | null;
    BuiltArea: number | null;
    City: string | null;
    ReadyToMove: boolean | null;
    photo?: string | null;
    Possession?: string | null;
}