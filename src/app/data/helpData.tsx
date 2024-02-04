import { TbTargetArrow } from 'react-icons/tb';
import { IoGameController } from 'react-icons/io5';
import { GiPerspectiveDiceSixFacesRandom as LuckyCube } from 'react-icons/gi';
import { useTranslations } from 'next-intl';

export const HelpModal = () => {
  const t = useTranslations('helpModal');

  const helpData = [
    {
      keyword: t('normalMode.title'),
      message: t('normalMode.message'),
      icon: <IoGameController />,
    },
    {
      keyword: t('playgroundMode.title'),
      message: t('playgroundMode.message'),
      icon: <LuckyCube />,
    },
    {
      keyword: t('correctometer.title'),
      message: t('correctometer.message'),
      icon: <TbTargetArrow />,
    },
  ];

  return helpData.map((item, index) => (
    <div key={index} className="flex flex-col text-gray-300 gap-2.5 md:gap-3.5">
      <div className="flex justify-center items-center font-bold text-white gap-2.5">
        <div className="bg-primary rounded-full p-1 text-md md:p-1.5 md:text-3xl">
          {item.icon}
        </div>
        <h3 className="text-primary text-md md:text-4xl">{item.keyword}</h3>
      </div>
      <p className="font-light mb-3.5 text-[9px] md:text-xl">{item.message}</p>
    </div>
  ));
};
