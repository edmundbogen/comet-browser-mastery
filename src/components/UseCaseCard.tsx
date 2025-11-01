import React from 'react';
import type { UseCase } from '../data/useCases';

interface UseCaseCardProps {
  useCase: UseCase;
  onClick: () => void;
}

export const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-7 hover:shadow-2xl transition-all duration-300 text-left w-full border-2 border-purple-200 hover:border-purple-500 hover:scale-105 transform"
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{useCase.icon}</div>
      <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">{useCase.title}</h3>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">{useCase.description}</p>
      <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm group-hover:text-pink-600 transition-colors">
        <span>Generate Prompt</span>
        <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
      </div>
    </button>
  );
};
