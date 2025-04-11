from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd
scaler = MinMaxScaler()
df = pd.read_csv("../data/WA_Fn-UseC_-Telco-Customer-Churn.csv")
actual_tenure = np.array(df.loc[: , "tenure"]).reshape(-1,1)


info = []
dataset = {}
actual_values = []
processed_values = []
actual_Monthly_Total = []

def preprocess(data):
    # Initialize local variables
    dataset = {}
    actual_values = []
    processed_values = []
    actual_Monthly_Total = []
    
    print("Input data:", data)  # Debug print
    
    df = pd.read_csv("../data/WA_Fn-UseC_-Telco-Customer-Churn.csv")
    df["TotalCharges"] = pd.to_numeric(df["TotalCharges"] , errors="coerce")
    df["MonthlyCharges"] = pd.to_numeric(df["MonthlyCharges"] , errors="coerce")
    df["TotalCharges"] = df["TotalCharges"].interpolate(method="pad")
    df["MonthlyCharges"] = df["MonthlyCharges"].interpolate(method="pad")
    
    actual_tenure = np.array(df.loc[: , "tenure"]).reshape(-1,1)
    actual_MonthlyCharges_TotalCharges = np.array(df.loc[:,"MonthlyCharges":"TotalCharges"])
    
    # Update dataset directly with the input data
    dataset.update(data)
    print("Dataset after update:", dataset)  # Debug print
    
    for value in dataset.values():
        actual_values.append(value)
    print("Actual values:", actual_values)  # Debug print
    
    for value in actual_values:
        if type(value) == int or type(value) == float:
            if value == dataset.get('tenure'):
                value = np.array(value).reshape(-1,1)
                actual_tenure = np.append(actual_tenure,value,axis=0)
                processed_tenure = scaler.fit_transform(actual_tenure)
                processed_values.append(processed_tenure[len(actual_tenure)-1,0])
            else:
                actual_Monthly_Total.append(value)
                if len(actual_Monthly_Total) == 2:
                    actual_MTcharges = np.array(actual_Monthly_Total[0:2]).reshape(1,2)
                    actual_MonthlyCharges_TotalCharges = np.append(actual_MonthlyCharges_TotalCharges,actual_MTcharges,axis=0)
                    processed_MonthlyCharges_TotalCharges = scaler.fit_transform(actual_MonthlyCharges_TotalCharges)
                    processed_values.append(processed_MonthlyCharges_TotalCharges[len(actual_MonthlyCharges_TotalCharges)-1,0])
                    processed_values.append(processed_MonthlyCharges_TotalCharges[len(actual_MonthlyCharges_TotalCharges)-1,1])
        elif type(value) == str:
            processed_values.append(value)
    
    print("Processed values before mapping:", processed_values)  # Debug print
    
    for index,details in enumerate(processed_values):
        if details == "Yes" or details == "Female" or details == "DSL" or details == "One year":
            processed_values[index] = 1.0
        elif details == "No" or details == "Male" or details == "Month-to-month":
            processed_values[index] = 0.0
        elif details == "No internet service" or details == "No phone service" or details == "fiber optic" or details == "Two year":
            processed_values[index] = 2.0
    
    print("Final processed values:", processed_values)  # Debug print
    print("Number of processed values:", len(processed_values))  # Debug print
    return np.array(processed_values).reshape(1,18)