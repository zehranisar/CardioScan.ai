# Importing the Dependencies
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Data Collection and Processing
# Load the csv data to a Pandas DataFrame
heart_data = pd.read_csv('data.csv')

# Displaying basic information
print("First 5 rows of the dataset:")
print(heart_data.head())

print("\nLast 5 rows of the dataset:")
print(heart_data.tail())

print("\nDataset shape (rows, columns):", heart_data.shape)

print("\nData Info:")
print(heart_data.info())

print("\nMissing values in each column:")
print(heart_data.isnull().sum())

print("\nStatistical description of data:")
print(heart_data.describe())

print("\nDistribution of target variable:")
print(heart_data['target'].value_counts())
print("\n1 --> Defective Heart\n0 --> Healthy Heart")

# Splitting the Features and Target
X = heart_data.drop(columns='target', axis=1)
Y = heart_data['target']

print("\nFeature Data (X):")
print(X)

print("\nTarget Data (Y):")
print(Y)

# Splitting the Data into Training data & Test Data
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)

print("\nData Shapes:")
print("X:", X.shape)
print("X_train:", X_train.shape)
print("X_test:", X_test.shape)

# Model Training
model = LogisticRegression()
model.fit(X_train, Y_train)

# Model Evaluation

# Accuracy on training data
X_train_prediction = model.predict(X_train)
training_data_accuracy = accuracy_score(Y_train, X_train_prediction)
print('\nAccuracy on Training data:', training_data_accuracy)

# Accuracy on test data
X_test_prediction = model.predict(X_test)
test_data_accuracy = accuracy_score(Y_test, X_test_prediction)
print('Accuracy on Test data:', test_data_accuracy)

# Building a Predictive System
input_data = (62, 0, 0, 140, 268, 0, 0, 160, 0, 3.6, 0, 2, 2)

# Change input data to numpy array
input_data_as_numpy_array = np.asarray(input_data)

# Reshape for prediction (1 instance)
input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

prediction = model.predict(input_data_reshaped)
print("\nPrediction result:", prediction)

if prediction[0] == 0:
    print('The Person does not have a Heart Disease')
else:
    print('The Person has Heart Disease')
