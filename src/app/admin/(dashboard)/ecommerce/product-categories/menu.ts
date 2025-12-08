export const treeMenu = [
  {
    id: 1,
    title: "Dashboard",
    href: "/dashboard",
    children: [],
  },
  {
    id: 2,
    title: "Users",
     href: "/products",
    children: [
      {
        id: 3,
        title: "User List",
         href: "/products",
        children: [],
      },
      {
        id: 4,
        title: "Roles",
         href: "/products",
        children: [
          {
            id: 5,
            title: "Role List",
             href: "/products",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Settings",
     href: "/products",
    children: [],
  },
];
