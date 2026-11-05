import type { Course } from '../types';

export type FormErrors<K extends string> = Partial<Record<K, string>>;

export interface DishFormValues {
  name: string;
  course: Course;
  description: string;
  price: string;
}

export const MAX_NAME_LENGTH = 60;
export const MIN_DESCRIPTION_LENGTH = 10;
export const MAX_PRICE = 10000;

/** Accepts "285", "285.50" and "285,50". */
export const parsePrice = (raw: string): number => Number(raw.trim().replace(',', '.'));

/** Shared by the Add and Edit screens (was duplicated in both in Part 2). */
export const validateDishForm = (
  values: DishFormValues
): FormErrors<'name' | 'description' | 'price'> => {
  const errors: FormErrors<'name' | 'description' | 'price'> = {};

  const name = values.name.trim();
  if (!name) errors.name = 'Dish name is required.';
  else if (name.length > MAX_NAME_LENGTH)
    errors.name = `Dish name must be ${MAX_NAME_LENGTH} characters or fewer.`;

  const description = values.description.trim();
  if (!description) errors.description = 'Preparation notes are required.';
  else if (description.length < MIN_DESCRIPTION_LENGTH)
    errors.description = `Please enter at least ${MIN_DESCRIPTION_LENGTH} characters.`;

  if (!values.price.trim()) {
    errors.price = 'Price is required.';
  } else {
    const price = parsePrice(values.price);
    if (isNaN(price) || price <= 0) errors.price = 'Enter a valid price greater than 0.';
    else if (price > MAX_PRICE) errors.price = `Price cannot be more than R${MAX_PRICE}.`;
  }
  return errors;
};
