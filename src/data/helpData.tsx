import { TbTargetArrow } from 'react-icons/tb';
import { IoGameController } from 'react-icons/io5';
import { GiPerspectiveDiceSixFacesRandom as LuckyCube } from 'react-icons/gi';

export const helpData = [
  {
    keyword: 'Normal Mode',
    message:
      'In Normal Mode, a new chord challenge awaits you every day. Your objective is to correctly identify the randomly generated chord. This mode offers a structured approach to learning, providing daily opportunities to test and refine your musical ear.',
    icon: <IoGameController />,
  },
  {
    keyword: 'Playground Mode',
    message:
      'Explore chords freely in Playground Mode. Here, you have the freedom to experiment with different chord combinations and sounds at your own pace. This mode is ideal for honing your skills, allowing for hands-on exploration and deeper understanding of music theory concepts.',
    icon: <LuckyCube />,
  },
  {
    keyword: 'Correctometer',
    message:
      'The Correctometer is your ally in mastering chord identification. It provides real-time feedback on the accuracy of your guesses, helping you track your progress and identify areas for improvement. Utilize this tool to enhance your musical proficiency and confidence.',
    icon: <TbTargetArrow />,
  },
];
