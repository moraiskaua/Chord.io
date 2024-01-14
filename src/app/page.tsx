import AudioPlayer from './components/AudioPlayer';

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-10 p-20 bg-gray-900">
      <AudioPlayer />
    </main>
  );
};

export default Home;
