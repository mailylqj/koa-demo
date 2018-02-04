import { Cookies } from '@/component/utils';
const H5upload = (args) => {
	let self = Object.assign({
		onSuccess: () => {},
		onComplete: () => {},
		onFailure: () => {}
	}, args, this);
	self.uploadUnCompleted = self.files.length;
	for (let i = 0, ii = self.files.length; i < ii; i++) {
		(function(file) {
			var xhr = new XMLHttpRequest();
			if (xhr.upload) {
				// 文件上传成功或是失败
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							try{
								var data = JSON.parse(xhr.responseText);
								//成功上传
								if(data.result == 0){
									self.uploadUnCompleted --;
									self.onSuccess(file, data);
									if (self.uploadUnCompleted === 0) {
										//全部完毕，清空各种
										self.onComplete();
										self.files = [];
									}
								}else{
									self.onFailure(file, data);
								}
							}catch (e){
								self.onFailure(file, data);
							}
						} else {
							self.onFailure(file);
						}
					}
				};

				// 开始上传
				xhr.open('POST', self.url, true);
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

				var fd = new FormData();

				fd.append('token', Cookies.get('__token'));
				fd.append('file', file);
				fd.append('index', i);

				xhr.send(fd);
			}
		})(self.files[i]);
	}
};
export default H5upload;