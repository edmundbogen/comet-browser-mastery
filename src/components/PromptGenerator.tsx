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
    const commonClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

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
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        ← Back to Use Cases
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <span className="text-4xl">{useCase.icon}</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{useCase.title}</h2>
          <p className="text-gray-600 mt-2">{useCase.description}</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); generatePrompt(); }} className="space-y-6">
          {useCase.fields.map(field => (
            <div key={field.id}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Generate Custom Prompt
          </button>
        </form>

        {generatedPrompt && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-gray-900">Your Customized Prompt</h3>
              <button
                onClick={copyToClipboard}
                className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {generatedPrompt}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>💡 Next Steps:</strong> Copy this prompt and paste it into your agentic browser
                (Comet, ChatGPT, Claude) to get instant, customized assistance for your situation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
