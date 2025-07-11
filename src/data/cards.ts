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
const payphone = new URL('../assets/questions/payphone.webp', import.meta.url).href;
const dialup = new URL('../assets/questions/dialup-internet.webp', import.meta.url).href;
const orkut = new URL('../assets/questions/ranking-orkut.webp', import.meta.url).href;
const msn = new URL('../assets/questions/msn.webp', import.meta.url).href;
const videostore = new URL('../assets/questions/movies.webp', import.meta.url).href;
const disquete = new URL('../assets/questions/disquete.webp', import.meta.url).href;
const cartoon = new URL('../assets/questions/cartoon.webp', import.meta.url).href;
const snes = new URL('../assets/questions/snes.webp', import.meta.url).href;
const cellphone = new URL('../assets/questions/startac.webp', import.meta.url).href;
const cassette = new URL('../assets/questions/cassete.webp', import.meta.url).href;
const bts = new URL('../assets/questions/bts.webp', import.meta.url).href;
const roblox = new URL('../assets/questions/roblox.webp', import.meta.url).href;
const tiktok = new URL('../assets/questions/tiktok.webp', import.meta.url).href;
const trap = new URL('../assets/questions/trap.webp', import.meta.url).href;
const influencer = new URL('../assets/questions/mrbeast.webp', import.meta.url).href;
const dance = new URL('../assets/questions/tiktokdance.webp', import.meta.url).href;
const fortnite = new URL('../assets/questions/fortnite.webp', import.meta.url).href;
const shopee = new URL('../assets/questions/shopee.webp', import.meta.url).href;
const youtube = new URL('../assets/questions/youtube-channel.webp', import.meta.url).href;
const twitch = new URL('../assets/questions/twitch.webp', import.meta.url).href;

export const questionCards: QuestionCardData[] = [
  { question: "questions.telefone_publico", image: payphone },
  { question: "questions.internet_discada", image: dialup },
  { question: "questions.orkut", image: orkut },
  { question: "questions.msn", image: msn },
  { question: "questions.locadora", image: videostore },
  { question: "questions.disquete", image: disquete },
  { question: "questions.cartoon", image: cartoon },
  { question: "questions.super_nintendo", image: snes },
  { question: "questions.celular_antena", image: cellphone },
  { question: "questions.fita_cassete", image: cassette },
  { question: "questions.bts", image: bts },
  { question: "questions.roblox", image: roblox },
  { question: "questions.tiktok_todos_dias", image: tiktok },
  { question: "questions.trap", image: trap },
  { question: "questions.influencer_ao_vivo", image: influencer },
  { question: "questions.dancinha", image: dance },
  { question: "questions.fortnite", image: fortnite },
  { question: "questions.shopee", image: shopee },
  { question: "questions.canal_youtube_tiktok", image: youtube },
  { question: "questions.twitch", image: twitch },
];
