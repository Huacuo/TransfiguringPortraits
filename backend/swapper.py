from image_engine import BingImageEngine
import face_swap_py as fspy

landmarks_path = 'data/shape_predictor_68_face_landmarks.dat'
model_3dmm_h5_path = 'data/BaselFaceModel_mod_wForehead_noEars.h5'
model_3dmm_dat_path = 'data/BaselFace.dat'
reg_model_path = 'data/3dmm_cnn_resnet_101.caffemodel'
reg_deploy_path = 'data/3dmm_cnn_resnet_101_deploy.prototxt'
reg_mean_path = 'data/3dmm_cnn_resnet_101_mean.binaryproto'
seg_model_path = 'data/face_seg_fcn8s.caffemodel'          # or 'data/face_seg_fcn8s_300.caffemodel' for lower resolution
seg_deploy_path = 'data/face_seg_fcn8s_deploy.prototxt'    # or 'data/face_seg_fcn8s_300_deploy.prototxt' for lower resolution
generic = False
with_expr = False
with_gpu = False
gpu_device_id = 0


class Swapper:
    def __init__(self):
        self.src_img = None
        self.cur_tgt = None
        self.fs_engine = None
        self.img_engine = None

    def start_fs_engine(self):
        self.fs_engine = fspy.FaceSwap(landmarks_path, model_3dmm_h5_path,
                        model_3dmm_dat_path, reg_model_path,
                        reg_deploy_path, reg_mean_path,
                        seg_model_path, seg_deploy_path,
                        generic, with_expr, with_gpu, gpu_device_id)
    
    def start_img_engine(self):
        key = "f956df8f4aa74af396fbc1a5072e7960"
        self.img_engine = BingImageEngine(key)
    
    def set_image(self, img):
        self.src_img = fspy.FaceData(img)

    def request_images(self, item):
        self.img_engine.request(item)

    def swap(self):
        swapped = self.src_img
        if self.src_img and self.cur_tgt:
        # invoke faceswapping (self.src_img, tgt_img) 
            swapped = self.fs_engine.transfer(self.src_img, self.cur_tgt)
        return swapped

    def compare(self, idx):
        tgt_img = self.img_engine.iterate(idx)
        self.cur_tgt = fspy.FaceData(tgt_img)
        # invoke faceswapping (self.src_img, tgt_img) 
        ret = self.fs_engine.compare(self.src_img, self.cur_tgt)
        return ret

    def process_one(self, idx):
        output = None
        if self.compare(idx):
            output = self.swap()
        return output

    def process(self, img, item):
        self.set_image(img)
        if not self.request_images(item):
            print("Cannot search for images!")

        for idx in range(self.img_engine.length()):
            self.process_one(idx)



