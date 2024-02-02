const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full absolute bg-gray-950/35">
      <div className="w-12 h-12 border-4 border-t-tertiary border-t-4 border-primary rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
