import { useState } from 'react';
import type { UseCase } from './data/useCases';
import { useCases } from './data/useCases';
import { UseCaseCard } from './components/UseCaseCard';
import { PromptGenerator } from './components/PromptGenerator';

function App() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">
                ✨ Comet Browser Mastery
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mt-2 font-medium">
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
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-purple-100 hover:shadow-3xl transition-all duration-300">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Welcome to Your AI Assistant Customizer
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                This interactive tool helps you generate perfectly customized AI prompts for your specific
                real estate situations. Simply select a use case below, fill in your details, and get
                a ready-to-use prompt that you can copy directly into any agentic browser (Comet, ChatGPT, Claude).
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-5 mt-4 rounded-r-lg">
                <p className="text-sm text-indigo-900 font-medium">
                  <strong>💡 Pro Tip:</strong> These prompts work best when you provide specific details.
                  The more context you add, the better your AI assistant can help you.
                </p>
              </div>
            </div>

            {/* Use Cases Grid */}
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
                Choose Your Use Case
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="mt-12 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white rounded-2xl shadow-2xl p-8 border border-purple-500">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">About This Tool</h2>
              <p className="text-gray-100 leading-relaxed mb-4 text-lg">
                This workbook was created by <strong className="text-yellow-300">Edmund Bogen</strong>, Luxury Real Estate Advisor,
                Coach & Speaker in South Florida. The strategies in this tool are designed to help real
                estate professionals leverage AI to 10x their productivity.
              </p>
              <div className="border-t border-purple-500 pt-4 mt-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-yellow-300">🔒 Security Notice:</strong> Never input sensitive client information (SSNs, financial details,
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
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-purple-500 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-300 font-medium">
            © 2025 <span className="text-purple-400 font-bold">Edmund Bogen</span> - Comet Browser Mastery Workbook | For Real Estate Professionals
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
