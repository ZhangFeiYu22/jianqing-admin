// 这个主要是图片上传的问题处理(单独写的图片上传)
import axios from "axios";
import {
  Message,
  Loading
} from 'element-ui'

let loading //定义loading变量
function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '上传中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() { //使用Element loading-close 方法
  loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
const url = `${process.env.BASE_API}/backend/upload`;
const config = {
  // 请求头
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": localStorage.getItem('Authorization')
  }
};
export default {
  /* 返回一个值 */
  getPicData(file, boxData) {
    let imgData = new FormData();
    imgData.append("file", file);
    showFullScreenLoading()
    axios.post(url, imgData, config)
      .then(response => {
        if (response.status == 200) {
          tryHideFullScreenLoading()
          boxData.splice(0, 1, response.data.file_path);
          Message.success('上传成功');
          console.log(boxData)
        } else {
          Message('上传失败');
        }
      })
  },
  /* 返回数组 */
  getPicDataArray(file, boxData) {
    let imgData = new FormData();
    imgData.append("file", file);
    showFullScreenLoading()
    axios.post(url, imgData, config)
      .then(response => {
        console.log('3==', response)
        if (response.status == 200) {
          tryHideFullScreenLoading()
          boxData.push(response.data.file_path);
          Message.success('上传成功');
        } else {
          Message('上传失败');
        }
      })
  }
}
