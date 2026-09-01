# 🧠 Mental Health Predictor

An **AI-powered web application** that uses Machine Learning to analyze user-provided lifestyle and behavioral information and predict a **mental health score on a scale of 0–10**.

The project combines a trained **scikit-learn machine learning model**, a **FastAPI REST API**, and a **React frontend** to provide users with a simple and interactive prediction experience.

> **Note:** This project is intended for educational and demonstration purposes only. Its predictions should not be considered a medical diagnosis or a substitute for professional mental health advice.

---

## 📌 Project Overview

Mental health can be influenced by several lifestyle, behavioral, academic, and social factors. This project demonstrates how machine learning can be used to analyze such information and generate a numerical indication of mental well-being.

The application follows a simple workflow:

```text
User Input
    ↓
React Frontend
    ↓
FastAPI REST API
    ↓
Input Validation
    ↓
Preprocessing
    ↓
Trained ML Model
    ↓
Mental Health Score (0–10)
    ↓
Result Displayed to User
```

---

## ✨ Features

* 🧠 **Machine Learning Prediction**
  Uses a trained scikit-learn model to estimate a mental health score.

* 📊 **0–10 Mental Health Score**
  Provides an easy-to-understand numerical prediction.

* ⚡ **FastAPI Backend**
  Provides a lightweight and high-performance REST API.

* ⚛️ **React Frontend**
  Interactive interface for entering information and viewing predictions.

* ✅ **Input Validation**
  Uses Pydantic models to validate incoming API requests.

* 🔄 **Frontend–Backend Communication**
  The React application communicates with the FastAPI backend through HTTP requests.

* 💾 **Persistent ML Model**
  The trained model is serialized using `joblib` and loaded by the backend during prediction.

* 🌐 **CORS Support**
  Allows the frontend and backend to run or deploy independently.

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose                                |
| ---------- | -------------------------------------- |
| React      | Building the user interface            |
| Vite       | Frontend development and build tooling |
| JavaScript | Application logic                      |
| CSS        | Styling and responsive UI              |

## Backend

| Technology | Purpose                        |
| ---------- | ------------------------------ |
| Python     | Backend and ML development     |
| FastAPI    | REST API framework             |
| Pydantic   | Request validation and schemas |
| Uvicorn    | ASGI server                    |

## Machine Learning

| Technology   | Purpose                              |
| ------------ | ------------------------------------ |
| scikit-learn | Model training and prediction        |
| Pandas       | Dataset manipulation                 |
| NumPy        | Numerical operations                 |
| Joblib       | Saving and loading the trained model |

---

# 🏗️ System Architecture

```text
┌─────────────────────┐
│        User         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   React Frontend    │
│                     │
│ Collect User Input  │
│ Display Prediction  │
└──────────┬──────────┘
           │
           │ HTTP Request
           ▼
┌─────────────────────┐
│   FastAPI Backend   │
│                     │
│ Request Validation  │
│ Preprocessing       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  ML Prediction      │
│       Model         │
│                     │
│   scikit-learn      │
└──────────┬──────────┘
           │
           ▼
     Prediction Score
          (0–10)
```

---

# 🤖 Machine Learning Workflow

The machine learning portion of the project follows a standard supervised-learning pipeline.

### 1. Data Collection

A dataset containing factors related to mental health and lifestyle is used for training.

### 2. Data Preprocessing

The raw dataset is cleaned and transformed into a format suitable for machine learning.

Typical preprocessing may include:

* Handling missing values
* Encoding categorical variables
* Selecting useful features
* Normalizing or scaling numerical features
* Removing unnecessary columns

### 3. Model Training

A regression-based machine learning model is trained to learn relationships between the provided features and the target mental health score.

```text
Training Dataset
      ↓
Data Cleaning
      ↓
Feature Engineering
      ↓
Train/Test Split
      ↓
Model Training
      ↓
Model Evaluation
      ↓
Save Trained Model
```

### 4. Model Serialization

After training, the model is saved using `joblib`.

Example:

```python
import joblib

joblib.dump(model, "MentalHealthPredictor.pkl")
```

This allows the API to use the trained model without retraining it every time the server starts.

### 5. Prediction

When the user submits the form:

```text
User Data
   ↓
FastAPI
   ↓
Pydantic Validation
   ↓
Feature Transformation
   ↓
model.predict()
   ↓
Mental Health Score
```

---

# 📁 Project Structure

A typical structure for the project is:

```text
Mental-Health-Predictor/
│
├── Backend/
│   │
│   ├── main.py
│   │
│   ├── requirements.txt
│   │
│   └── ML/
│       └── predictor/
│           └── MentalHealthPredictor.pkl
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

> The exact folder structure may differ depending on the current version of the project.

---

# 🔌 API

## Prediction Endpoint

```http
POST /predict
```

The endpoint receives user information and passes the processed features to the trained ML model.

### Example Request

```json
{
  "feature_1": 5,
  "feature_2": 7,
  "feature_3": 3
}
```

The exact fields depend on the features used while training the model.

### Example Response

```json
{
  "prediction": 7.4
}
```

The frontend uses this response to display the predicted mental health score.

---

# 🚀 Running the Project Locally

## Prerequisites

Make sure the following are installed:

```text
Python 3.x
Node.js
npm
Git
```

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Mental-Health-Predictor
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Create a virtual environment:

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux/macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend should now be available at:

```text
http://127.0.0.1:8000
```

---

## 3. API Documentation

FastAPI automatically generates interactive API documentation.

Once the backend is running, visit:

```text
http://127.0.0.1:8000/docs
```

You can test the `/predict` endpoint directly from the Swagger interface.

Alternative ReDoc documentation is available at:

```text
http://127.0.0.1:8000/redoc
```

---

## 4. Frontend Setup

Open another terminal and navigate to:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, typically:

```text
http://localhost:5173
```

Open it in your browser to use the application.

---

# 🔄 Frontend–Backend Communication

The frontend sends the form data to the FastAPI backend.

Conceptually:

```javascript
fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
```

The backend validates the request and returns the ML prediction.

Because the frontend and backend may run on different origins, **CORS middleware** is configured in FastAPI.

Example:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

# 📦 Loading the ML Model

The trained model is loaded using `joblib`.

```python
import joblib

model = joblib.load(
    "ML/predictor/MentalHealthPredictor.pkl"
)
```

Predictions can then be generated with:

```python
prediction = model.predict(features)
```

This architecture separates **model training** from **model inference**, allowing the web server to perform predictions quickly.

---

# ⚠️ Important Considerations

## Model Compatibility

A model saved using one version of scikit-learn may produce compatibility warnings or errors when loaded using another version.

It is therefore recommended to maintain the same scikit-learn version used during model training.

You can record installed dependencies with:

```bash
pip freeze > requirements.txt
```

---

## Model File Path

Make sure:

```text
MentalHealthPredictor.pkl
```

exists at the location expected by the backend.

Using paths relative to the Python file rather than the terminal's working directory can make model loading more reliable.

---

# 🔒 Privacy Considerations

Mental-health-related information can be sensitive.

A production version of this application should:

* Avoid storing user responses unnecessarily
* Encrypt sensitive information
* Use HTTPS
* Implement authentication where appropriate
* Clearly explain how user data is processed
* Avoid sharing prediction data with third parties without consent
* Follow applicable privacy and data-protection regulations

The current project should primarily be treated as an **educational machine learning application**.

---

# ⚠️ Disclaimer

This application is **not a medical diagnostic tool**.

The predicted score is generated by a machine learning model trained on patterns present in its dataset. It cannot account for all psychological, medical, environmental, or personal factors affecting an individual's mental health.

The output should **not** be used for:

* Clinical diagnosis
* Medical decision-making
* Emergency mental health assessment
* Replacing qualified mental health professionals

If someone is concerned about their mental health, they should consider consulting an appropriate qualified professional.

---

# 🔮 Future Improvements

Possible improvements include:

* 📊 Visual mental-health analytics dashboard
* 📈 Historical score tracking
* 👤 User accounts and profiles
* 🔐 Authentication and secure data storage
* 🧠 Improved ML models and hyperparameter tuning
* 🔍 Model explainability using SHAP or similar techniques
* 📉 Feature-importance visualization
* 📱 Improved mobile responsiveness
* ☁️ Full cloud deployment
* 🗄️ Database integration
* 🧪 Automated model and API testing
* 🐳 Docker-based deployment
* 🔄 CI/CD pipeline
* 📊 Better model performance monitoring

---

# 🎯 Learning Outcomes

This project demonstrates practical knowledge of:

* Machine learning model development
* Data preprocessing
* Regression problems
* Model serialization
* Building REST APIs using FastAPI
* Request validation using Pydantic
* Connecting React applications with Python APIs
* CORS configuration
* Frontend/backend architecture
* Deploying ML-powered web applications

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes and commit them:

```bash
git commit -m "Add new feature"
```

Push your branch:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 👨‍💻 Author

**Suryodipta Pradhan**

Built as a Machine Learning and Full-Stack development project to explore how trained ML models can be integrated into modern web applications.
