MenyaHano (MH)

Author: NIYOBYOSE Isaac Precieux(Isaac-1-Lang)

📌 Introduction
Background

MenyaHano (MH) is an application designed to assist foreign visitors in navigating a new country. Traveling abroad often comes with challenges such as language barriers, unfamiliar local news, transportation, healthcare facilities, and places of interest. MH centralizes these resources, making travel safer, smoother, and more enjoyable.

Problem Statement

Foreign visitors often struggle to access accurate and up-to-date information about local events, healthcare, accommodation, jobs, and cultural tips. This leads to inefficiency, unsafe travel, and difficulty exploring independently.

Objectives

Provide real-time trending news.

Offer curated tourist spots, hotels, and restaurants.

Display healthcare facilities (hospitals, clinics, pharmacies).

Inform users about job opportunities and requirements.

Deliver cultural and travel tips.

Integrate maps and navigation tools.

Provide safety, weather, and transport alerts.

Scope & Limitations

Scope: News, locations, jobs, healthcare, travel tips, and navigation tools.

Limitations: Initial release covers the East African Community, Horn of Africa (Ethiopia, Eritrea), selected countries in America (USA), Europe (France, Spain), and Asia (China, South Korea).

Methodology

Agile methodology with feature-based sprints:

Sprint 1: Trending News Feed

Sprint 2: Places of Interest

Sprint 3: Healthcare & Emergency Info

Sprint 4: Jobs & Cultural Tips

Sprint 5: Multilingual Support + FAQs

🔍 System Analysis
Feasibility Study

Technical:

Frontend: ReactJS + TypeScript

Backend: Spring Boot (Java)

Database: MySQL / MongoDB

Design: Figma

Version Control: GitHub

Operational: Accessible via smartphone, computer, or tablet.

Economic: Freemium model with optional premium features.

Schedule: 2 weeks + 1 day testing/deployment.

Legal/Ethical: Compliance with data privacy regulations, encryption, role-based access, and prevention of scams/fake news.

Requirements Gathering

Sources: Social media APIs (Instagram, X, YouTube), cultural/historical data from verified sites.

Functional Requirements:

Register/login for access.

View news, places, and book hotels/flights.

Submit questions and get feedback within 24 hrs.

Non-Functional Requirements:

Security: Encrypted data, authentication.

Reliability: 99.5% uptime.

Performance: Pages load < 3s.

Usability: Easy-to-use interface, learnable in < 30 mins.

🛠️ System Design
Design Principles

Modularity: Features are independent modules.

Abstraction: Users see features, not backend complexity.

Architecture (3-Tier)

Presentation Layer: ReactJS frontend.

Application Layer: Spring Boot backend.

Data Layer: PostgreSQL/MongoDB database.

Physical Design

Frontend: ReactJS served by NGINX on cloud (AWS EC2).

Backend: Spring Boot service.

Database: MongoDB Atlas.

Communication: HTTPS.

💻 System Implementation

Frontend: ReactJS, TypeScript

Backend: Spring Boot (Java)

Database: PostgreSQL

IDE: VS Code, IntelliJ IDEA

Version Control: GitHub

Package Managers: npm, Maven, Gradle

Code Structure (MVC Pattern)

Models → Database schemas

Views → React UI components

Controllers → Business logic

🧪 System Testing

Levels: Unit, Integration, System/UAT.

Tools: Jest, Supertest, Selenium, Cypress.

Example Test Case:

Objective: Verify location search.

Input: Kigali, 2025-12-12

Expected Output: Location booked with ID, Hilltop Hotel.

✅ Conclusion & Recommendations
Achievements

Delivered MH app with news, guides, healthcare, jobs, cultural insights, alerts, FAQs, and multilingual support.

Challenges

Handling large multilingual datasets.

Managing storage for big data.

Marketing & awareness.

Lessons Learned

API optimization.

Big data management.

Full-stack development experience.

Future Improvements

Mobile offline app.

Hotel & flight booking integration.

More languages.

Telemedicine (video consultations).

📂 Repository Structure
MenyaHano/
│── frontend/        # ReactJS + TypeScript code
│── backend/         # Spring Boot services
│── database/        # SQL/Mongo schemas
│── docs/            # Documentation & diagrams
│── tests/           # Jest, Supertest, Cypress tests
│── README.md        # This file

🚀 How to Run the Project

Clone repo:

git clone https://github.com/username/MenyaHano.git
cd MenyaHano


Run backend:

cd backend
mvn spring-boot:run


Run frontend:

cd frontend
npm install
npm start


Open in browser → http://localhost:3000