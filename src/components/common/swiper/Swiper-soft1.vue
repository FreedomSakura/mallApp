<template>
    <!-- 轮播图整体 -->
    <div class="Swiper" @touchstart="touchE">
        <!-- 主视图 -->
        <slot></slot>
        <!-- 按钮列表 -->
        <!-- <div class="circleList" ref="circleList"></div> -->
    </div>
</template>

<script>
export default {
    name: 'Swiper',
    props: {
        // 轮播间隔

        // 自动滑动的比例
        Slidingratio: {
            type: Number,
            default: 0.5
        }
    },
    data() {
        return {
            counter: 0,
            length: 0,
            imgWidth: 360,
            Direction: '',
            // 数组，存放子组件，用于软编码
            // 不变的数组
            imgArr: [],
            // 变换的数组
            changeArr: [],
            
        }
    },
    // 在渲染完的时候就填充数组
    mounted() {
        console.log('渲染结束', this.$children)
        // 让初始counter等于图片数量
        this.counter = this.$children.length * 100

        for (var item in this.$children) 
            this.imgArr[item] = this.$children[item]
        for (var item in this.$children) 
            this.changeArr[item] = this.$children[item]
        console.log('改变数组', this.changeArr)

        // // 生成按钮列表
        // for (var i = 0; i < this.imgArr.length; i++) {
        //     this.$refs.circleList.innerHTML += `<div class="circleItem"></div>`
        // }

        // 前三张需要特别设置一下位置，其他的都不用
        this.changeArr[0].$el.style.left = "0px"
        this.changeArr[1].$el.style.left = this.imgWidth + "px"
        this.changeArr[this.changeArr.length - 1].$el.style.left = -this.imgWidth + "px"
        for (var i = 2; i < this.changeArr.length - 1; i++)
            this.changeArr[i].$el.style.left = this.imgWidth + "px"      
    },
    methods: {
        // 滑动切换
        swiperBase(obj) {
            console.log(1)
            var length = obj.length
            var imgWidth = obj.imgWidth
            var imgArr = []
            imgArr = obj.changeArr
            // console.log('obj:', obj)
            // console.log('imgArr:',imgArr)
            // console.log('大imgArr:',obj.imgArr)
            // console.log('changeArr:',obj.changeArr)
            console.log(length)

            // 滑动逻辑
            for (var i = 0; i < imgArr.length; i++) {
                if (i == imgArr.length - 1) {      // 左边
                    imgArr[i].$el.style.left = -(imgWidth + length) + 'px';
                } else if (i == 0) {     // 中间
                    imgArr[i].$el.style.left = -length + 'px'
                } else if (i == 1) {     // 右边
                    imgArr[i].$el.style.left = imgWidth - length + 'px'
                }
            }
        },
        touchE(start) {
            console.log('start')
            console.log(start)

            let that = this
            console.log('that是：', that)

            var zzz =[]
            for (var item in this.imgArr) 
                zzz[item] = this.imgArr[item]

            for (var i = zzz.length - 1; i >= 0; --i) {
                var num = ((that.counter-1) % zzz.length) - i
                if (num >= 0) {
                    that.changeArr[zzz.length - 1 - i] = zzz[num]
                } else {
                    that.changeArr[zzz.length - 1 - i] = zzz[num + zzz.length]
                }
            }

            that.$el.ontouchmove = function(move) {
                console.log('move')
                // 获取滑动的距离
                that.length = start.changedTouches[0].pageX - move.changedTouches[0].pageX

                that.$options.methods.swiperBase(that)
            }
            that.$el.ontouchend = function(end) {
                console.log(end)

                var length = that.length
                var imgWidth = that.imgWidth  
                var imgArr = that.changeArr 
                
                console.log(that.Sildingratio)
                // 拉满的时候
                // 左划
                if (length >= imgWidth*that.Slidingratio && length > 0) {
                    console.log('左划')
                    that.Direction = 'left'
                    // 设置超过幅度就自动滑动的持续时间
                    imgArr[0].$el.style.transitionDuration = "0.5s"
                    imgArr[1].$el.style.transitionDuration = "0.5s"
                    // 重置动画时间，避免干扰到后续操作
                    setTimeout(function(){
                        imgArr[0].$el.style.transitionDuration = "0s"
                        imgArr[1].$el.style.transitionDuration = "0s"
                    }, 400) 

                    // 左划逻辑（这样就可以了！）
                    imgArr[0].$el.style.left = -imgWidth + 'px'   
                    imgArr[1].$el.style.left = 0
                    imgArr[imgArr.length - 1].$el.style.left = imgWidth + 'px'
                }   
                if (length <= -imgWidth*that.Slidingratio && length < 0) {
                    console.log('右划')
                    that.Direction = 'right'

                    // 设置超过幅度就自动滑动的持续时间
                    imgArr[0].$el.style.transitionDuration = "0.5s"
                    imgArr[imgArr.length - 1].$el.style.transitionDuration = "0.5s"
                    // 重置动画时间，避免干扰到后续操作
                    setTimeout(function(){
                        imgArr[0].$el.style.transitionDuration = "0s"
                        imgArr[imgArr.length - 1].$el.style.transitionDuration = "0s"
                    }, 400) 

                    // 右划逻辑！
                    imgArr[0].$el.style.left = imgWidth + 'px'
                    imgArr[1].$el.style.left = -imgWidth + 'px'
                    imgArr[imgArr.length - 1].$el.style.left = 0 + 'px'
                } 

                // 没拉满的时候
                if (that.length < that.imgWidth/2 && that.length >= 0) {
                    console.log('触发了左划！')
                    imgArr[0].$el.style.left = 0 + 'px' 
                    imgArr[1].$el.style.left = that.imgWidth + 'px'    
                    imgArr[imgArr.length - 1].$el.style.left = -that.imgWidth + 'px'
                } 
                else if (-that.length < that.imgWidth/2 && that.length <= 0) {
                    console.log('触发了右划！')
                    imgArr[0].$el.style.left = 0 + 'px' 
                    imgArr[1].$el.style.left = that.imgWidth + 'px'    
                    imgArr[imgArr.length - 1].$el.style.left = -that.imgWidth + 'px'                    
                }
                else {
                    console.log('触发了counter++')
                    if (that.Direction == 'left')
                    {
                        console.log('left')
                        that.counter++
                    }
                     else if (that.Direction == 'right')
                     {
                        console.log('right')
                        that.counter--
                     }
                }
                console.log('end: counter:', that.counter)
            }
        },
    }
}
</script>

<style>
    .Swiper {
        width: 100%;
        height: 200px;

        background-color: yellow;

        position: relative;

        display: flex;

        z-index: 20;
    }

    /* .circleList {
        width: 100px;
        height: 17px;
        
        background-color: rgba(0, 0, 0, 0.4);

        z-index: 3;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        right: 5px;
        bottom: 5px;
    }
    .circleList .circleItem{
        width: 13px;
        height: 13px;
        border-radius: 6.5px;

        margin: 0 3px;
        background-color: white;
    }
    .circleList .circleItem.active{
        background-color: black;
    } */


</style>