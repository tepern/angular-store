interface CarService { 
  id: string;
  name: string;
  price: number;
  checked: boolean;
}

export const carAllService: CarService[] = [
  {
    'id': 'fullTank',
    'name': 'Полный бак',
    'price': 500,
    'checked': false
  }, 
  {
    'id': 'childSeat',
    'name': 'Детское кресло',
    'price': 200,
    'checked': false
  },
  {
    'id': 'rightHandDrive',
    'name': 'Правый руль',
    'price': 1600,
    'checked': false
  }
];