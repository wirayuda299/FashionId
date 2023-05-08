interface Filters {
  id: number;
  title: string;
  value: string
}
export const sortMenu: Filters[] = [
  {
    id: 1,
    title: 'asc',
    value: 'Sort by Ascending',
  },
  {
    id: 2,
    title: 'desc',
    value: 'Sort by Descending',
  },
  {
    id: 3,
    title: 'lowest',
    value: 'Low to High',
  },

  {
    id: 4,
    title: 'highest',
    value: 'High to Low',
  },
];