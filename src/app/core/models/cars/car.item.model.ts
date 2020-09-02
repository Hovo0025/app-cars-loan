export interface CarItemModel {
  level: number;
  imageUrl: string;
  generalInformation: {
    year: string;
    brand: string;
    engine: string;
    bodyType: string;
    model: string;
  };
  engineTransmission: {
    fuel: string;
    fuelCapacity: string;
    fuelSupply: string;
  };
  runningFeatures: {
    maxSpeed: string;
    acceleration: string;
  };
  priceData: {
    discount: number;
    price: number;
  };
}
