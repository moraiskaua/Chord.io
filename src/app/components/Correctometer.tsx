import { useTranslations } from 'next-intl';
import { TbGuitarPickFilled } from 'react-icons/tb';
import {
  desktopPointerPositions,
  mobilePointerPositions,
} from '../data/pointersPositions';

interface CorrectometerProps {
  accuracy: number;
  isLoading: boolean;
}

const Correctometer: React.FC<CorrectometerProps> = ({
  accuracy,
  isLoading,
}) => {
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

  const { desktopPosition, desktopColor } =
    desktopPointerPositions[accuracyRange];
  const { mobilePosition, mobileColor } = mobilePointerPositions[accuracyRange];
  const t = useTranslations('Correctometer');

  return (
    <>
      <div
        className={`hidden h-full w-[280px] md:flex flex-col justify-center items-center gap-3 ${
          isLoading && 'opacity-45'
        }`}
      >
        <p className="text-2xl font-bold uppercase bg-gradient-to-b from-[#C47BFD] via-[#C47BFD] to-[#343234] inline-block text-transparent bg-clip-text">
          {t('areClose')}
        </p>
        <div className="w-[85%] h-[478px] rounded-[30px] p-12 bg-[#251926] shadow-custom flex items-center">
          <div className="bg-[#534657] h-full w-14 rounded-full p-2 relative">
            <div className="bg-gradient-to-b from-[#00FEC1] via-[#6E49D7] to-[#FB037A] h-full rounded-full" />
            <TbGuitarPickFilled
              className={`rotate-90 absolute left-16 ${desktopPosition} ${desktopColor} transition-all ease-linear`}
              size={80}
            />
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col items-center m-auto md:hidden fixed top-28 left-1 right-1 w-[90%] h-12 ${
          isLoading && 'opacity-45'
        }`}
      >
        <p className="text-sm font-bold uppercase bg-gradient-to-b from-[#C47BFD] via-[#C47BFD] to-[#343234] inline-block text-transparent bg-clip-text">
          {t('areClose')}
        </p>
        <div className="w-full h-full">
          <div className="bg-[#534657] w-full h-full rounded-full p-1 relative">
            <div className="bg-gradient-to-l from-[#00FEC1] via-[#6E49D7] to-[#FB037A] h-full rounded-full" />
            <TbGuitarPickFilled
              className={`top-7 rotate-180 absolute ${mobilePosition} ${mobileColor} transition-all ease-linear`}
              size={40}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Correctometer;
