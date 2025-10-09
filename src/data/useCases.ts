export interface PromptField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: PromptField[];
  promptTemplate: string;
}

export const useCases: UseCase[] = [
  {
    id: 'real-time-analysis',
    title: 'Real-Time Page Analysis',
    description: 'Get instant AI coaching on any webpage you\'re viewing',
    icon: '🔍',
    fields: [
      {
        id: 'pageType',
        label: 'Page Type',
        type: 'select',
        options: ['MLS Listing', 'Agent Website', 'Email Draft', 'Social Media Post', 'Contract/Document'],
        required: true
      },
      {
        id: 'analysisGoal',
        label: 'What do you want to analyze?',
        type: 'textarea',
        placeholder: 'e.g., Check for red flags, pricing concerns, marketing effectiveness',
        required: true
      },
      {
        id: 'context',
        label: 'Additional Context',
        type: 'textarea',
        placeholder: 'e.g., Showing this to a luxury buyer, first-time buyer with $500K budget',
      }
    ],
    promptTemplate: `Analyze this {{pageType}} for {{analysisGoal}}.

{{#if context}}
Context: {{context}}
{{/if}}

Please provide:
- Key observations
- Potential concerns or red flags
- Specific recommendations
- Questions I should ask based on this information`
  },
  {
    id: 'lead-followup',
    title: 'Lead Follow-Up Automation',
    description: 'Generate personalized follow-up sequences that convert',
    icon: '📧',
    fields: [
      {
        id: 'leadType',
        label: 'Lead Type',
        type: 'select',
        options: ['Website Inquiry', 'Open House Visitor', 'Buyer Consultation', 'Seller Lead', 'Past Client', 'Referral'],
        required: true
      },
      {
        id: 'leadSituation',
        label: 'Lead Situation',
        type: 'textarea',
        placeholder: 'e.g., Visited open house yesterday, loved the property but needs to think about it',
        required: true
      },
      {
        id: 'pricePoint',
        label: 'Price Point',
        type: 'text',
        placeholder: 'e.g., $450K',
      },
      {
        id: 'location',
        label: 'Market/Location',
        type: 'text',
        placeholder: 'e.g., South Florida, Miami Beach',
      },
      {
        id: 'tone',
        label: 'Desired Tone',
        type: 'select',
        options: ['Helpful & Consultative', 'Professional & Direct', 'Warm & Friendly', 'Urgent & Action-Oriented'],
        required: true
      },
      {
        id: 'touchpoints',
        label: 'Number of Touchpoints',
        type: 'number',
        placeholder: '5',
        required: true
      },
      {
        id: 'timeframe',
        label: 'Timeframe',
        type: 'text',
        placeholder: 'e.g., 2 weeks, 30 days',
        required: true
      }
    ],
    promptTemplate: `I need a follow-up email sequence for a {{leadType}} who {{leadSituation}}.

{{#if pricePoint}}Price Point: {{pricePoint}}{{/if}}
{{#if location}}Market: {{location}}{{/if}}

Tone should be {{tone}}. Include {{touchpoints}} touchpoints over {{timeframe}}.

For each touchpoint, provide:
- Email subject line
- Email body
- Key value proposition
- Call-to-action
- Optimal send time

Make each touchpoint build on the previous one while adding new value.`
  },
  {
    id: 'expired-fsbo',
    title: 'Expired/FSBO Conversion',
    description: 'Turn expired listings and FSBOs into signed clients',
    icon: '🎯',
    fields: [
      {
        id: 'listingType',
        label: 'Listing Type',
        type: 'select',
        options: ['Expired Listing', 'For Sale By Owner (FSBO)', 'Withdrawn Listing'],
        required: true
      },
      {
        id: 'address',
        label: 'Property Address',
        type: 'text',
        placeholder: 'e.g., 123 Main St, Miami Beach, FL',
        required: true
      },
      {
        id: 'listPrice',
        label: 'Original List Price',
        type: 'text',
        placeholder: 'e.g., $750,000',
      },
      {
        id: 'daysOnMarket',
        label: 'Days on Market',
        type: 'text',
        placeholder: 'e.g., 180 days',
      },
      {
        id: 'propertyDetails',
        label: 'Property Details',
        type: 'textarea',
        placeholder: 'e.g., 4 bed / 3 bath, 2,500 sqft, renovated kitchen',
      },
      {
        id: 'whyExpired',
        label: 'Why It Likely Expired/Issues',
        type: 'textarea',
        placeholder: 'e.g., Overpriced, poor photos, limited marketing',
      }
    ],
    promptTemplate: `Write a personalized outreach letter/email to the owner of {{address}}, a {{listingType}}.

{{#if listPrice}}Original List Price: {{listPrice}}{{/if}}
{{#if daysOnMarket}}Days on Market: {{daysOnMarket}}{{/if}}
{{#if propertyDetails}}Property: {{propertyDetails}}{{/if}}
{{#if whyExpired}}Likely Issues: {{whyExpired}}{{/if}}

Position myself as the solution without criticizing their previous agent or FSBO approach.

Include:
- Empathetic opening acknowledging their situation
- 2-3 specific data-driven insights about their property/market
- My differentiated approach
- Social proof from similar properties I've sold
- Low-pressure call-to-action (free consultation/market analysis)

Tone: Empathetic, consultative, confident but not arrogant.`
  },
  {
    id: 'competitive-analysis',
    title: 'Competitive Listing Analysis',
    description: 'Win listing presentations with data-driven insights',
    icon: '📊',
    fields: [
      {
        id: 'subjectProperty',
        label: 'Subject Property Address',
        type: 'text',
        placeholder: 'e.g., 456 Ocean Dr, Miami Beach',
        required: true
      },
      {
        id: 'propertyType',
        label: 'Property Type & Details',
        type: 'textarea',
        placeholder: 'e.g., 3 bed / 2 bath, 1,800 sqft, waterfront',
        required: true
      },
      {
        id: 'sellerExpectation',
        label: 'Seller Price Expectation',
        type: 'text',
        placeholder: 'e.g., $950,000',
      },
      {
        id: 'compRange',
        label: 'Comparable Listings Range',
        type: 'text',
        placeholder: 'e.g., $850K - $1.1M',
      },
      {
        id: 'marketCondition',
        label: 'Current Market Condition',
        type: 'select',
        options: ['Hot Seller\'s Market', 'Balanced Market', 'Buyer\'s Market', 'Uncertain/Transitioning'],
      },
      {
        id: 'uniqueFeatures',
        label: 'Unique Features/Challenges',
        type: 'textarea',
        placeholder: 'e.g., Recently renovated, needs work, great location but busy street',
      }
    ],
    promptTemplate: `I'm preparing a listing presentation for {{subjectProperty}}.

Property Details: {{propertyType}}
{{#if sellerExpectation}}Seller Expects: {{sellerExpectation}}{{/if}}
{{#if compRange}}Comp Range: {{compRange}}{{/if}}
{{#if marketCondition}}Market: {{marketCondition}}{{/if}}
{{#if uniqueFeatures}}Special Considerations: {{uniqueFeatures}}{{/if}}

Create a comprehensive competitive positioning analysis including:

1. **Pricing Strategy**
   - Recommended list price with data justification
   - Strategic pricing tiers (aggressive/moderate/conservative)
   - Expected days on market for each tier
   - Price adjustment strategy if needed

2. **Market Position**
   - How this compares to active competition
   - Key competitive advantages
   - Potential challenges and solutions

3. **Marketing Plan**
   - Differentiation strategy
   - Target buyer profile
   - Unique marketing tactics
   - Timeline and milestones

4. **Presentation Script**
   - Opening hook
   - Data presentation flow
   - Objection handling
   - Closing technique

Format as a professional presentation I can deliver to the seller.`
  },
  {
    id: 'objection-handling',
    title: 'Objection Response Library',
    description: 'Save deals with instant expert objection responses',
    icon: '💬',
    fields: [
      {
        id: 'objection',
        label: 'Specific Objection',
        type: 'textarea',
        placeholder: 'e.g., "The price is too high" or "We need to think about it"',
        required: true
      },
      {
        id: 'clientType',
        label: 'Client Type',
        type: 'select',
        options: ['Buyer', 'Seller', 'Buyer (first-time)', 'Seller (expired listing)', 'Investor'],
        required: true
      },
      {
        id: 'propertyPrice',
        label: 'Property Price',
        type: 'text',
        placeholder: 'e.g., $650,000',
      },
      {
        id: 'market',
        label: 'Market/Location',
        type: 'text',
        placeholder: 'e.g., South Florida, Miami',
      },
      {
        id: 'context',
        label: 'Situation Context',
        type: 'textarea',
        placeholder: 'e.g., They love the property but think comparable homes sold for less. Actually, recent comps support current price.',
      },
      {
        id: 'urgency',
        label: 'Urgency Factors',
        type: 'textarea',
        placeholder: 'e.g., Multiple offers expected, rates changing, seasonal market shift',
      }
    ],
    promptTemplate: `Create a professional response to this objection: "{{objection}}"

Client Type: {{clientType}}
{{#if propertyPrice}}Property Price: {{propertyPrice}}{{/if}}
{{#if market}}Market: {{market}}{{/if}}
{{#if context}}Situation: {{context}}{{/if}}
{{#if urgency}}Urgency Factors: {{urgency}}{{/if}}

Structure the response using this framework:

1. **Empathy Statement** - Acknowledge their concern genuinely
2. **Reframe** - Change perspective on the issue
3. **Data/Evidence** - Facts that address the concern
4. **Alternative Solution** - If applicable, offer a path forward
5. **Trial Close** - Question or statement to move conversation forward

Tone: Understanding but confident, consultative not defensive.

Provide both:
- Full response script
- Key talking points I can reference quickly`
  },
  {
    id: 'custom-prompt',
    title: 'Custom Prompt Generator',
    description: 'Build your own AI prompt for any real estate situation',
    icon: '✨',
    fields: [
      {
        id: 'situation',
        label: 'Describe Your Situation',
        type: 'textarea',
        placeholder: 'What do you need help with?',
        required: true
      },
      {
        id: 'goal',
        label: 'Desired Outcome',
        type: 'textarea',
        placeholder: 'What result are you trying to achieve?',
        required: true
      },
      {
        id: 'details',
        label: 'Relevant Details',
        type: 'textarea',
        placeholder: 'Property details, client info, market conditions, etc.',
      },
      {
        id: 'format',
        label: 'Preferred Format',
        type: 'select',
        options: ['Email', 'Script', 'Bullet Points', 'Long-form Letter', 'Social Post', 'Presentation'],
      },
      {
        id: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['Professional', 'Friendly', 'Urgent', 'Consultative', 'Educational', 'Persuasive'],
      }
    ],
    promptTemplate: `I need help with: {{situation}}

Goal: {{goal}}

{{#if details}}
Relevant Details: {{details}}
{{/if}}

{{#if format}}Format this as: {{format}}{{/if}}
{{#if tone}}Tone: {{tone}}{{/if}}

Please provide a detailed, actionable response that I can use immediately in my real estate business.`
  }
];
