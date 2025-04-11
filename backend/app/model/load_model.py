import os
import joblib
import keras
import tensorflow as tf
from keras import layers
def load_model():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "Customer_Churn_model.joblib")
    model = joblib.load(model_path)
    return model



