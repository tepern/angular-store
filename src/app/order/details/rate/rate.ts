export class RateTypeId {
  constructor(
    public unit: string,
    public name: string,
    public id: string
  ) {}
} 

export class Rate {
  constructor(
    public updatedAt: bigint,
    public createdAt: bigint,
    public price: bigint,
    public rateTypeId: RateTypeId,
    public id: string
  ) {}
}