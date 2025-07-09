import React, { useState, useMemo } from "react";
import NumberCard from "./components/NumberCard";
import QuestionCard from "./components/QuestionCard";
import { cards, questionCards, CardData, QuestionCardData } from "./data/cards";
import TinderCard from "react-tinder-card";
import { useTranslation, Trans } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';

// Tipos discriminados para o deck
interface NumberDeckItem {
  type: "number";
  data: CardData;
  question: string;
}
interface QuestionDeckItem {
  type: "question";
  data: QuestionCardData;
}
type DeckItem = NumberDeckItem | QuestionDeckItem;

const numberQuestionKeys = [
  "numberQuestions.1",
  "numberQuestions.2",
  "numberQuestions.3",
  "numberQuestions.4",
  "numberQuestions.5",
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const generateDeck = (): DeckItem[] => {
  const numCards: NumberDeckItem[] = cards.map((c, idx) => ({ type: "number", data: c, question: numberQuestionKeys[idx % numberQuestionKeys.length] }));
  const shuffledQuestions = shuffleArray(questionCards);
  const qCards: QuestionDeckItem[] = shuffledQuestions.map((q) => ({ type: "question", data: q }));
  // Alternar sempre entre número e pergunta, começando por pergunta
  const deck: DeckItem[] = [];
  let i = 0, j = 0;
  while (j < numCards.length) {
    deck.push(numCards[j++]);
    deck.push(qCards[i]);
    i = (i + 1) % qCards.length;
  }
  return deck;
};

// Modal de apresentação com i18n e seletor de idioma
const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full flex flex-col items-center relative">
        <div className="absolute top-2 right-2">
          <LanguageSelector />
        </div>
        <img src="/src/assets/GYA-Logo.png" alt="Logo GYA" className="w-28 h-28 mb-4" />
        <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center">{t('modal.title')}</h2>
        <p className="text-gray-800 text-center mb-6">
          <Trans i18nKey="modal.text">
            Se você tiver entre <span className="font-bold">01 e 63 anos</span> eu garanto que posso adivinhar sua idade!<br/>
            É só você responder minhas perguntas com muita sinceridade.<br/>
            Vamos lá?
          </Trans>
        </p>
        <button
          className="bg-violet-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-violet-800 transition"
          onClick={onClose}
        >
          {t('modal.button')}
        </button>
      </div>
    </div>
  );
};

function App() {
  const [deck, setDeck] = useState<DeckItem[]>(generateDeck());
  const [currentIndex, setCurrentIndex] = useState(deck.length - 1);
  const [age, setAge] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [swipeAnswers, setSwipeAnswers] = useState<{ [idx: number]: string }>({});

  const deckMemo = useMemo(() => deck, [deck]);
  const { t } = useTranslation();

  // Handler de swipe: registra a direção e já atualiza a idade se for SIM
  const handleSwipe = (direction: string, idx: number) => {
    setSwipeAnswers((prev) => ({ ...prev, [idx]: direction }));
    const item = deckMemo[idx];
    if (item.type === "number" && direction === "right") {
      setAge((prev) => prev + item.data.value);
    }
  };

  // Handler quando o card sai da tela
  const handleCardLeftScreen = (idx: number, item: DeckItem) => {
    if (idx === 0) {
      setShowResult(true);
    }
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Handler para botões
  const swipeRef = React.useRef<any[]>([]);
  const handleButton = (idx: number, answer: boolean) => {
    if (swipeRef.current[idx]) {
      swipeRef.current[idx].swipe(answer ? "right" : "left");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-violet-600 flex flex-col items-center justify-start p-0 sm:p-0">
      {showModal && <Modal onClose={() => setShowModal(false)} />}
      <img
        src="/src/assets/GYA-Logo.png"
        alt="Mascote do GYA"
        className="w-32 h-32 sm:w-64 sm:h-64 -mb-8 sm:-mb-12"
      />
      {!showModal && !showResult && (
        <div className="flex items-center justify-center min-h-[420px] w-full relative">
          <div className="relative w-[600px] sm:w-[720px] h-[460px] overflow-hidden flex items-center justify-center mx-auto">
            {deckMemo.map((item, idx) => (
              <TinderCard
                ref={(el) => (swipeRef.current[idx] = el)}
                key={idx}
                className="absolute left-0 right-0 mx-auto flex items-center justify-center"
                onSwipe={(dir) => handleSwipe(dir, idx)}
                onCardLeftScreen={() => handleCardLeftScreen(idx, item)}
                preventSwipe={["up", "down"]}
                swipeRequirementType="position"
                swipeThreshold={120}
              >
                {item.type === "number" ? (
                  <NumberCard
                    card={item.data}
                    question={item.question}
                    onAnswer={(answer) => handleButton(idx, answer)}
                  />
                ) : (
                  <QuestionCard
                    question={item.data.question}
                    image={item.data.image}
                    onAnswer={(answer) => handleButton(idx, answer)}
                  />
                )}
              </TinderCard>
            )).slice(0, currentIndex + 1)}
          </div>
        </div>
      )}
      {showResult && (
        <div className="w-full max-w-xs sm:max-w-md min-h-[320px] sm:min-h-[420px] flex items-center justify-center bg-white/10 rounded-xl p-1 sm:p-4 text-white shadow-xl">
          <div className="flex flex-col items-center w-full gap-2 sm:gap-6">
            <p className="text-xl sm:text-2xl font-bold mb-1 sm:mb-6 text-center">
              <Trans i18nKey="final.title">
                Consegui! Eu sei a sua idade!<br/>Posso revelar?!
              </Trans>
            </p>
            <div className="mb-1 sm:mb-6">
              <span className={`text-3xl sm:text-5xl font-extrabold px-4 sm:px-8 py-2 sm:py-4 rounded-lg bg-white/20 ${!reveal ? "blur-md select-none" : ""}`}>{age}</span>
            </div>
            <div className="h-[56px] sm:h-[64px] flex items-center justify-center w-full mb-2">
              {!reveal ? (
                <button
                  className="bg-white text-violet-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-200 transition"
                  onClick={() => setReveal(true)}
                >
                  {t('final.reveal')}
                </button>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
            <button
              className="bg-violet-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-base sm:text-lg hover:bg-violet-800 transition mt-2"
              onClick={() => {
                const newDeck = generateDeck();
                setDeck(newDeck);
                setAge(0);
                setShowResult(false);
                setReveal(false);
                setCurrentIndex(newDeck.length - 1);
                setSwipeAnswers({});
              }}
            >
              {t('final.playAgain')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 