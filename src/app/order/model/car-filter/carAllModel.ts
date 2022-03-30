interface CarModel { 
  class: string,
  name: string,
  value: string 
}

export const carAllModel: CarModel[] = [
  {
    'class': 'all',
    'name': 'Все модели',
    'value': 'Все модели'
  }, 
  {
    'class': 'econom',
    'name': 'Эконом',
    'value': 'Эконом'
  }, 
  {
    'class': 'premium',
    'name': 'Премиум',
    'value': 'Люкс'
  },
];