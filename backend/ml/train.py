# Importing the Dependencies
import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# Paths (relative to this file, so the script works no matter where it's run from)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "..", "dataset", "data.csv")
SAVED_MODELS_DIR = os.path.join(BASE_DIR, "saved_models")
os.makedirs(SAVED_MODELS_DIR, exist_ok=True)

# Data Collection and Processing
heart_data = pd.read_csv(DATA_PATH)

print("First 5 rows of the dataset:")
print(heart_data.head())

print("\nDataset shape (rows, columns):", heart_data.shape)
print("\nMissing values in each column:")
print(heart_data.isnull().sum())

print("\nDistribution of target variable:")
print(heart_data["target"].value_counts())
print("\n1 --> Defective Heart\n0 --> Healthy Heart")

# Splitting the Features and Target
X = heart_data.drop(columns="target")
Y = heart_data["target"]

# Splitting the Data into Training data & Test Data
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)

print("\nData Shapes:")
print("X:", X.shape)
print("X_train:", X_train.shape)
print("X_test:", X_test.shape)

# Feature Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model Training
model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, Y_train)

# Model Evaluation
X_train_prediction = model.predict(X_train_scaled)
training_data_accuracy = accuracy_score(Y_train, X_train_prediction)
print("\nAccuracy on Training data:", training_data_accuracy)

X_test_prediction = model.predict(X_test_scaled)
test_data_accuracy = accuracy_score(Y_test, X_test_prediction)
print("Accuracy on Test data:", test_data_accuracy)

# Building a Predictive System
# Feature order must match X.columns: age, sex, cp, trestbps, chol, thalach, exang, oldpeak, ca
input_data = (62, 0, 0, 140, 268, 160, 0, 3.6, 2)
input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
input_data_scaled = scaler.transform(input_data_as_numpy_array)

prediction = model.predict(input_data_scaled)
print("\nPrediction result:", prediction)

if prediction[0] == 0:
    print("The Person does not have a Heart Disease")
else:
    print("The Person has Heart Disease")

# Persist the trained model, scaler, and feature order so the API can load them without retraining.
joblib.dump(model, os.path.join(SAVED_MODELS_DIR, "heart_disease_model.pkl"))
joblib.dump(scaler, os.path.join(SAVED_MODELS_DIR, "scaler.pkl"))
joblib.dump(list(X.columns), os.path.join(SAVED_MODELS_DIR, "feature_order.pkl"))
print(f"\nModel, scaler, and feature order saved to {SAVED_MODELS_DIR}")
