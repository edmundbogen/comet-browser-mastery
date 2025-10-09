import { useState } from 'react';
import type { UseCase } from './data/useCases';
import { useCases } from './data/useCases';
import { UseCaseCard } from './components/UseCaseCard';
import { PromptGenerator } from './components/PromptGenerator';

function App() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Comet Browser Mastery
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Interactive AI Prompt Generator for Real Estate Professionals
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedUseCase ? (
          <>
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Your AI Assistant Customizer
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This interactive tool helps you generate perfectly customized AI prompts for your specific
                real estate situations. Simply select a use case below, fill in your details, and get
                a ready-to-use prompt that you can copy directly into any agentic browser (Comet, ChatGPT, Claude).
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Pro Tip:</strong> These prompts work best when you provide specific details.
                  The more context you add, the better your AI assistant can help you.
                </p>
              </div>
            </div>

            {/* Use Cases Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Choose Your Use Case
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase) => (
                  <UseCaseCard
                    key={useCase.id}
                    useCase={useCase}
                    onClick={() => setSelectedUseCase(useCase)}
                  />
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="mt-12 bg-gray-900 text-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">About This Tool</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                This workbook was created by <strong>Edmund Bogen</strong>, Luxury Real Estate Advisor,
                Coach & Speaker in South Florida. The strategies in this tool are designed to help real
                estate professionals leverage AI to 10x their productivity.
              </p>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-400">
                  <strong>Security Notice:</strong> Never input sensitive client information (SSNs, financial details,
                  legal documents) into AI tools. Use this generator for templates and frameworks, then add
                  client-specific details in your secure systems.
                </p>
              </div>
            </div>
          </>
        ) : (
          <PromptGenerator
            useCase={selectedUseCase}
            onBack={() => setSelectedUseCase(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2025 Edmund Bogen - Comet Browser Mastery Workbook | For Real Estate Professionals
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
