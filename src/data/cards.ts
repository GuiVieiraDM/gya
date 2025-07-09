export interface CardData {
  id: number;
  value: number;
  numbers: number[];
  color: string;
}

export const cards: CardData[] = [
  {
    id: 1,
    value: 1,
    color: "bg-blue-500",
    numbers: Array.from({ length: 64 }, (_, i) => i + 1).filter(n => n & 1),
  },
  {
    id: 2,
    value: 2,
    color: "bg-purple-500",
    numbers: Array.from({ length: 64 }, (_, i) => i + 1).filter(n => n & 2),
  },
  {
    id: 3,
    value: 4,
    color: "bg-yellow-400",
    numbers: Array.from({ length: 64 }, (_, i) => i + 1).filter(n => n & 4),
  },
  {
    id: 4,
    value: 8,
    color: "bg-indigo-500",
    numbers: Array.from({ length: 64 }, (_, i) => i + 1).filter(n => n & 8),
  },
  {
    id: 5,
    value: 16,
    color: "bg-orange-400",
    numbers: Array.from({ length: 64 }, (_, i) => i + 1).filter(n => n & 16),
  },
  {
    id: 6,
    value: 32,
    color: "bg-sky-500",
    numbers: Array.from({ length: 64 }, (_, i) => i + 1).filter(n => n & 32),
  },
];

export interface QuestionCardData {
  question: string;
  image: string;
}

export const questionCards: QuestionCardData[] = [
  { question: "Você sabe o que é um telefone público?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você já usou internet discada?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você lembra da época do Orkut?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você usava MSN Messenger?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você já alugou um filme em locadora?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você usava disquete?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você assistia TV Globinho?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você já jogou Super Nintendo?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você usava celular com antena?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você ouviu música em fita cassete?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você sabe o que é BTS?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você já jogou Roblox?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você usa TikTok todos os dias?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você sabe o que é Trap?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você já viu um influencer ao vivo?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você já fez dancinha no Reels ou TikTok?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você joga Fortnite?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você já fez compras pelo Shopee?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você tem um canal no YouTube ou TikTok?", image: "/src/assets/GYA-Logo.png" },
  { question: "Você assiste stream na Twitch?", image: "/src/assets/GYA-Logo.png" },
];
