import React, { useState } from 'react';
import type { UseCase, PromptField } from '../data/useCases';

interface PromptGeneratorProps {
  useCase: UseCase;
  onBack: () => void;
}

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({ useCase, onBack }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const generatePrompt = () => {
    let prompt = useCase.promptTemplate;

    // Simple template replacement
    useCase.fields.forEach(field => {
      const value = formData[field.id] || '';
      const regex = new RegExp(`{{${field.id}}}`, 'g');
      prompt = prompt.replace(regex, value);
    });

    // Handle conditional blocks
    prompt = prompt.replace(/{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g, (_match, fieldId, content) => {
      return formData[fieldId] ? content : '';
    });

    setGeneratedPrompt(prompt.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderField = (field: PromptField) => {
    const commonClasses = "w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm hover:shadow-md transition-all duration-200";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className={commonClasses}
          />
        );
      case 'select':
        return (
          <select
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            required={field.required}
            className={commonClasses}
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={commonClasses}
          />
        );
      default:
        return (
          <input
            type="text"
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={commonClasses}
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-white px-5 py-2 rounded-full shadow-md hover:shadow-lg"
      >
        <span className="text-lg">←</span>
        <span>Back to Use Cases</span>
      </button>

      <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-2xl p-8 border-2 border-purple-200">
        <div className="mb-8">
          <span className="text-6xl drop-shadow-lg">{useCase.icon}</span>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-4">{useCase.title}</h2>
          <p className="text-gray-700 mt-3 text-lg leading-relaxed">{useCase.description}</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); generatePrompt(); }} className="space-y-6">
          {useCase.fields.map(field => (
            <div key={field.id}>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                {field.label}
                {field.required && <span className="text-pink-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            ✨ Generate Custom Prompt
          </button>
        </form>

        {generatedPrompt && (
          <div className="mt-8 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Your Customized Prompt</h3>
              <button
                onClick={copyToClipboard}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 shadow-inner">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                {generatedPrompt}
              </pre>
            </div>

            <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded-r-xl shadow-md">
              <p className="text-sm text-indigo-900 font-medium">
                <strong className="text-lg">💡 Next Steps:</strong> Copy this prompt and paste it into your agentic browser
                (Comet, ChatGPT, Claude) to get instant, customized assistance for your situation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
