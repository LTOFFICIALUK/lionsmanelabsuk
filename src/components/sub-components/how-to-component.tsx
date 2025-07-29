import React, { useEffect } from 'react';
import { HowToStep, HowToSupply, HowToTool, HowToComponentProps } from './how-to-component.types';

const HowToComponent: React.FC<HowToComponentProps> = ({
  title,
  description,
  steps,
  supplies = [],
  tools = [],
  totalTime,
  estimatedCost,
  difficulty,
  className = '',
  showStepNumbers = true,
  maxWidth = '4xl'
}) => {
  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl'
  };

  // Create a URL-friendly ID from the title
  const titleId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Generate structured data for How-to
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description || title,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && { estimatedCost }),
    ...(difficulty && { difficulty }),
    ...(supplies.length > 0 && {
      supply: supplies.map(supply => ({
        '@type': 'HowToSupply',
        name: supply.name,
        ...(supply.image && { image: supply.image })
      }))
    }),
    ...(tools.length > 0 && {
      tool: tools.map(tool => ({
        '@type': 'HowToTool',
        name: tool.name,
        ...(tool.image && { image: tool.image })
      }))
    }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: typeof step.text === 'string' ? step.text : step.name,
      position: index + 1,
      ...(step.image && { image: step.image }),
      ...(step.video && { video: step.video }),
      ...(step.url && { url: step.url })
    }))
  };

  // Add structured data to page head
  useEffect(() => {
    const scriptId = `howto-structured-data-${titleId}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = scriptId;
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [titleId, structuredData]);

  // Render step content (string or React node)
  const renderStepContent = (content: string | React.ReactNode) => {
    if (typeof content === 'string') {
      return <p className="text-gray-700">{content}</p>;
    }
    return content;
  };

  // Format duration for display
  const formatDuration = (duration: string) => {
    // Simple PT30M -> 30 minutes conversion
    const match = duration.match(/PT(\d+)M/);
    if (match) {
      return `${match[1]} minutes`;
    }
    return duration;
  };

  return (
    <article className={`${maxWidthClasses[maxWidth]} mx-auto mb-12 ${className}`}>
      <header className="mb-8">
        <h1 
          id={titleId}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          itemProp="name"
        >
          {title}
        </h1>
        {description && (
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed" itemProp="description">
            {description}
          </p>
        )}
        
        {/* How-to meta information */}
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
          {totalTime && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Duration: {formatDuration(totalTime)}</span>
            </div>
          )}
          {difficulty && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Difficulty: {difficulty}</span>
            </div>
          )}
          {estimatedCost && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span>Estimated Cost: {estimatedCost.currency} {estimatedCost.value}</span>
            </div>
          )}
        </div>
      </header>

      <div itemScope itemType="https://schema.org/HowTo">
        {/* Supplies Section */}
        {supplies.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Need</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {supplies.map((supply, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {supply.image && (
                    <img 
                      src={supply.image} 
                      alt={supply.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span className="font-medium text-gray-900">{supply.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools Section */}
        {tools.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tools Required</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {tool.image && (
                    <img 
                      src={tool.image} 
                      alt={tool.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span className="font-medium text-gray-900">{tool.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Steps Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Instructions</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex gap-4 p-6 bg-white border rounded-lg shadow-sm"
                itemScope 
                itemType="https://schema.org/HowToStep"
              >
                {showStepNumbers && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    {step.name}
                  </h3>
                  <div className="[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mt-1 [&_p]:mb-3 [&_p:last-child]:mb-0" itemProp="text">
                    {renderStepContent(step.text)}
                  </div>
                  {step.image && (
                    <img 
                      src={step.image} 
                      alt={step.name}
                      className="mt-4 rounded-lg max-w-full h-auto"
                      itemProp="image"
                    />
                  )}
                  {step.video && (
                    <video 
                      src={step.video}
                      controls
                      className="mt-4 rounded-lg max-w-full h-auto"
                      itemProp="video"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export default HowToComponent; 