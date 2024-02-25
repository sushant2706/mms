import cv2
import os
import numpy as np
from shutil import copyfile

training_data_folder_path = 'face/dataset'
lbpcascade_frontalface = 'face/opencv_xml_files/lbpcascade_frontalface.xml'

def detect_face(input_img):
    image = cv2.cvtColor(input_img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(lbpcascade_frontalface)
    faces = face_cascade.detectMultiScale(image, scaleFactor=1.2, minNeighbors=5)
    if (len(faces) == 0):
        return -1, -1
    (x, y, w, h) = faces[0]
    return image[y:y+w, x:x+h], faces[0]

def prepare_training_data(training_data_folder_path):
    detected_faces = []
    face_labels = []
    
    traning_image_dirs = os.listdir(training_data_folder_path)
    for dir_name in traning_image_dirs:
        label = int(dir_name)
        training_image_path = os.path.join(training_data_folder_path, dir_name)
        training_images_names = os.listdir(training_image_path)
        
        for image_name in training_images_names:
            image_path = os.path.join(training_image_path, image_name)
            image = cv2.imread(image_path)
            face, rect = detect_face(image)
            if face is not -1:
                resized_face = cv2.resize(face, (121, 121), interpolation=cv2.INTER_AREA)
                detected_faces.append(face)
                face_labels.append(label)

    return detected_faces, face_labels

detected_faces, face_labels = prepare_training_data("face/dataset")

lbphfaces_recognizer = cv2.face.LBPHFaceRecognizer_create(radius=1, neighbors=8)
lbphfaces_recognizer.train(detected_faces, np.array(face_labels))

def draw_rectangle(test_image, rect):
    (x, y, w, h) = rect
    cv2.rectangle(test_image, (x, y), (x+w, y+h), (0, 255, 0), 2)

def draw_text(test_image, label_text, x, y):
    cv2.putText(test_image, label_text, (x, y), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

def predict(test_image):
    face, rect = detect_face(test_image)
    if face is not -1:
        label = lbphfaces_recognizer.predict(face)
        label_text = tags[label[0]]
        draw_rectangle(test_image, rect)
        draw_text(test_image, label_text, rect[0], rect[1]-5)
        return test_image, label_text

tags = ['0', '1']

# Set the image path here
image_path = "face/final/finalphoto.jpg"
test_image = cv2.imread(image_path)
predicted_image, label = predict(test_image)
print(label)
