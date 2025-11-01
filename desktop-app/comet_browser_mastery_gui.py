#!/usr/bin/env python3
"""
Comet Browser Mastery - Desktop GUI Application
Interactive AI Prompt Generator for Real Estate Professionals

Created by Edmund Bogen
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import re
from typing import Dict, List, Optional

# Use Cases Data
USE_CASES = [
    {
        'id': 'real-time-analysis',
        'title': 'Real-Time Page Analysis',
        'description': 'Get instant AI coaching on any webpage you\'re viewing',
        'icon': '🔍',
        'fields': [
            {
                'id': 'pageType',
                'label': 'Page Type',
                'type': 'select',
                'options': ['MLS Listing', 'Agent Website', 'Email Draft', 'Social Media Post', 'Contract/Document'],
                'required': True
            },
            {
                'id': 'analysisGoal',
                'label': 'What do you want to analyze?',
                'type': 'textarea',
                'placeholder': 'e.g., Check for red flags, pricing concerns, marketing effectiveness',
                'required': True
            },
            {
                'id': 'context',
                'label': 'Additional Context',
                'type': 'textarea',
                'placeholder': 'e.g., Showing this to a luxury buyer, first-time buyer with $500K budget',
            }
        ],
        'promptTemplate': '''Analyze this {{pageType}} for {{analysisGoal}}.

{{#if context}}
Context: {{context}}
{{/if}}

Please provide:
- Key observations
- Potential concerns or red flags
- Specific recommendations
- Questions I should ask based on this information'''
    },
    {
        'id': 'lead-followup',
        'title': 'Lead Follow-Up Automation',
        'description': 'Generate personalized follow-up sequences that convert',
        'icon': '📧',
        'fields': [
            {
                'id': 'leadType',
                'label': 'Lead Type',
                'type': 'select',
                'options': ['Website Inquiry', 'Open House Visitor', 'Buyer Consultation', 'Seller Lead', 'Past Client', 'Referral'],
                'required': True
            },
            {
                'id': 'leadSituation',
                'label': 'Lead Situation',
                'type': 'textarea',
                'placeholder': 'e.g., Visited open house yesterday, loved the property but needs to think about it',
                'required': True
            },
            {
                'id': 'pricePoint',
                'label': 'Price Point',
                'type': 'text',
                'placeholder': 'e.g., $450K',
            },
            {
                'id': 'location',
                'label': 'Market/Location',
                'type': 'text',
                'placeholder': 'e.g., South Florida, Miami Beach',
            },
            {
                'id': 'tone',
                'label': 'Desired Tone',
                'type': 'select',
                'options': ['Helpful & Consultative', 'Professional & Direct', 'Warm & Friendly', 'Urgent & Action-Oriented'],
                'required': True
            },
            {
                'id': 'touchpoints',
                'label': 'Number of Touchpoints',
                'type': 'number',
                'placeholder': '5',
                'required': True
            },
            {
                'id': 'timeframe',
                'label': 'Timeframe',
                'type': 'text',
                'placeholder': 'e.g., 2 weeks, 30 days',
                'required': True
            }
        ],
        'promptTemplate': '''I need a follow-up email sequence for a {{leadType}} who {{leadSituation}}.

{{#if pricePoint}}Price Point: {{pricePoint}}{{/if}}
{{#if location}}Market: {{location}}{{/if}}

Tone should be {{tone}}. Include {{touchpoints}} touchpoints over {{timeframe}}.

For each touchpoint, provide:
- Email subject line
- Email body
- Key value proposition
- Call-to-action
- Optimal send time

Make each touchpoint build on the previous one while adding new value.'''
    },
    {
        'id': 'expired-fsbo',
        'title': 'Expired/FSBO Conversion',
        'description': 'Turn expired listings and FSBOs into signed clients',
        'icon': '🎯',
        'fields': [
            {
                'id': 'listingType',
                'label': 'Listing Type',
                'type': 'select',
                'options': ['Expired Listing', 'For Sale By Owner (FSBO)', 'Withdrawn Listing'],
                'required': True
            },
            {
                'id': 'address',
                'label': 'Property Address',
                'type': 'text',
                'placeholder': 'e.g., 123 Main St, Miami Beach, FL',
                'required': True
            },
            {
                'id': 'listPrice',
                'label': 'Original List Price',
                'type': 'text',
                'placeholder': 'e.g., $750,000',
            },
            {
                'id': 'daysOnMarket',
                'label': 'Days on Market',
                'type': 'text',
                'placeholder': 'e.g., 180 days',
            },
            {
                'id': 'propertyDetails',
                'label': 'Property Details',
                'type': 'textarea',
                'placeholder': 'e.g., 4 bed / 3 bath, 2,500 sqft, renovated kitchen',
            },
            {
                'id': 'whyExpired',
                'label': 'Why It Likely Expired/Issues',
                'type': 'textarea',
                'placeholder': 'e.g., Overpriced, poor photos, limited marketing',
            }
        ],
        'promptTemplate': '''Write a personalized outreach letter/email to the owner of {{address}}, a {{listingType}}.

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

Tone: Empathetic, consultative, confident but not arrogant.'''
    },
    {
        'id': 'competitive-analysis',
        'title': 'Competitive Listing Analysis',
        'description': 'Win listing presentations with data-driven insights',
        'icon': '📊',
        'fields': [
            {
                'id': 'subjectProperty',
                'label': 'Subject Property Address',
                'type': 'text',
                'placeholder': 'e.g., 456 Ocean Dr, Miami Beach',
                'required': True
            },
            {
                'id': 'propertyType',
                'label': 'Property Type & Details',
                'type': 'textarea',
                'placeholder': 'e.g., 3 bed / 2 bath, 1,800 sqft, waterfront',
                'required': True
            },
            {
                'id': 'sellerExpectation',
                'label': 'Seller Price Expectation',
                'type': 'text',
                'placeholder': 'e.g., $950,000',
            },
            {
                'id': 'compRange',
                'label': 'Comparable Listings Range',
                'type': 'text',
                'placeholder': 'e.g., $850K - $1.1M',
            },
            {
                'id': 'marketCondition',
                'label': 'Current Market Condition',
                'type': 'select',
                'options': ['Hot Seller\'s Market', 'Balanced Market', 'Buyer\'s Market', 'Uncertain/Transitioning'],
            },
            {
                'id': 'uniqueFeatures',
                'label': 'Unique Features/Challenges',
                'type': 'textarea',
                'placeholder': 'e.g., Recently renovated, needs work, great location but busy street',
            }
        ],
        'promptTemplate': '''I'm preparing a listing presentation for {{subjectProperty}}.

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

Format as a professional presentation I can deliver to the seller.'''
    },
    {
        'id': 'objection-handling',
        'title': 'Objection Response Library',
        'description': 'Save deals with instant expert objection responses',
        'icon': '💬',
        'fields': [
            {
                'id': 'objection',
                'label': 'Specific Objection',
                'type': 'textarea',
                'placeholder': 'e.g., "The price is too high" or "We need to think about it"',
                'required': True
            },
            {
                'id': 'clientType',
                'label': 'Client Type',
                'type': 'select',
                'options': ['Buyer', 'Seller', 'Buyer (first-time)', 'Seller (expired listing)', 'Investor'],
                'required': True
            },
            {
                'id': 'propertyPrice',
                'label': 'Property Price',
                'type': 'text',
                'placeholder': 'e.g., $650,000',
            },
            {
                'id': 'market',
                'label': 'Market/Location',
                'type': 'text',
                'placeholder': 'e.g., South Florida, Miami',
            },
            {
                'id': 'context',
                'label': 'Situation Context',
                'type': 'textarea',
                'placeholder': 'e.g., They love the property but think comparable homes sold for less.',
            },
            {
                'id': 'urgency',
                'label': 'Urgency Factors',
                'type': 'textarea',
                'placeholder': 'e.g., Multiple offers expected, rates changing, seasonal market shift',
            }
        ],
        'promptTemplate': '''Create a professional response to this objection: "{{objection}}"

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
- Key talking points I can reference quickly'''
    },
    {
        'id': 'custom-prompt',
        'title': 'Custom Prompt Generator',
        'description': 'Build your own AI prompt for any real estate situation',
        'icon': '✨',
        'fields': [
            {
                'id': 'situation',
                'label': 'Describe Your Situation',
                'type': 'textarea',
                'placeholder': 'What do you need help with?',
                'required': True
            },
            {
                'id': 'goal',
                'label': 'Desired Outcome',
                'type': 'textarea',
                'placeholder': 'What result are you trying to achieve?',
                'required': True
            },
            {
                'id': 'details',
                'label': 'Relevant Details',
                'type': 'textarea',
                'placeholder': 'Property details, client info, market conditions, etc.',
            },
            {
                'id': 'format',
                'label': 'Preferred Format',
                'type': 'select',
                'options': ['Email', 'Script', 'Bullet Points', 'Long-form Letter', 'Social Post', 'Presentation'],
            },
            {
                'id': 'tone',
                'label': 'Tone',
                'type': 'select',
                'options': ['Professional', 'Friendly', 'Urgent', 'Consultative', 'Educational', 'Persuasive'],
            }
        ],
        'promptTemplate': '''I need help with: {{situation}}

Goal: {{goal}}

{{#if details}}
Relevant Details: {{details}}
{{/if}}

{{#if format}}Format this as: {{format}}{{/if}}
{{#if tone}}Tone: {{tone}}{{/if}}

Please provide a detailed, actionable response that I can use immediately in my real estate business.'''
    }
]


class CometBrowserMasteryApp:
    """Main application class for the Comet Browser Mastery GUI"""

    def __init__(self, root):
        self.root = root
        self.root.title("✨ Comet Browser Mastery - AI Prompt Generator")
        self.root.geometry("1200x800")
        self.root.configure(bg='#f0e6ff')

        # Color scheme
        self.colors = {
            'primary': '#6366f1',
            'secondary': '#8b5cf6',
            'accent': '#ec4899',
            'bg_light': '#f0e6ff',
            'bg_white': '#ffffff',
            'text_dark': '#1f2937',
            'text_light': '#6b7280',
            'success': '#10b981',
            'border': '#e0d4f7'
        }

        # Current state
        self.current_use_case = None
        self.form_widgets = {}

        # Configure styles
        self.setup_styles()

        # Show main menu
        self.show_main_menu()

    def setup_styles(self):
        """Configure ttk styles"""
        style = ttk.Style()
        style.theme_use('clam')

        # Configure button styles
        style.configure('Card.TButton',
                       background=self.colors['bg_white'],
                       foreground=self.colors['text_dark'],
                       borderwidth=2,
                       relief='solid',
                       padding=20,
                       font=('Helvetica', 11, 'bold'))

        style.map('Card.TButton',
                 background=[('active', '#faf5ff')])

        style.configure('Primary.TButton',
                       background=self.colors['primary'],
                       foreground='white',
                       borderwidth=0,
                       padding=15,
                       font=('Helvetica', 12, 'bold'))

        style.map('Primary.TButton',
                 background=[('active', self.colors['secondary'])])

    def clear_window(self):
        """Clear all widgets from the window"""
        for widget in self.root.winfo_children():
            widget.destroy()

    def show_main_menu(self):
        """Show the main menu with use case selection"""
        self.clear_window()
        self.current_use_case = None

        # Create main container with scrollbar
        main_canvas = tk.Canvas(self.root, bg=self.colors['bg_light'], highlightthickness=0)
        scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=main_canvas.yview)
        scrollable_frame = tk.Frame(main_canvas, bg=self.colors['bg_light'])

        scrollable_frame.bind(
            "<Configure>",
            lambda e: main_canvas.configure(scrollregion=main_canvas.bbox("all"))
        )

        main_canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        main_canvas.configure(yscrollcommand=scrollbar.set)

        # Header
        header_frame = tk.Frame(scrollable_frame, bg='#6366f1', padx=40, pady=30)
        header_frame.pack(fill='x')

        title_label = tk.Label(
            header_frame,
            text="✨ Comet Browser Mastery",
            font=('Helvetica', 32, 'bold'),
            bg='#6366f1',
            fg='white'
        )
        title_label.pack()

        subtitle_label = tk.Label(
            header_frame,
            text="Interactive AI Prompt Generator for Real Estate Professionals",
            font=('Helvetica', 14),
            bg='#6366f1',
            fg='#e0e7ff'
        )
        subtitle_label.pack()

        # Welcome section
        welcome_frame = tk.Frame(scrollable_frame, bg=self.colors['bg_white'], padx=40, pady=30)
        welcome_frame.pack(fill='x', padx=40, pady=(30, 20))

        welcome_title = tk.Label(
            welcome_frame,
            text="Welcome to Your AI Assistant Customizer",
            font=('Helvetica', 20, 'bold'),
            bg=self.colors['bg_white'],
            fg=self.colors['primary']
        )
        welcome_title.pack(anchor='w')

        welcome_text = tk.Label(
            welcome_frame,
            text=("This interactive tool helps you generate perfectly customized AI prompts for your specific\n"
                  "real estate situations. Simply select a use case below, fill in your details, and get\n"
                  "a ready-to-use prompt that you can copy directly into any agentic browser (Comet, ChatGPT, Claude)."),
            font=('Helvetica', 12),
            bg=self.colors['bg_white'],
            fg=self.colors['text_light'],
            justify='left'
        )
        welcome_text.pack(anchor='w', pady=(10, 15))

        tip_frame = tk.Frame(welcome_frame, bg='#eff6ff', relief='solid', borderwidth=2, bd=0)
        tip_frame.pack(fill='x', pady=10)

        tip_label = tk.Label(
            tip_frame,
            text="💡 Pro Tip: These prompts work best when you provide specific details.\nThe more context you add, the better your AI assistant can help you.",
            font=('Helvetica', 10),
            bg='#eff6ff',
            fg='#1e40af',
            justify='left',
            padx=20,
            pady=15
        )
        tip_label.pack()

        # Use cases title
        use_cases_title = tk.Label(
            scrollable_frame,
            text="Choose Your Use Case",
            font=('Helvetica', 24, 'bold'),
            bg=self.colors['bg_light'],
            fg=self.colors['secondary']
        )
        use_cases_title.pack(pady=(20, 20))

        # Use cases grid
        grid_frame = tk.Frame(scrollable_frame, bg=self.colors['bg_light'])
        grid_frame.pack(padx=40, pady=20)

        # Create cards in grid (3 columns)
        for idx, use_case in enumerate(USE_CASES):
            row = idx // 3
            col = idx % 3

            card = self.create_use_case_card(grid_frame, use_case)
            card.grid(row=row, column=col, padx=15, pady=15, sticky='nsew')

        # Configure grid weights
        for i in range(3):
            grid_frame.columnconfigure(i, weight=1)

        # About section
        about_frame = tk.Frame(scrollable_frame, bg='#1f2937', padx=40, pady=30)
        about_frame.pack(fill='x', padx=40, pady=(30, 20))

        about_title = tk.Label(
            about_frame,
            text="About This Tool",
            font=('Helvetica', 20, 'bold'),
            bg='#1f2937',
            fg='#fbbf24'
        )
        about_title.pack(anchor='w')

        about_text = tk.Label(
            about_frame,
            text=("This workbook was created by Edmund Bogen, Luxury Real Estate Advisor,\n"
                  "Coach & Speaker in South Florida. The strategies in this tool are designed to help real\n"
                  "estate professionals leverage AI to 10x their productivity."),
            font=('Helvetica', 12),
            bg='#1f2937',
            fg='#e5e7eb',
            justify='left'
        )
        about_text.pack(anchor='w', pady=(10, 15))

        security_label = tk.Label(
            about_frame,
            text=("🔒 Security Notice: Never input sensitive client information (SSNs, financial details,\n"
                  "legal documents) into AI tools. Use this generator for templates and frameworks, then add\n"
                  "client-specific details in your secure systems."),
            font=('Helvetica', 10),
            bg='#1f2937',
            fg='#9ca3af',
            justify='left'
        )
        security_label.pack(anchor='w')

        # Footer
        footer_frame = tk.Frame(scrollable_frame, bg='#374151', padx=40, pady=20)
        footer_frame.pack(fill='x', pady=(20, 0))

        footer_label = tk.Label(
            footer_frame,
            text="© 2025 Edmund Bogen - Comet Browser Mastery Workbook | For Real Estate Professionals",
            font=('Helvetica', 10),
            bg='#374151',
            fg='#d1d5db'
        )
        footer_label.pack()

        # Pack canvas and scrollbar
        main_canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # Bind mousewheel
        def on_mousewheel(event):
            main_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        main_canvas.bind_all("<MouseWheel>", on_mousewheel)

    def create_use_case_card(self, parent, use_case):
        """Create a use case card button"""
        card_frame = tk.Frame(
            parent,
            bg=self.colors['bg_white'],
            relief='solid',
            borderwidth=2,
            bd=2,
            highlightbackground=self.colors['border'],
            highlightcolor=self.colors['primary'],
            highlightthickness=2
        )

        # Icon
        icon_label = tk.Label(
            card_frame,
            text=use_case['icon'],
            font=('Helvetica', 40),
            bg=self.colors['bg_white']
        )
        icon_label.pack(pady=(20, 10))

        # Title
        title_label = tk.Label(
            card_frame,
            text=use_case['title'],
            font=('Helvetica', 14, 'bold'),
            bg=self.colors['bg_white'],
            fg=self.colors['primary'],
            wraplength=250
        )
        title_label.pack(padx=20)

        # Description
        desc_label = tk.Label(
            card_frame,
            text=use_case['description'],
            font=('Helvetica', 10),
            bg=self.colors['bg_white'],
            fg=self.colors['text_light'],
            wraplength=250,
            justify='center'
        )
        desc_label.pack(padx=20, pady=(10, 15))

        # Button
        button = tk.Button(
            card_frame,
            text="Generate Prompt →",
            font=('Helvetica', 11, 'bold'),
            bg=self.colors['primary'],
            fg='white',
            activebackground=self.colors['secondary'],
            activeforeground='white',
            relief='flat',
            cursor='hand2',
            command=lambda uc=use_case: self.show_prompt_generator(uc)
        )
        button.pack(pady=(0, 20), padx=20, fill='x')

        # Hover effects
        def on_enter(e):
            card_frame.configure(highlightbackground=self.colors['primary'])
            button.configure(bg=self.colors['secondary'])

        def on_leave(e):
            card_frame.configure(highlightbackground=self.colors['border'])
            button.configure(bg=self.colors['primary'])

        card_frame.bind('<Enter>', on_enter)
        card_frame.bind('<Leave>', on_leave)
        for child in card_frame.winfo_children():
            child.bind('<Enter>', on_enter)
            child.bind('<Leave>', on_leave)

        return card_frame

    def show_prompt_generator(self, use_case):
        """Show the prompt generator form for a specific use case"""
        self.clear_window()
        self.current_use_case = use_case
        self.form_widgets = {}

        # Create main container with scrollbar
        main_canvas = tk.Canvas(self.root, bg=self.colors['bg_light'], highlightthickness=0)
        scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=main_canvas.yview)
        scrollable_frame = tk.Frame(main_canvas, bg=self.colors['bg_light'])

        scrollable_frame.bind(
            "<Configure>",
            lambda e: main_canvas.configure(scrollregion=main_canvas.bbox("all"))
        )

        main_canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        main_canvas.configure(yscrollcommand=scrollbar.set)

        # Back button
        back_button = tk.Button(
            scrollable_frame,
            text="← Back to Use Cases",
            font=('Helvetica', 12, 'bold'),
            bg=self.colors['bg_white'],
            fg=self.colors['primary'],
            activebackground='#faf5ff',
            activeforeground=self.colors['secondary'],
            relief='flat',
            cursor='hand2',
            command=self.show_main_menu,
            padx=20,
            pady=10
        )
        back_button.pack(anchor='w', padx=40, pady=(20, 10))

        # Form container
        form_frame = tk.Frame(scrollable_frame, bg=self.colors['bg_white'], relief='solid', borderwidth=2, bd=0)
        form_frame.pack(fill='both', padx=40, pady=20)

        # Header
        header_container = tk.Frame(form_frame, bg=self.colors['bg_white'])
        header_container.pack(fill='x', padx=40, pady=30)

        icon_label = tk.Label(
            header_container,
            text=use_case['icon'],
            font=('Helvetica', 50),
            bg=self.colors['bg_white']
        )
        icon_label.pack()

        title_label = tk.Label(
            header_container,
            text=use_case['title'],
            font=('Helvetica', 28, 'bold'),
            bg=self.colors['bg_white'],
            fg=self.colors['primary']
        )
        title_label.pack(pady=(10, 5))

        desc_label = tk.Label(
            header_container,
            text=use_case['description'],
            font=('Helvetica', 14),
            bg=self.colors['bg_white'],
            fg=self.colors['text_light']
        )
        desc_label.pack()

        # Form fields
        fields_container = tk.Frame(form_frame, bg=self.colors['bg_white'])
        fields_container.pack(fill='both', padx=40, pady=20)

        for field in use_case['fields']:
            self.create_form_field(fields_container, field)

        # Generate button
        generate_button = tk.Button(
            form_frame,
            text="✨ Generate Custom Prompt",
            font=('Helvetica', 14, 'bold'),
            bg=self.colors['primary'],
            fg='white',
            activebackground=self.colors['secondary'],
            activeforeground='white',
            relief='flat',
            cursor='hand2',
            command=self.generate_prompt,
            padx=30,
            pady=15
        )
        generate_button.pack(pady=(0, 30), padx=40, fill='x')

        # Pack canvas and scrollbar
        main_canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # Bind mousewheel
        def on_mousewheel(event):
            main_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        main_canvas.bind_all("<MouseWheel>", on_mousewheel)

    def create_form_field(self, parent, field):
        """Create a form field widget based on field type"""
        field_frame = tk.Frame(parent, bg=self.colors['bg_white'])
        field_frame.pack(fill='x', pady=10)

        # Label
        label_text = field['label']
        if field.get('required'):
            label_text += " *"

        label = tk.Label(
            field_frame,
            text=label_text,
            font=('Helvetica', 11, 'bold'),
            bg=self.colors['bg_white'],
            fg=self.colors['text_dark']
        )
        label.pack(anchor='w', pady=(0, 5))

        # Widget based on type
        if field['type'] == 'select':
            widget = ttk.Combobox(
                field_frame,
                values=field.get('options', []),
                font=('Helvetica', 11),
                state='readonly'
            )
            widget.set(field.get('placeholder', 'Select...'))
        elif field['type'] == 'textarea':
            widget = scrolledtext.ScrolledText(
                field_frame,
                height=4,
                font=('Helvetica', 11),
                relief='solid',
                borderwidth=1,
                wrap='word'
            )
            if field.get('placeholder'):
                widget.insert('1.0', field['placeholder'])
                widget.configure(fg=self.colors['text_light'])

                def on_focus_in(e, w=widget, ph=field['placeholder']):
                    if w.get('1.0', 'end-1c') == ph:
                        w.delete('1.0', 'end')
                        w.configure(fg=self.colors['text_dark'])

                def on_focus_out(e, w=widget, ph=field['placeholder']):
                    if not w.get('1.0', 'end-1c').strip():
                        w.insert('1.0', ph)
                        w.configure(fg=self.colors['text_light'])

                widget.bind('<FocusIn>', on_focus_in)
                widget.bind('<FocusOut>', on_focus_out)
        else:  # text or number
            widget = tk.Entry(
                field_frame,
                font=('Helvetica', 11),
                relief='solid',
                borderwidth=1
            )
            if field.get('placeholder'):
                widget.insert(0, field['placeholder'])
                widget.configure(fg=self.colors['text_light'])

                def on_focus_in(e, w=widget, ph=field['placeholder']):
                    if w.get() == ph:
                        w.delete(0, 'end')
                        w.configure(fg=self.colors['text_dark'])

                def on_focus_out(e, w=widget, ph=field['placeholder']):
                    if not w.get().strip():
                        w.insert(0, ph)
                        w.configure(fg=self.colors['text_light'])

                widget.bind('<FocusIn>', on_focus_in)
                widget.bind('<FocusOut>', on_focus_out)

        widget.pack(fill='x')
        self.form_widgets[field['id']] = widget

    def get_field_value(self, field_id, widget, placeholder=''):
        """Get the value from a form widget"""
        if isinstance(widget, scrolledtext.ScrolledText):
            value = widget.get('1.0', 'end-1c').strip()
            return value if value != placeholder else ''
        elif isinstance(widget, ttk.Combobox):
            value = widget.get()
            return value if value != 'Select...' else ''
        else:
            value = widget.get().strip()
            return value if value != placeholder else ''

    def generate_prompt(self):
        """Generate the prompt from form data"""
        # Collect form data
        form_data = {}
        for field_id, widget in self.form_widgets.items():
            # Find the field definition
            field_def = next((f for f in self.current_use_case['fields'] if f['id'] == field_id), None)
            placeholder = field_def.get('placeholder', '') if field_def else ''
            value = self.get_field_value(field_id, widget, placeholder)

            # Check required fields
            if field_def and field_def.get('required') and not value:
                messagebox.showwarning(
                    "Missing Required Field",
                    f"Please fill in: {field_def['label']}"
                )
                return

            form_data[field_id] = value

        # Process template
        prompt = self.current_use_case['promptTemplate']

        # Simple template replacement
        for field_id, value in form_data.items():
            prompt = re.sub(f'{{{{{field_id}}}}}', value, prompt)

        # Handle conditional blocks
        def replace_conditional(match):
            field_id = match.group(1)
            content = match.group(2)
            return content if form_data.get(field_id) else ''

        prompt = re.sub(r'{{#if\s+(\w+)}}([\s\S]*?){{/if}}', replace_conditional, prompt)

        # Show result
        self.show_prompt_result(prompt.strip())

    def show_prompt_result(self, prompt):
        """Show the generated prompt in a new window"""
        result_window = tk.Toplevel(self.root)
        result_window.title("Your Customized Prompt")
        result_window.geometry("800x600")
        result_window.configure(bg=self.colors['bg_light'])

        # Header
        header_frame = tk.Frame(result_window, bg=self.colors['bg_white'])
        header_frame.pack(fill='x', padx=20, pady=20)

        title_label = tk.Label(
            header_frame,
            text="Your Customized Prompt",
            font=('Helvetica', 20, 'bold'),
            bg=self.colors['bg_white'],
            fg=self.colors['success']
        )
        title_label.pack(side='left')

        copy_button = tk.Button(
            header_frame,
            text="📋 Copy to Clipboard",
            font=('Helvetica', 12, 'bold'),
            bg=self.colors['success'],
            fg='white',
            activebackground='#059669',
            activeforeground='white',
            relief='flat',
            cursor='hand2',
            command=lambda: self.copy_to_clipboard(prompt, result_window),
            padx=20,
            pady=10
        )
        copy_button.pack(side='right')

        # Prompt text
        text_frame = tk.Frame(result_window, bg=self.colors['bg_white'], relief='solid', borderwidth=2)
        text_frame.pack(fill='both', expand=True, padx=20, pady=(0, 10))

        text_widget = scrolledtext.ScrolledText(
            text_frame,
            font=('Courier', 11),
            wrap='word',
            relief='flat',
            padx=20,
            pady=20
        )
        text_widget.pack(fill='both', expand=True)
        text_widget.insert('1.0', prompt)
        text_widget.configure(state='disabled')

        # Tip
        tip_frame = tk.Frame(result_window, bg='#eff6ff', relief='solid', borderwidth=2)
        tip_frame.pack(fill='x', padx=20, pady=(0, 20))

        tip_label = tk.Label(
            tip_frame,
            text=("💡 Next Steps: Copy this prompt and paste it into your agentic browser\n"
                  "(Comet, ChatGPT, Claude) to get instant, customized assistance for your situation."),
            font=('Helvetica', 10),
            bg='#eff6ff',
            fg='#1e40af',
            justify='left',
            padx=20,
            pady=15
        )
        tip_label.pack()

    def copy_to_clipboard(self, text, window):
        """Copy text to clipboard"""
        self.root.clipboard_clear()
        self.root.clipboard_append(text)
        messagebox.showinfo("Copied!", "Prompt copied to clipboard!")


def main():
    """Main entry point"""
    root = tk.Tk()
    app = CometBrowserMasteryApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
