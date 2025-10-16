import io
import numpy as np
from PIL import Image
import tensorflow as tf

model = tf.keras.models.load_model("app/model/pneumonia_cnn.h5")

def predict_image(file_bytes):
    img = Image.open(io.BytesIO(file_bytes)).convert("RGB").resize((224, 224))
    img = np.expand_dims(np.array(img) / 255.0, axis=0)
    prob = model.predict(img)[0][0]
    label = "Pneumonia" if prob > 0.5 else "Normal"
    return {"label": label, "confidence": float(prob)}
