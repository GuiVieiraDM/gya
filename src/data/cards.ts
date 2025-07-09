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

const logo = new URL('../assets/GYA-Logo.png', import.meta.url).href;

export const questionCards: QuestionCardData[] = [
  { question: "questions.telefone_publico", image: logo },
  { question: "questions.internet_discada", image: logo },
  { question: "questions.orkut", image: logo },
  { question: "questions.msn", image: logo },
  { question: "questions.locadora", image: logo },
  { question: "questions.disquete", image: logo },
  { question: "questions.tv_globinho", image: logo },
  { question: "questions.super_nintendo", image: logo },
  { question: "questions.celular_antena", image: logo },
  { question: "questions.fita_cassete", image: logo },
  { question: "questions.bts", image: logo },
  { question: "questions.roblox", image: logo },
  { question: "questions.tiktok_todos_dias", image: logo },
  { question: "questions.trap", image: logo },
  { question: "questions.influencer_ao_vivo", image: logo },
  { question: "questions.dancinha", image: logo },
  { question: "questions.fortnite", image: logo },
  { question: "questions.shopee", image: logo },
  { question: "questions.canal_youtube_tiktok", image: logo },
  { question: "questions.twitch", image: logo },
];
