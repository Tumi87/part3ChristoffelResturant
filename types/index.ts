export type Course = 'Starters' | 'Mains' | 'Desserts';

export const COURSES: Course[] = ['Starters', 'Mains', 'Desserts'];

export interface Dish {
  id: string;
  name: string;
  course: Course;
  description: string; // preparation notes
  price: number;
  image?: any; // result of require('../../assets/images/xyz.jpg'), or a { uri: string }
}
