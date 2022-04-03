export interface Duration { 
  days: number;
  hours: number;
  minutes: number;
}

export class Duration implements Duration{
   constructor(
    public days: number = 0,
    public hours: number = 0,
    public minutes: number = 0
  ) {}
} 

