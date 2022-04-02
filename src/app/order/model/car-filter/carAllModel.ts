interface CarAllModel { 
  class: string,
  name: string,
  value: string 
}

enum CAR_MODEL_CLASS { ALL = 'all', ECONOM = 'econom', PREMIUM = 'premium' };

export const carAllModel: CarAllModel[] = [
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

export const defaultCarModel = carAllModel.filter(carModel => carModel.class === CAR_MODEL_CLASS.ALL);

