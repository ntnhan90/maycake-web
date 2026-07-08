// data/topping.ts

export type ToppingCategory =
  | "game"
  | "fruit"
  | "chocolate"
  | "flower";

export interface Topping {
  id: number;
  name: string;
  image: string;
  price: number;
  category: ToppingCategory;
}

export const toppings: Topping[] = [
  // Game
  {
    id: 1,
    name: "Minecraft",
    image: "/images/toppings/game/minecraft.png",
    price: 3,
    category: "game",
  },
  {
    id: 2,
    name: "Roblox",
    image: "/images/toppings/game/roblox.png",
    price: 3,
    category: "game",
  },
  {
    id: 3,
    name: "Mario",
    image: "/images/toppings/game/mario.png",
    price: 4,
    category: "game",
  },

  // Fruit
  {
    id: 4,
    name: "Strawberry",
    image: "/images/toppings/fruit/strawberry.png",
    price: 2,
    category: "fruit",
  },
  {
    id: 5,
    name: "Orange",
    image: "/images/toppings/fruit/orange.png",
    price: 2,
    category: "fruit",
  },
  {
    id: 6,
    name: "Blueberry",
    image: "/images/toppings/fruit/blueberry.png",
    price: 3,
    category: "fruit",
  },

  // Chocolate
  {
    id: 7,
    name: "Dark Chocolate",
    image: "/images/toppings/chocolate/dark.png",
    price: 3,
    category: "chocolate",
  },
  {
    id: 8,
    name: "White Chocolate",
    image: "/images/toppings/chocolate/white.png",
    price: 3,
    category: "chocolate",
  },
  {
    id: 9,
    name: "Chocolate Chips",
    image: "/images/toppings/chocolate/chips.png",
    price: 2,
    category: "chocolate",
  },

  // Flower
  {
    id: 10,
    name: "Rose",
    image: "/images/toppings/flower/rose.png",
    price: 4,
    category: "flower",
  },
  {
    id: 11,
    name: "Sunflower",
    image: "/images/toppings/flower/sunflower.png",
    price: 4,
    category: "flower",
  },
  {
    id: 12,
    name: "Tulip",
    image: "/images/toppings/flower/tulip.png",
    price: 4,
    category: "flower",
  },
];