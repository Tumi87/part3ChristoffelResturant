import React, { createContext, useContext, useMemo, useState } from 'react';
import { Course, Dish } from '../types';

interface MenuContextValue {
  dishes: Dish[];
  addDish: (dish: Omit<Dish, 'id'>) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
  getDish: (id: string) => Dish | undefined;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

// A couple of starter items so the list/stats screens aren't empty on first run.
// Photos live in assets/images — swap these require() paths for your own shots any time.
const seedDishes: Dish[] = [
  {
    id: '1',
    name: 'Braised Lamb Shank',
    course: 'Mains',
    description:
      'Slow-braised lamb shank glazed in a red wine jus, finished with orange zest and chives, served over creamy potato gratin.',
    price: 285,
    image: require('../../assets/images/lamb-shank.jpg'),
  },
  {
    id: '2',
    name: 'Pan-Seared Kingklip',
    course: 'Starters',
    description:
      'Pan-seared kingklip over a fresh pea and herb puree with pearl couscous, finished with micro herbs.',
    price: 165,
    image: require('../../assets/images/pan-seared-kingklip.jpg'),
  },
  {
    id: '3',
    name: 'Mango Panna Cotta',
    course: 'Desserts',
    description:
      'Silky mango panna cotta with a tropical fruit salsa, tuile crisp, and a balsamic reduction.',
    price: 95,
    image: require('../../assets/images/mango-panna-cotta.jpg'),
  },
];

let nextId = seedDishes.length + 1;

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>(seedDishes);

  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish: Dish = { ...dish, id: String(nextId++) };
    setDishes((prev) => [...prev, newDish]);
  };

  const updateDish = (updated: Dish) => {
    setDishes((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  const deleteDish = (id: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const getDish = (id: string) => dishes.find((d) => d.id === id);

  const value = useMemo(
    () => ({ dishes, addDish, updateDish, deleteDish, getDish }),
    [dishes]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = (): MenuContextValue => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within a MenuProvider');
  return ctx;
};

// Helper used by the Chef's Menu screen to build the "Display Menu Statistics" section.
export const getMenuStats = (dishes: Dish[]) => {
  const totalItems = dishes.length;
  const courses: Course[] = ['Starters', 'Mains', 'Desserts'];

  const perCourse = courses.map((course) => {
    const items = dishes.filter((d) => d.course === course);
    const avgPrice =
      items.length > 0
        ? items.reduce((sum, d) => sum + d.price, 0) / items.length
        : 0;
    return { course, count: items.length, avgPrice };
  });

  const overallAvg =
    totalItems > 0 ? dishes.reduce((sum, d) => sum + d.price, 0) / totalItems : 0;

  return { totalItems, perCourse, overallAvg };
};
