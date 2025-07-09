import React, { useRef, useState } from "react";

interface Props {
  question: string;
  image?: string;
  onAnswer: (answer: boolean) => void;
  fadeOut?: "left" | "right" | null;
}

const SWIPE_THRESHOLD = 120;

const QuestionCard: React.FC<Props> = ({ question, image, onAnswer, fadeOut }) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  // Mouse/touch handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (fadeOut) return;
    setIsDragging(true);
    if ("touches" in e) {
      startX.current = e.touches[0].clientX;
    } else {
      startX.current = e.clientX;
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || fadeOut) return;
    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    setDragX(clientX - startX.current);
  };

  const handleDragEnd = () => {
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
      className={`w-[280px] sm:w-[360px] min-h-[380px] h-[420px] flex flex-col justify-between items-center p-4 sm:p-6 rounded-xl text-black shadow-xl bg-white`}
      style={style}
      onMouseDown={handleDragStart}
      onMouseMove={isDragging ? handleDragMove : undefined}
      onMouseUp={isDragging ? handleDragEnd : undefined}
      onMouseLeave={isDragging ? handleDragEnd : undefined}
      onTouchStart={handleDragStart}
      onTouchMove={isDragging ? handleDragMove : undefined}
      onTouchEnd={isDragging ? handleDragEnd : undefined}
    >
      <p className="text-xl font-bold text-center mb-4">{question}</p>
      {image && (
        <img src={image} alt="Pergunta" className="w-full h-40 sm:h-48 object-contain mb-8 mt-2" />
      )}
      <div className="flex justify-center gap-4 mt-2 w-full">
        <button
          onClick={() => handleButton(false)}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 font-semibold w-1/2 transition order-1"
        >
          Não
        </button>
        <button
          onClick={() => handleButton(true)}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 font-semibold w-1/2 transition order-2"
        >
          Sim
        </button>
      </div>
    </div>
  );
};

export default QuestionCard; 