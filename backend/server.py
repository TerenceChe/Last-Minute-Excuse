import cv2
import numpy as np
from matplotlib import pyplot as plt
from flask import Flask, request
from base64 import b64decode

app = Flask(__name__)

def get_cv2_image_from_data_uri(data_uri: str):
    _, encoded = data_uri.split(",", 1)
    img_str = b64decode(encoded)

    jpg_as_np = np.frombuffer(img_str, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=1)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    return img

def overlay_transparent(background, overlay, x, y):

    background_width = background.shape[1]
    background_height = background.shape[0]

    if x >= background_width or y >= background_height:
        return background

    h, w = overlay.shape[0], overlay.shape[1]

    if x + w > background_width:
        w = background_width - x
        overlay = overlay[:, :w]

    if y + h > background_height:
        h = background_height - y
        overlay = overlay[:h]

    if overlay.shape[2] < 4:
        overlay = np.concatenate(
            [
                overlay,
                np.ones((overlay.shape[0], overlay.shape[1], 1), dtype = overlay.dtype) * 255
            ],
            axis = 2,
        )

    overlay_image = overlay[..., :3]
    mask = overlay[..., 3:] / 255.0

    background[y:y+h, x:x+w] = (1.0 - mask) * background[y:y+h, x:x+w] + mask * overlay_image

    return background

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
    ratio_width = img.shape[1] / background_img.shape[1]

    mask = np.zeros(img.shape[:2],np.uint8)
    bgdModel = np.zeros((1,65),np.float64)
    fgdModel = np.zeros((1,65),np.float64)
    rect = (50,50,450,290)
    cv2.grabCut(img,mask,rect,bgdModel,fgdModel,10,cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
    # Now img is cut so that anything that is not the main character is black

    background_img = cv2.resize(background_img, (0, 0,), fx=1, fy=ratio_height)

    if background_img.shape[1] - img.shape[1] > 0:
        img = cv2.copyMakeBorder(img, 0, 0, 0, background_img.shape[1] - img.shape[1], cv2.BORDER_CONSTANT, value=(0, 0, 0, 0))
        mask2 = cv2.copyMakeBorder(mask2, 0, 0, 0, background_img.shape[1] - mask2.shape[1], cv2.BORDER_CONSTANT, value=(0, 0, 0, 0))
    # person_gray = cv2.cvtColor(mask2, cv2.COLOR_BGR2GRAY)
    ret, person_mask = cv2.threshold(mask2, 0, 255, cv2.THRESH_BINARY)
    person_mask = mask2 > 0.5
    combined = background_img.copy()
    combined[person_mask] = img[person_mask]

    plt.imshow(combined)
    plt.savefig("combined.png")
    return content

