export class CityId {
  constructor(
    public name: string,
    public id: string
  ) {}
} 

export class Point {
  constructor(
    public name: string,
    public address: string,
    public cityId: CityId,
    public id: string
  ) {}
}   