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
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow text-left w-full border-2 border-transparent hover:border-blue-500"
    >
      <div className="text-4xl mb-3">{useCase.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
      <p className="text-gray-600 text-sm">{useCase.description}</p>
      <div className="mt-4 text-blue-600 font-medium text-sm">
        Generate Prompt →
      </div>
    </button>
  );
};
