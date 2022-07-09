from sanic import Sanic
from sanic.response import json
import tensorflow as tf
import numpy as np

app = Sanic("tf_deploy_model")

# 
model_path = '../image-ai-server/myTrainingModel.h5'
predict_Model = tf.keras.models.load_model(model_path)

label=['apple_pie', 'baby_back_ribs', 'barbecue_pork', 'beet_salad', 'bibimbap', 'breakfast_burrito', 'bubble_tea', 'caesar_salad', 'carrot_cake', 'cheesecake', 'chicken_curry', 'chicken_quesadilla', 'chicken_wings', 'chocolate_cake', 'clam_chowder', 'club_sandwich', 'congee', 'crab_cakes', 'cup_cakes', 'donuts', 'dumplings', 'edamame', 'eggs_benedict', 'egg_tart', 'escargots', 'fish_and_chips', 'french_fries', 'fried_beef_noodles', 'fried_calamari', 'fried_rice', 'frozen_yogurt', 'garlic_bread', 'greek_salad', 'grilled_salmon', 'gyoza', 'hamburger', 'hk_french_toast', 'hot_and_sour_soup', 'hot_dog', 'hot_pot', 'ice_cream', 'lasagna', 'lobster_bisque', 'macaroni_and_cheese', 'macarons', 'miso_soup', 'mussels', 'omelette', 'onion_rings', 'oysters', 'pad_thai', 'pancakes', 'peking_duck', 'pho', 'pizza', 'ramen', 'rice_noodle', 'rice_roll', 'risotto', 'samosa', 'sashimi', 'satay_beef_noodle', 'scallops', 'seaweed_salad', 'siu_mai', 'spaghetti_bolognese', 'spaghetti_carbonara', 'spring_rolls', 'steak', 'strawberry_shortcake', 'sushi', 'tiramisu', 'waffles']

@app.post("/")
def callModel(request):
    # body = request.json
    # print(body['food'])
    image = request.json["filename"]
    imgSize = 240
    imgPath = "upload/" + image 
    image = tf.keras.preprocessing.image.load_img(
    imgPath, color_mode="rgb", target_size=(imgSize,imgSize)
    )
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])
    prediction = predict_Model.predict(input_arr)
    prediction_Argsort = np.argsort(prediction[0])[::-1]
    result_label = label[ prediction_Argsort[0] ]
    return json({"name": result_label} )
    # return json({'name':name})
    # return json({'msg':body['food']})

# @app.route("/")
# def test(request):
#     return json({"hello": "world"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080)