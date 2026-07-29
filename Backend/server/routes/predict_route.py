from server.models.input_model import Data
from fastapi import APIRouter
from pydantic import BaseModel
from server.services.post_prediction_service import predict_data
import pandas as pd

router = APIRouter()

class PredictionResponse(BaseModel):
    predicted_mental_health_score:float

@router.post('/predict', response_model=PredictionResponse)
def predict(payload : Data):
    return predict_data(payload)