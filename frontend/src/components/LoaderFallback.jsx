import React from "react";
import { useProgress } from "@react-three/drei";

function LoaderFallback() {
  const { progress } = useProgress()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-spin border-t-transparent"></div>
          <div
            className="absolute inset-4 rounded-full border-4 border-cyan-400 animate-spin border-b-transparent"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">SG</span>
            </div>
          </div>
        </div>
        <div className="text-white/90 text-lg font-medium mb-2">Loading Yohan Sports</div>
        <div className="text-indigo-300 text-sm">Preparing your experience...</div>
        <div className="w-64 h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-blue-500 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.min(100, progress)}%` }}
          ></div>
        </div>
        <div className="text-white/60 text-sm mt-2">{Math.round(progress)}% complete</div>
      </div>
    </div>
  )
}

export default LoaderFallback;