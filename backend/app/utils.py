from pydantic import BaseModel
from typing import Literal

class Data(BaseModel):
    tenure: int
    gender: Literal["Male", "Female"]
    seniorCitizen: Literal["Yes", "No"]
    partner: Literal["Yes", "No"]
    dependents: Literal["Yes", "No"]
    phoneService: Literal["Yes", "No"]
    multipleLines: Literal["Yes", "No", "No phone service"]
    internetService: Literal["DSL", "Fiber optic", "No"]
    contract: Literal["Month-to-month", "One year", "Two year"]
    onlineSecurity: Literal["Yes", "No", "No internet service"]
    onlineBackup: Literal["Yes", "No", "No internet service"]
    deviceProtection: Literal["Yes", "No", "No internet service"]
    techSupport: Literal["Yes", "No", "No internet service"]
    streamingTV: Literal["Yes", "No", "No internet service"]
    streamingMovies: Literal["Yes", "No", "No internet service"]
    paperlessBilling: Literal["Yes", "No"]
    monthlyCharges: float
    totalCharges: float
