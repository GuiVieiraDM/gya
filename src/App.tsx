import React, { useState, useMemo, useEffect, useRef } from "react";
import NumberCard from "./components/NumberCard";
import QuestionCard from "./components/QuestionCard";
import { cards, questionCards, CardData, QuestionCardData } from "./data/cards";
import TinderCard from "react-tinder-card";
import { useTranslation, Trans } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import PrivacyModal from "./components/PrivacyModal";
// @ts-ignore
import facebookLogo from './assets/facebook.svg';
// @ts-ignore
import whatsappLogo from './assets/whatsapp.svg';
import { Routes, Route, useNavigate } from 'react-router-dom';

const logo = new URL('./assets/GYA-Logo.png', import.meta.url).href;
const dez19 = new URL('./assets/dez19logo.jpeg', import.meta.url).href;

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
  const shuffledNumCards: NumberDeckItem[] = shuffleArray(cards).map((c, idx) => ({ type: "number", data: c, question: numberQuestionKeys[idx % numberQuestionKeys.length] }));
  const shuffledQuestions = shuffleArray(questionCards);
  const qCards: QuestionDeckItem[] = shuffledQuestions.map((q) => ({ type: "question", data: q }));
  // Alternar sempre entre número e pergunta, começando por pergunta
  const deck: DeckItem[] = [];
  let i = 0, j = 0;
  while (j < shuffledNumCards.length) {
    deck.push(shuffledNumCards[j++]);
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
        <img src={logo} alt="Logo GYA" className="w-28 h-28 mb-4" />
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

function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[320px] sm:min-h-[420px]">
      <div className="w-12 h-12 border-4 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

// Novos componentes de página
const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 mt-8 rounded-xl bg-transparent text-white sm:bg-white sm:text-gray-800 sm:shadow-lg">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 rounded-lg font-semibold text-base bg-violet-200 text-violet-800 hover:bg-violet-300 sm:bg-violet-700 sm:text-white sm:hover:bg-violet-800 transition"
      >
        {t('back')}
      </button>
      <img src={logo} alt={t('about.image_alt')} className="w-24 h-24 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4 text-center text-white sm:text-violet-700">{t('about.title')}</h1>
      <p className="mb-4 text-lg text-justify">{t('about.gya')}</p>
      <h2 className="text-2xl font-bold mb-2 mt-6 text-white sm:text-violet-700">{t('about.dezembro19_title')}</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
        <img src={dez19} alt="Logo Dezembro 19" className="w-40 h-40 rounded-full object-fit bg-gray-200" />
        <p className="text-lg mb-4 text-justify">{t('about.dezembro19')}</p>
      </div>
    </div>
  );
};

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 mt-8 rounded-xl bg-transparent text-white sm:bg-white sm:text-gray-800 sm:shadow-lg">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 rounded-lg font-semibold text-base bg-violet-200 text-violet-800 hover:bg-violet-300 sm:bg-violet-700 sm:text-white sm:hover:bg-violet-800 transition"
      >
        {t('back')}
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center text-white sm:text-violet-700">{t('privacyPage.title')}</h1>
      <p className="mb-4 text-lg text-justify">
        <Trans i18nKey="privacyPage.p1" components={{ 1: <a href="mailto:guivieiradm@gmail.com" className="underline" /> }} />
      </p>
      <h2 className="text-2xl font-bold mb-2 mt-6 text-white sm:text-violet-700">{t('privacyPage.ads_title')}</h2>
      <p className="mb-4 text-lg text-justify">{t('privacyPage.ads')}</p>
      <h2 className="text-2xl font-bold mb-2 mt-6 text-white sm:text-violet-700">{t('privacyPage.security_title')}</h2>
      <p className="mb-4 text-lg text-justify">{t('privacyPage.security')}</p>
    </div>
  );
};

const HowToPlayPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const instructions = t('howToPlay.instructions', { returnObjects: true }) as string[];
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 mt-8 rounded-xl bg-transparent text-white sm:bg-white sm:text-gray-800 sm:shadow-lg">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 rounded-lg font-semibold text-base bg-violet-200 text-violet-800 hover:bg-violet-300 sm:bg-violet-700 sm:text-white sm:hover:bg-violet-800 transition"
      >
        {t('back')}
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center text-white sm:text-violet-700">{t('howToPlay.title')}</h1>
      <p className="mb-4 text-lg text-justify">{t('howToPlay.intro')}</p>
      <ul className="list-disc pl-6 text-lg text-justify mb-2">
        {Array.isArray(instructions) && instructions.map((item, idx) => (
          <li key={idx} className="mb-2">{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Modal de apoio
const SupportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full flex flex-col items-center relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center">{t('support.title')}</h2>
        <div className="text-gray-800 text-center mb-6">
          {t('support.text')}
          <div className="my-2">
            <span className="font-bold text-violet-700 text-lg select-all">{t('support.pix')}</span>
          </div>
          <div>{t('support.thanks')}</div>
        </div>
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
  const [loadingResult, setLoadingResult] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const deckMemo = useMemo(() => deck, [deck]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Modal de apresentação só no primeiro acesso
  useEffect(() => {
    if (window.location.pathname === '/') {
      // Só mostra o modal se não houver gya_modal_shown OU se o usuário recarregar a página
      const alreadyShown = sessionStorage.getItem('gya_modal_shown');
      if (!alreadyShown) {
        setShowModal(true);
        sessionStorage.setItem('gya_modal_shown', '1');
      }
    }
  }, []);

  // Handler de swipe: registra a direção e já atualiza a idade se for SIM
  const handleSwipe = (direction: string, idx: number) => {
    setSwipeAnswers((prev) => ({ ...prev, [idx]: direction }));
    const item = deckMemo[idx];
    if (item.type === "number" && direction === "right") {
      setAge((prev) => prev + item.data.value);
    }
  };

  const showResultWithLoading = () => {
    setLoadingResult(true);
    setTimeout(() => {
      setLoadingResult(false);
      setShowResult(true);
    }, 700);
  };

  const handleCardLeftScreen = (idx: number, item: DeckItem) => {
    if (idx === 0) {
      showResultWithLoading();
    }
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Handler para botões
  const swipeRef = React.useRef<any[]>([]);
  const isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  };

  const handleButton = (idx: number, answer: boolean) => {
    if (isTouchDevice()) {
      // No mobile/touch, avança deck manualmente
      handleSwipe(answer ? "right" : "left", idx);
      handleCardLeftScreen(idx, deckMemo[idx]);
    } else if (swipeRef.current[idx]) {
      // No desktop, swipe animado
      swipeRef.current[idx].swipe(answer ? "right" : "left");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-violet-600 flex flex-col items-center justify-start p-0 sm:p-0 relative">
      {/* H1 e P ocultos para SEO */}
      <h1 style={{ display: 'none' }}>Gya - Descubra sua idade brincando com perguntas e números</h1>
      <p style={{ display: 'none' }}>A Gya é um jogo online que adivinha sua idade usando perguntas de sim ou não e lógica matemática. Experimente e surpreenda-se!</p>
      {/* Botão de apoio flutuante */}
      <button onClick={() => setShowSupport(true)} className="fixed bottom-4 right-4 z-50 bg-violet-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-violet-800 transition font-bold">{t('supportButton')}</button>
      {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
      <Routes>
        <Route path="/" element={
          <>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
            {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
            <img
              src={logo}
              alt="Mascote do GYA"
              className="w-32 h-32 sm:w-64 sm:h-64 -mb-8 sm:-mb-12"
            />
            {!showModal && !showResult && !loadingResult && (
              <div className="flex items-center justify-center min-h-[420px] w-full relative">
                <div className="relative w-[600px] sm:w-[720px] h-[460px] overflow-hidden flex items-center justify-center mx-auto">
                  {isTouchDevice() ? (
                    // Mobile: renderiza só o card atual, sem TinderCard
                    currentIndex >= 0 && (() => {
                      const item = deckMemo[currentIndex];
                      const isLast = currentIndex === 0;
                      const handleAnswer = (answer: boolean) => {
                        if (isLast) {
                          setLoadingResult(true);
                          setShowResult(false);
                          setTimeout(() => {
                            setLoadingResult(false);
                            setShowResult(true);
                          }, 700);
                        }
                        handleSwipe(answer ? "right" : "left", currentIndex);
                        handleCardLeftScreen(currentIndex, item);
                      };
                      if (item.type === "number") {
                        return (
                          <NumberCard
                            card={item.data}
                            question={item.question}
                            onAnswer={handleAnswer}
                          />
                        );
                      } else {
                        return (
                          <QuestionCard
                            question={item.data.question}
                            image={item.data.image}
                            onAnswer={handleAnswer}
                          />
                        );
                      }
                    })()
                  ) : (
                    // Desktop: stack de TinderCard
                    deckMemo.map((item, idx) => {
                      const isLast = idx === 0;
                      const handleAnswer = (answer: boolean) => {
                        if (isLast) {
                          setLoadingResult(true);
                          setShowResult(false);
                          setTimeout(() => {
                            setLoadingResult(false);
                            setShowResult(true);
                          }, 700);
                        }
                        handleButton(idx, answer);
                      };
                      return (
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
                              onAnswer={handleAnswer}
                            />
                          ) : (
                            <QuestionCard
                              question={item.data.question}
                              image={item.data.image}
                              onAnswer={handleAnswer}
                            />
                          )}
                        </TinderCard>
                      );
                    }).slice(0, currentIndex + 1)
                  )}
                </div>
              </div>
            )}
            {loadingResult && !showResult && <Spinner />}
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
                  <div className="flex justify-center w-full mt-2">
                    <button
                      className="bg-violet-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-800 transition min-w-[200px] text-center shadow-lg"
                      onClick={() => {
                        const newDeck = generateDeck();
                        setDeck(newDeck);
                        setAge(0);
                        setShowResult(false);
                        setLoadingResult(false);
                        setReveal(false);
                        setCurrentIndex(newDeck.length - 1);
                        setSwipeAnswers({});
                      }}
                    >
                      {t('final.playAgain')}
                    </button>
                  </div>
                  <div className="flex flex-row gap-3 w-full justify-center mt-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://playgya.com')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex items-center justify-center bg-blue-600 text-white w-14 h-14 rounded-lg hover:bg-blue-700 transition shadow-md"
                      style={{ maxWidth: 56, minWidth: 56 }}
                    >
                      <img src={facebookLogo} alt="Facebook" className="w-7 h-7" />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(t('share.text') + ' https://playgya.com')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="flex items-center justify-center bg-green-500 text-white w-14 h-14 rounded-lg hover:bg-green-600 transition shadow-md"
                      style={{ maxWidth: 56, minWidth: 56 }}
                    >
                      <img src={whatsappLogo} alt="WhatsApp" className="w-7 h-7" />
                    </a>
                  </div>
                </div>
              </div>
            )}
            {/* Rodapé */}
            <footer className="w-full flex flex-col items-center justify-center py-4 mt-8 text-xs sm:text-sm text-white/80 bg-transparent z-10">
              <div className="mb-1 font-semibold">{t('footer.text')}</div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <a href="#/about" className="underline hover:text-white transition text-xs sm:text-sm bg-transparent border-0 p-0 m-0 cursor-pointer">{t('footerLinks.about')}</a>
                <span className="hidden sm:inline">|</span>
                <a href="#/privacy-policy" className="underline hover:text-white transition text-xs sm:text-sm bg-transparent border-0 p-0 m-0 cursor-pointer">{t('footerLinks.privacy')}</a>
                <span className="hidden sm:inline">|</span>
                <a href="#/how-to-play" className="underline hover:text-white transition text-xs sm:text-sm bg-transparent border-0 p-0 m-0 cursor-pointer">{t('footerLinks.howToPlay')}</a>
              </div>
            </footer>
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
      </Routes>
    </div>
  );
}

export default App;

function ShareDropdown({ shareText, t }: { shareText: string, t: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 bg-violet-700 text-white px-5 py-2 rounded-lg font-bold text-base hover:bg-violet-800 transition shadow-md"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M7.05 7.05v.01M16.95 7.05v.01M16.95 16.95v.01M7.05 16.95v.01" /></svg>
        {t('share.button', 'Compartilhe')}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[180px] z-50 flex flex-col py-2 animate-fade-in">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-blue-50 transition font-semibold text-sm"
            onClick={() => setOpen(false)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 transition font-semibold text-sm"
            onClick={() => setOpen(false)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32"><path d="M16.003 3.2c-7.067 0-12.8 5.733-12.8 12.8 0 2.261.603 4.467 1.749 6.4l-2.027 5.867a1.6 1.6 0 0 0 2.027 2.027l5.867-2.027a12.74 12.74 0 0 0 6.4 1.749c7.067 0 12.8-5.733 12.8-12.8s-5.733-12.8-12.8-12.8zm0 23.467a10.62 10.62 0 0 1-5.44-1.515l-.389-.224-6.507 2.25 2.25-6.507-.224-.389a10.667 10.667 0 1 1 10.31 6.385zm5.547-7.893c-.303-.151-1.792-.885-2.07-.985-.277-.101-.48-.151-.682.151-.202.303-.782.985-.96 1.187-.177.202-.354.227-.656.076-.303-.151-1.279-.471-2.438-1.504-.902-.803-1.511-1.792-1.689-2.095-.177-.303-.019-.466.133-.617.137-.136.303-.354.454-.531.151-.177.202-.303.303-.505.101-.202.05-.379-.025-.53-.076-.151-.682-1.646-.934-2.257-.245-.589-.495-.509-.682-.519l-.58-.01c-.202 0-.53.076-.808.379-.277.303-1.06 1.036-1.06 2.528 0 1.492 1.085 2.936 1.236 3.139.151.202 2.139 3.267 5.184 4.454.725.313 1.29.5 1.731.64.727.232 1.389.2 1.911.121.583-.087 1.792-.731 2.045-1.438.253-.707.253-1.313.177-1.438-.076-.126-.277-.202-.58-.354z"/></svg>
            WhatsApp
          </a>
        </div>
      )}
    </div>
  );
} 