from pydantic import BaseModel

class PredictionResponse(BaseModel):
    predicted_mental_health_score:float