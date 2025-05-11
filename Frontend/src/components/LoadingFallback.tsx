const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      <span className="ml-3 text-indigo-600 font-medium">Loading...</span>
    </div>
  );
};

export default LoadingFallback;
