import AudioPlayer from './components/AudioPlayer';

const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-center gap-10 p-20 bg-gray-900">
      <AudioPlayer note="C3" />
      <AudioPlayer note="D3" />
      <AudioPlayer note="E3" />
      <AudioPlayer note="F3" />
      <AudioPlayer note="G3" />
      <AudioPlayer note="A3" />
      <AudioPlayer note="B3" />
      <AudioPlayer note="C4" />
    </main>
  );
};

export default Home;
