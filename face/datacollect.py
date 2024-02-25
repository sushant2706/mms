import cv2
import os

video = cv2.VideoCapture(0)

directory_path = 'D:/Git/mms/face/dataset'

# List all directories in the specified path
directories = [d for d in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, d))]

# Function to extract numeric values from directory names
def extract_numeric(directory_name):
    try:
        return int(directory_name)
    except ValueError:
        return 0

# Extract numeric values
numeric_values = [extract_numeric(directory) for directory in directories]

# Find the highest numeric value
highest_numeric_value = max(numeric_values)

user_id = highest_numeric_value + 1

# Create a folder for each user
user_folder = f"face/dataset/{user_id}"
os.makedirs(user_folder, exist_ok=True)

count = 0

while True:
    ret, frame = video.read()

    count += 1
    # Save the captured image in the user's folder
    cv2.imwrite(f'{user_folder}/{user_id}_{count}.jpg', frame)

    cv2.imshow("Frame", frame)

    k = cv2.waitKey(30)

    if count > 500:
        break

video.release()
cv2.destroyAllWindows()
print("Dataset Collection Done")
