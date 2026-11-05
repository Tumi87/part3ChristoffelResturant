/** Formats a number as South African Rand, e.g. 285 -> "R285.00". */
export const formatPrice = (amount: number): string => `R${amount.toFixed(2)}`;

/** "1 dish" / "3 dishes" */
export const dishCount = (count: number): string => `${count} ${count === 1 ? 'dish' : 'dishes'}`;
