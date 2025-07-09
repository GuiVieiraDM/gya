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
  question: string; // agora é uma chave de tradução
  image: string;
}

export const questionCards: QuestionCardData[] = [
  { question: "questions.telefone_publico", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.internet_discada", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.orkut", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.msn", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.locadora", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.disquete", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.tv_globinho", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.super_nintendo", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.celular_antena", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.fita_cassete", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.bts", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.roblox", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.tiktok_todos_dias", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.trap", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.influencer_ao_vivo", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.dancinha", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.fortnite", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.shopee", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.canal_youtube_tiktok", image: "/src/assets/GYA-Logo.png" },
  { question: "questions.twitch", image: "/src/assets/GYA-Logo.png" },
];
