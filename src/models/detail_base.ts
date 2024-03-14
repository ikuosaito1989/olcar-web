/*
  車の詳細の最低限の情報
*/
export interface DetailBase {
  id: number;
  name: string;
  price: number | null;
  mileage: number | null;
  vehicleInspection: string | null;
  unknownVehicleInspection: boolean;
  posted: boolean;
  makerId: number;
  makerName: string;
  images: string[];
  createAt: string;
  comment: string;
  prefecture: string;
  locality: string;
  isSponsor: boolean;
  published: boolean;
}
