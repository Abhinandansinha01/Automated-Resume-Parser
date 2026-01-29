# 📄 Automated Resume Parser

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![AWS Textract](https://img.shields.io/badge/AWS%20Textract-FF9900?style=flat&logo=amazon-aws&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![NLP](https://img.shields.io/badge/NLP-Spacy-090909?style=flat)

An intelligent recruitment tool that leverages OCR and Natural Language Processing (NLP) to automate the extraction of data from unstructured PDF resumes and rank candidates based on job description relevance.

## 🧠 Core Features

* **Intelligent OCR**: Uses **AWS Textract** to extract text, tables, and key-value pairs from PDF resumes with high accuracy.
* **"Fit Score" Algorithm**: A custom Python ranking algorithm that computes a candidate's relevance score against a job description, reducing manual screening time by **70%**.
* **Responsive Dashboard**: A modern **React.js** frontend for HR managers to upload resumes and view ranked results.
* **Serverless Backend**: Built on AWS API Gateway and DynamoDB for scalable, maintenance-free operation.

## 🏗️ System Architecture

```mermaid
graph LR
    User[HR Manager] -->|Upload PDF| Client[React Dashboard]
    Client -->|API Request| APIG[API Gateway]
    APIG -->|Trigger| Lambda1[Upload Lambda]
    Lambda1 -->|Store File| S3[S3 Bucket]
    S3 -->|Trigger Event| Lambda2[Processing Lambda]
    Lambda2 -->|Extract Text| Textract[AWS Textract]
    Lambda2 -->|Analyze & Rank| NLP[NLP Engine (Python)]
    NLP -->|Store Data| DB[(DynamoDB)]
    Client -->|Fetch Results| DB
```

## 🛠️ Tech Stack

* **Frontend**: React.js, Tailwind CSS
* **Backend**: AWS Lambda (Python), API Gateway
* **ML/AI**: AWS Textract, SpacY / NLTK (for entity recognition)
* **Database**: Amazon DynamoDB
* **Storage**: Amazon S3

## 📂 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/    # Upload, Dashboard, CandidateCard
│   │   └── services/      # API integration
│   └── package.json
├── backend/
│   ├── ranking_algorithm/ # Python Fit Score logic
│   ├── handlers/          # Lambda function handlers
│   └── serverless.yml     # Serverless Framework config
├── data/
│   └── sample_resumes/    # Test data
└── README.md
```

## 🏆 Achievements

* **Efficiency**: Cut down the initial resume screening process from days to minutes.
* **Accuracy**: Improved candidate matching accuracy using weighted keyword analysis and semantic matching.

## 🚀 Getting Started

1. **Backend Deployment**:

    ```bash
    cd backend
    sls deploy
    ```

2. **Frontend Setup**:

    ```bash
    cd frontend
    npm install
    npm start
    ```

## 📜 License

Distributed under the MIT License.
