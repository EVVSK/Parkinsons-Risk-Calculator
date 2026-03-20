# Parkinson's Risk Calculator

# View the website at :- https://mds-parkinsons-risk-calculator.netlify.app/

## Overview
The Parkinson's Risk Calculator is a screening tool designed to assess the risk of developing Parkinson's disease based on user responses to a series of questions. This application is built using React and TypeScript, leveraging Vite for fast development and build processes.

## Features
- User-friendly questionnaire to collect responses related to Parkinson's risk factors.
- Real-time risk assessment based on user inputs.
- Clear display of results with recommendations.

## Project Structure
```
parkinsons-risk-calculator
├── src
│   ├── main.tsx                # Entry point of the application
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Global styles
│   ├── index.css               # Base styles
│   ├── types.ts                # Shared TypeScript interfaces
│   ├── components              # React components
│   │   ├── RiskCalculatorForm.tsx  # Questionnaire form component
│   │   ├── RiskResult.tsx      # Results display component
│   │   ├── QuestionGroup.tsx    # Grouping related questions
│   │   └── Header.tsx          # Application header
│   ├── hooks                   # Custom hooks
│   │   └── useRiskCalculation.ts  # Risk calculation logic
│   ├── utils                   # Utility functions
│   │   └── riskScoring.ts      # Scoring functions
│   └── data                    # Predefined data
│       └── riskFactors.ts      # Risk factors data
├── index.html                  # Main HTML file
├── package.json                # NPM configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # Node.js TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Project documentation
```

## Installation
To get started with the Parkinson's Risk Calculator, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd parkinsons-risk-calculator
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage
- Follow the instructions provided in the header to complete the questionnaire.
- Submit your responses to receive a risk assessment result.
- Review the recommendations based on your score.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
