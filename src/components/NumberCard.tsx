import React, { useRef, useState, useCallback, useEffect } from "react";
import { CardData } from "../data/cards";
import { useTranslation } from 'react-i18next';

interface Props {
  card: CardData;
  question: string;
  onAnswer: (answer: boolean) => void;
  fadeOut?: "left" | "right" | null;
}

const SWIPE_THRESHOLD = 120;

const NumberCard: React.FC<Props> = ({ card, question, onAnswer, fadeOut }) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const { t } = useTranslation();

  // Mouse handlers (global)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || fadeOut) return;
    setDragX(e.clientX - startX.current);
  }, [isDragging, fadeOut]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (fadeOut) return;
    if (dragX > SWIPE_THRESHOLD) {
      onAnswer(true);
      setDragX(0);
    } else if (dragX < -SWIPE_THRESHOLD) {
      onAnswer(false);
      setDragX(0);
    } else {
      setDragX(0);
    }
  }, [dragX, fadeOut, onAnswer]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch handlers (local)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (fadeOut) return;
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || fadeOut) return;
    setDragX(e.touches[0].clientX - startX.current);
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (fadeOut) return;
    if (dragX > SWIPE_THRESHOLD) {
      onAnswer(true);
      setDragX(0);
    } else if (dragX < -SWIPE_THRESHOLD) {
      onAnswer(false);
      setDragX(0);
    } else {
      setDragX(0);
    }
  };

  // Mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    if (fadeOut) return;
    setIsDragging(true);
    startX.current = e.clientX;
  };

  // Botões
  const handleButton = (answer: boolean) => {
    if (fadeOut) return;
    onAnswer(answer);
  };

  let style: React.CSSProperties = {
    cursor: fadeOut ? "default" : isDragging ? "grabbing" : "grab",
    userSelect: "none",
    transform: `translateX(${dragX}px) rotate(${dragX / 18}deg)`,
    transition: isDragging ? "none" : "transform 0.3s cubic-bezier(.4,1.5,.5,1), opacity 0.35s",
    opacity: 1,
  };
  if (fadeOut === "right") {
    style = {
      ...style,
      transform: "translateX(500px) rotate(18deg)",
      opacity: 0,
      transition: "transform 0.35s, opacity 0.35s",
    };
  } else if (fadeOut === "left") {
    style = {
      ...style,
      transform: "translateX(-500px) rotate(-18deg)",
      opacity: 0,
      transition: "transform 0.35s, opacity 0.35s",
    };
  }

  return (
    <div
      className={`w-[280px] sm:w-[360px] min-h-[380px] h-[420px] flex flex-col justify-between items-center p-4 sm:p-6 rounded-xl text-white shadow-md ${card.color}`}
      style={style}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <p className="text-xl font-bold text-center mb-6">{t(question)}</p>
      <div className="grid grid-cols-8 gap-1 text-base justify-items-center mb-2 bg-white/20 rounded overflow-hidden w-full">
        {card.numbers.map((num) => {
          const bg = Math.floor((num - 1) / 10) % 2 === 0 ? "bg-white/10" : "bg-white/5";
          return (
            <span
              key={num}
              className={`text-center py-3 border-b border-white/20 ${bg} font-bold w-full`}
            >
              {num}
            </span>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 mt-2 w-full">
        <button
          onClick={() => handleButton(false)}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 font-semibold w-1/2 transition order-1"
        >
          {t('numberCard.no')}
        </button>
        <button
          onClick={() => handleButton(true)}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 font-semibold w-1/2 transition order-2"
        >
          {t('numberCard.yes')}
        </button>
      </div>
    </div>
  );
};

export default NumberCard;