
// 这个主要是图片上传的问题处理(单独写的图片上传)
import axios from "axios";
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth'

const token = getToken();
const url = `${process.env.BASE_API}attachment/attachment/uploadfile`;
const config = {
  // 请求头
  headers: {
    "Content-Type": "multipart/form-data"
  }
};
export default {
  /* 返回一个值 */
  getPicData(file, boxData) {
    let imgData = new FormData();
    imgData.append("file", file);
    imgData.append("access_token", token);
    axios.post(url, imgData, config)
      .then(response => {
        if (response.data.code === 0) {
          boxData.splice(0, 1, response.data.data.filepath);
          Message.success('上传成功');
        } else {
          Message('上传失败');
        }
      })
  },
  /* 返回数组 */
  getPicDataArray(file, boxData) {
    let imgData = new FormData();
    imgData.append("file", file);
    imgData.append("access_token", token);
    axios.post(url, imgData, config)
      .then(response => {
        if (response.data.code === 0) {
          boxData.push(response.data.data.filepath);
          Message.success('上传成功');
        } else {
          Message('上传失败');
        }
      })
  },
  /* 返回成功状态  回调 */
  picMaterial(file, self, callBack) {
    let imgData = new FormData();
    imgData.append("file", file);
    imgData.append("access_token", token);
    axios.post(url, imgData, config)
      .then(response => {
        if (response.data.code === 0) {
          Message.success('上传成功');
          callBack(self, response.data.code); //回调函数
        } else {
          Message('上传失败');
        }
      })
  },
  /* 异步上传 */
  async upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("access_token", token);
    let res = await axios.post(url, formData, config);
    return new Promise((resolve, reject) => {
      if (res.data.code === 0) {
        resolve(res.data.data.filepath);
      } else {
        reject(res.data.message);
      }
    }).catch(err => {
      Message.error(err);
    })
  }
}
