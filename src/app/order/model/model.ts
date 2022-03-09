export class CategoryId {
  constructor(
    public name: string,
    public description: string,
    public id: string
  ) {}
} 

export class Thumbnail {
  constructor (
    public size: bigint,
    public path: string,
    public originalname: string,
    public mimetype: string
  ) {}  
}

export class Model {
  constructor(
    public updatedAt: bigint,
    public createdAt: bigint,
    public description: string,
    public priceMin: bigint,
    public priceMax: bigint,
    public name: string,
    public number: string,
    public categoryId: CategoryId,
    public thumbnail: Thumbnail,
    public tank: bigint,
    public colors: string[],
    public id: string
  ) {}
}   