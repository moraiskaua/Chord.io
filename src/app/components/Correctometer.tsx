import { TbGuitarPickFilled } from 'react-icons/tb';

interface CorrectometerProps {
  accuracy: number;
}

const Correctometer = ({ accuracy }: CorrectometerProps) => {
  const pointerPositions = {
    right: { position: '-top-5', color: 'text-[#00F5B5]' },
    almostRight: { position: 'top-7', color: 'text-[#23C5C8]' },
    almostAlmostRight: { position: 'top-16', color: 'text-[#39A1CD]' },
    almostMiddleRight: { position: 'top-24', color: 'text-[#4B83D0]' },
    middle: { position: 'top-36', color: 'text-[#6952D6]' },
    almostMiddleWrong: { position: 'bottom-24', color: 'text-[#A22FB4]' },
    almostAlmostWrong: { position: 'bottom-16', color: 'text-[#B825A7]' },
    wrong: { position: '-bottom-5', color: 'text-[#FB037A]' },
  };

  const accuracyRange =
    accuracy <= 43.7
      ? 'wrong'
      : accuracy <= 46.7
      ? 'almostAlmostWrong'
      : accuracy <= 56.7
      ? 'almostMiddleWrong'
      : accuracy <= 74
      ? 'middle'
      : accuracy <= 84
      ? 'almostMiddleRight'
      : accuracy <= 94
      ? 'almostAlmostRight'
      : accuracy <= 99
      ? 'almostRight'
      : 'right';

  const { position, color } = pointerPositions[accuracyRange];

  return (
    <div className="h-full w-[280px] flex flex-col justify-center items-center gap-3">
      <p className="text-2xl font-bold uppercase bg-gradient-to-b from-[#C47BFD] via-[#C47BFD] to-[#343234] inline-block text-transparent bg-clip-text">
        Are you close?
      </p>
      <div className="w-[85%] h-[478px] rounded-[30px] p-12 bg-[#251926] shadow-custom flex items-center">
        <div className="bg-[#534657] h-full w-14 rounded-full p-2 relative">
          <div className="bg-gradient-to-b from-[#00FEC1] via-[#6E49D7] to-[#FB037A] h-full rounded-full" />
          <TbGuitarPickFilled
            className={`rotate-90 absolute left-16 ${position} ${color} transition-all ease-linear`}
            size={80}
          />
        </div>
      </div>
    </div>
  );
};

export default Correctometer;
