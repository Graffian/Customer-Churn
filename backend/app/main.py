from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import Data
from preprocess import preprocess
from model.load_model import load_model
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
async def get_data(data: Data):
    # Convert the Pydantic model to a dictionary
    data_dict = data.dict()
    print("Received data:", data_dict)  # Debug log
    
    # Preprocess the data
    processed_data = preprocess(data_dict)
    print("Processed data shape:", processed_data.shape)  # Debug log
    
    # Load the model and make prediction
    model = load_model()
    prediction = model.predict(processed_data)
    print("Prediction:", prediction)  # Debug log
    response = {
        "message": "Prediction made successfully",
        "prediction": float(prediction[0]),
        "data": data_dict
    }    
    json_compatible_item_data = jsonable_encoder(response)
    return JSONResponse(content=json_compatible_item_data)
    



