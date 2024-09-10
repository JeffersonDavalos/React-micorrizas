import tensorflowjs as tfjs
from tensorflow import keras
model = keras.models.load_model('src/Componentes/modelo/micorriza_detector.h5')

tfjs.converters.save_keras_model(model, 'src/Componentes/modelo/web_model')
