# Import necessary libraries
import cv2
import os
import numpy as np
from shutil import copyfile

# Set paths for the training data and LBP cascade classifier
training_data_folder_path = 'face/dataset'
lbpcascade_frontalface = 'face/opencv_xml_files/lbpcascade_frontalface.xml'

# Function to detect faces in an input image
def detect_face(input_img):
    image = cv2.cvtColor(input_img, cv2.COLOR_BGR2GRAY)
    
    # Load the LBP cascade classifier
    face_cascade = cv2.CascadeClassifier(lbpcascade_frontalface)
    
    # Detect faces in the image
    faces = face_cascade.detectMultiScale(image, scaleFactor=1.2, minNeighbors=5)
    
    # If no faces are detected, return -1, -1
    if (len(faces) == 0):
        return -1, -1
    
    # Extract the coordinates of the first detected face
    (x, y, w, h) = faces[0]
    
    # Return the region of interest (face) and the face coordinates
    return image[y:y+w, x:x+h], faces[0]

# Function to prepare training data
def prepare_training_data(training_data_folder_path):
    detected_faces = []  # List to store detected faces
    face_labels = []     # List to store corresponding face labels
    
    # List directories in the training data folder
    traning_image_dirs = os.listdir(training_data_folder_path)
    
    # Loop through each directory
    for dir_name in traning_image_dirs:
        label = int(dir_name)  # Convert directory name to integer label
        training_image_path = os.path.join(training_data_folder_path, dir_name)
        training_images_names = os.listdir(training_image_path)
        
        # Loop through each image in the directory
        for image_name in training_images_names:
            image_path = os.path.join(training_image_path, image_name)
            image = cv2.imread(image_path)
            
            # Detect face in the image
            face, rect = detect_face(image)
            
            # If a face is detected, resize it and append to the lists
            if face is not -1:
                resized_face = cv2.resize(face, (121, 121), interpolation=cv2.INTER_AREA)
                detected_faces.append(face)
                face_labels.append(label)

    return detected_faces, face_labels

# Prepare training data
detected_faces, face_labels = prepare_training_data("face/dataset")

# Create LBPH face recognizer and train it
lbphfaces_recognizer = cv2.face.LBPHFaceRecognizer_create(radius=1, neighbors=8)
lbphfaces_recognizer.train(detected_faces, np.array(face_labels))

# Function to draw rectangle around face in an image
def draw_rectangle(test_image, rect):
    (x, y, w, h) = rect
    cv2.rectangle(test_image, (x, y), (x+w, y+h), (0, 255, 0), 2)

# Function to draw text label on an image
def draw_text(test_image, label_text, x, y):
    cv2.putText(test_image, label_text, (x, y), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

# Function to predict the label of a face in a test image
def predict(test_image):
    face, rect = detect_face(test_image)
    if face is not -1:
        label = lbphfaces_recognizer.predict(face)
        label_text = tags[label[0]]  # Get the label text
        draw_rectangle(test_image, rect)
        draw_text(test_image, label_text, rect[0], rect[1]-5)
        return test_image, label_text

# List of label tags
tags = ['0', '1']

# Set the image path for testing
image_path = "face/final/finalphoto.jpg"
test_image = cv2.imread(image_path)

# Predict the label of the face in the test image
predicted_image, label = predict(test_image)

# Print the predicted label
print(label)
