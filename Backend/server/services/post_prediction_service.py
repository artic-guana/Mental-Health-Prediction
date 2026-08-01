import pandas as pd
from server.models.input_model import Data
from pathlib import Path
from server.models.response_model import PredictionResponse
import joblib

top_countries = ['Other','India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France']
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODEL_PATH = BASE_DIR / "ML"/ "predictor" / "MentalHealthPredictor.pkl"
model = joblib.load(MODEL_PATH)

def predict_data(data : Data):
    Region = data.country if data.country in top_countries else "Other"
    input_row = pd.DataFrame([{
            'Age'                       :data.age,
            'Gender'                    :data.gender,
            'Region'                    :Region,
            'Academic_Level'            :data.academic_level,
            'Most_Used_Platform'        :data.most_used_platform,
            'Purpose_Of_Use'            :data.purpose_of_use,
            'Avg_Daily_Usage_Hours'     :data.avg_daily_usage_hours,
            'Daily_Unlocks'             :data.daily_unlocks,
            'Study_Hours'               :data.study_hours,
            'Physical_Activity_Hours'   :data.physical_activity_hours,
            'Sleep_Hours_Per_Night'     :data.sleep_hours_per_night,
            'Stress_Level'              :data.stress_level,
       }])
    prediction = model.predict(input_row)[0]
    return PredictionResponse(predicted_mental_health_score=round(float(prediction),2))
