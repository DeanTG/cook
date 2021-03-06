# cook

> A Vue.js project


## 问题日记
* App.vue引入多个css文件，加‘；’，不然不解析
* axios 发送post请求时，要配置Content-type，将post的参数从preload data转换成form data
* 全局引入scss变量，[方案一](https://hopkinson.github.io/2017/06/30/Vue%E4%B8%ADSASS%E5%A6%82%E4%BD%95%E5%85%A8%E5%B1%80%E4%BD%BF%E7%94%A8%E5%8F%98%E9%87%8F%EF%BC%8Cmixin%EF%BC%8C%E6%88%96%E8%80%85function/),[方案二](https://github.com/shakacode/sass-resources-loader)
* 静态资源加载（图片）
* 通过在main里添加Vue.prototype.BUS=new Vue()新建一个vue实例作为中央事件总线，来进行非父子组件之间的通信，后续改为vuex
* 使用的localStorage进行多页面参数的状态保持，还没研究keep-alive机制
* 调用的后端接口并没有token的鉴权，登录之后存一个本地数据模拟，在axios接口请求的时候增加拦截，router对象控制页面的跳转
* 把点菜部分通过vuex进行状态管理，action提交mutation驱动state改变，action操作的行为可异步，mutation操作数据不可异步，mapActions,mapMutations只能有一个载荷的参数
* action 和mutation 都可以驱动数据改变，通过action->mutation->state只是一种规范行为，vuex相关[issue](https://github.com/vuejs/vuex/issues/587)讨论
* [keep-alive](http://www.jianshu.com/p/0b0222954483)



## 技术方案
* [图片上传](http://blog.csdn.net/xiaogezl/article/details/70156500)
* mint-picker + mint-popup 自定义时间日期选择器，并自定义时间