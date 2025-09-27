import LakesideBackground from '../LakesideBackground';

export default function LakesideBackgroundExample() {
  return (
    <LakesideBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">湖邊釣魚遊戲</h1>
          <p className="text-gray-600 mt-2">Beautiful lakeside scenery</p>
        </div>
      </div>
    </LakesideBackground>
  );
}