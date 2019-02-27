# 打卡签到项目

## flexible + rem布局与vw布局的区别

### 1.flexible + rem布局原理
以750px宽度的设计稿为例，Flexible会将视觉稿分成```100份```（主要为了以后能更好的兼容vh和vw），而每一份被称为一个单位a。同时1rem单位被认定为10a。
所以，可以算出：

```
1a   = 7.5px
1rem = 75px

```
这样算来，html的font-size就是75px，也就是说iPhone6，7，8设备在HTML的font-size就是75px。那其他设备的font-size是如何定的呢？

下面代码是flexible源码的一部分，
```
function refreshRem(){
    var width = docEl.getBoundingClientRect().width; //width就是html的宽度
    if (width / dpr > 540) {
        width = 540 * dpr; //dpr是计算出来的window.devicePixelRatio，只有1，2，3三种值；这里的540是给设备的宽度定一个最大值，因为主流手机中最大的分辨率是1080*1920，超过1080宽度用540*2来算
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px'; //给html设置font-size
    flexible.rem = win.rem = rem;
}
```
这样的话不同的设备的html就会有不一样的font-size，而我们的css单位是rem，所以达到了适配的效果，让不同设备显示页面的效果和设计稿一致。

总结来说，flexible主要做了三件事：

* 动态改写<meta>标签，改viewport的缩放比例
* 给<html>元素添加data-dpr属性，并且动态改写data-dpr的值
* 给<html>元素添加font-size属性，并且动态改写font-size的值

有兴趣可看一下flexible源码，地址：[flexible](https://github.com/amfe/lib-flexible/blob/master/src/flexible.js)

### 2.vw布局原理

vw比较简单，视觉设计稿，我们都是使用750px宽度的，从上面的原理来看，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值达到适配的效果

### 3.两种方案比较

1.flexible不是纯css的移动适配方案，需要引入js文件。vw不需要
2.兼容性：flexible+rem几乎兼容所以移动端浏览器，vw兼容性稍微差一点点（opera Mini 不支持），但浏览器兼容规范内的浏览器都没问题
3.flexible对Android机型处理的比较粗鲁，drp统一设成了1

总得来说，vw是趋势，（手淘团队已经放弃flexible方案了）

## generator说明

### 1.vw方案

此生成器是用vw为单位达到适配各种终端的方案，vw：是Viewport's width的简写,1vw等于window.innerWidth的1%

以前的Flexible方案是通过JavaScript来模拟vw的特性，

那么到今天为止，vw已经得到了众多浏览器的支持，也就是说，可以直接考虑将vw单位运用于我们的适配布局中。

开发过程中，我们还是按照以前的方式写样式，单位直接写设计稿上的px单位，postcss会帮我们转成vw单位，

### 2.容器的长宽比缩放

需要注意的一点是，如果有img、iframe、object、video和embed等元素的布局，推荐使用CSS实现容器长宽比，

这时候需要考虑到[容器的长宽比缩放](https://www.w3cplus.com/css/aspect-ratio.html)，

这里采用的是垂直方向的padding来撑开容器的高度，

不局限于上面的元素，任何需要自适应容器长宽比都可以用此方案，保证元素宽高比和设计稿一致

## 更新日志

#### 2018.03.13

