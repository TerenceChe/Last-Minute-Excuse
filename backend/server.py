import cv2
import numpy as np
from matplotlib import pyplot as plt
from flask import Flask, make_response, request
from base64 import b64decode, b64encode

app = Flask(__name__)

def get_cv2_image_from_data_uri(data_uri: str):
    _, encoded = data_uri.split(",", 1)
    img_str = b64decode(encoded)

    jpg_as_np = np.frombuffer(img_str, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=1)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    return img
    
@app.route("/", methods=["OPTIONS"])
def aaaa():
    resp = make_response()
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = '*'

    return resp

@app.route("/", methods=['POST'])
def main():
    content = request.get_json()
    # print(content)
    person = content['image']
    background = content['background']

    img = get_cv2_image_from_data_uri(person)
    background_img = get_cv2_image_from_data_uri(background)

    print(img.shape, background_img.shape)

    ratio_height = img.shape[0] / background_img.shape[0]

    mask = np.zeros(img.shape[:2],np.uint8)
    bgdModel = np.zeros((1,65),np.float64)
    fgdModel = np.zeros((1,65),np.float64)
    rect = (int(img.shape[1] / 4), 0, img.shape[1] ,img.shape[0])
    cv2.grabCut(img,mask,rect,bgdModel,fgdModel,10,cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
    # Now img is cut so that anything that is not the main character is black

    background_img = cv2.resize(background_img, (0, 0,), fx=1, fy=ratio_height)

    print(img.shape, background_img.shape)

    if background_img.shape[1] - img.shape[1] > 0:
        img = cv2.copyMakeBorder(img, 0, 0, 0, background_img.shape[1] - img.shape[1], cv2.BORDER_CONSTANT, value=(0, 0, 0, 0))
        mask2 = cv2.copyMakeBorder(mask2, 0, 0, 0, background_img.shape[1] - mask2.shape[1], cv2.BORDER_CONSTANT, value=(0, 0, 0, 0))
    else:
        # img = cv2(img, 0, 0, 0, img.shape[1] - background_img.shape[1], cv2.BORDER_CONSTANT, value=(0, 0, 0, 0))
        img = img[0:background_img.shape[0], 0:background_img.shape[1]]
        mask2 = mask2[0:background_img.shape[0], 0:background_img.shape[1]]
        # mask2 = cv2.copyMakeBorder(mask2, 0, 0, 0, mask2.shape[1] - background_img.shape[1], cv2.BORDER_CONSTANT, value=(0, 0, 0, 0))

    print(img.shape, background_img.shape)

    # person_gray = cv2.cvtColor(mask2, cv2.COLOR_BGR2GRAY)
    ret, person_mask = cv2.threshold(mask2, 0, 255, cv2.THRESH_BINARY)
    person_mask = mask2 > 0.5
    combined = background_img.copy()
    combined[person_mask] = img[person_mask]

    combined = cv2.cvtColor(combined, cv2.COLOR_BGR2RGB)

    resp = make_response({
        "image": f"data:image/jpeg;base64,{b64encode(cv2.imencode('.jpg', combined)[1].tostring()).decode('utf-8')}"
    }) #here you could use make_response(render_template(...)) too
    resp.headers['Access-Control-Allow-Origin'] = '*'

    return resp
