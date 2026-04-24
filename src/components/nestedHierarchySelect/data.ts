export type HierarchyDataProps = {
  id: number;
  name: string;
  value: true | false;
  children: HierarchyDataProps[];
};

const hierarchyData: HierarchyDataProps[] = [
  {
    id: 1,
    name: 'Root',
    value: false,
    children: [
      {
        id: 2,
        name: 'Child 1',
        value: false,
        children: [
          {
            id: 3,
            name: 'Child 1-1',
            value: false,
            children: [
              {
                id: 4,
                name: 'Child 1-1-1',
                value: false,
                children: [
                  { id: 5, name: 'Child 1-1-1-1', value: false, children: [] },
                ],
              },
            ],
          },
          { id: 6, name: 'Child 1-2', value: false, children: [] },
          {
            id: 7,
            name: 'Child 1-3',
            value: false,
            children: [
              { id: 8, name: 'Child 1-3-1', value: false, children: [] },
              { id: 9, name: 'Child 1-3-2', value: false, children: [] },
            ],
          },
        ],
      },
      { id: 10, name: 'Child 2', value: false, children: [] },
    ],
  },
];

export default hierarchyData;
