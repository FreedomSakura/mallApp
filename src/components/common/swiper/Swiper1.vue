<template>
    <!-- 轮播图整体 -->
    <div class="Swiper"   @touchstart="touchE">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Swiper',
    data() {
        return {
            counter: 0,
            length: 0,
            imgWidth: 360,
            Direction: ''
        }
    },
    methods: {
        // 滑动切换
        swiperBase(obj, img0,img1,img2) {
            console.log(1)
            var length = obj.length
            var imgWidth = obj.imgWidth

            // console.log('obj是', obj)
            console.log(length)

            // console.log('img0', img0.$el)
            // console.log('img1', img1.$el)
            // console.log('img2', img2.$el)

            img0.$el.style.left = -length + 'px'
            //img1.$el.style.right = -imgWidth + length + 'px' 
            img1.$el.style.left = imgWidth - length + 'px'    
            img2.$el.style.left = -(imgWidth + length) + 'px'


                // 左划
                if (length >= imgWidth/2 && length > 0) {
                    console.log('左划')
                    obj.Direction = 'left'
                    // 设置超过幅度就自动滑动的持续时间
                    img0.$el.style.transitionDuration = "0.5s"
                    img1.$el.style.transitionDuration = "0.5s"
                    img2.$el.style.transitionDuration = "0.5s"
                    // 重置动画时间，避免干扰到后续操作
                    setTimeout(function(){
                        img0.$el.style.transitionDuration = "0s"
                        img1.$el.style.transitionDuration = "0s"
                        img2.$el.style.transitionDuration = "0s"
                    }, 500) 

                    img0.$el.style.left = -imgWidth + 'px'   
                    //img1.$el.style.right = 0  + 'px'
                    img1.$el.style.left = 0
                    img2.$el.style.left = imgWidth + 'px'
                }   
                if (length <= -imgWidth/2 && length < 0) {
                    console.log('右划')
                    obj.Direction = 'right'

                    // 设置超过幅度就自动滑动的持续时间
                    img0.$el.style.transitionDuration = "0.5s"
                    img1.$el.style.transitionDuration = "0.5s"
                    img2.$el.style.transitionDuration = "0.5s"
                    // 重置动画时间，避免干扰到后续操作
                    setTimeout(function(){
                        img0.$el.style.transitionDuration = "0s"
                        img1.$el.style.transitionDuration = "0s"
                        img2.$el.style.transitionDuration = "0s"
                    }, 500) 

                    img0.$el.style.left = imgWidth + 'px'   
                    img1.$el.style.left = -imgWidth + 'px'
                    img2.$el.style.left = 0 + 'px'
                } 
        },
        touchE(start) {
            console.log('start')
            //var img = 
            let that = this
            console.log('that是：', that)
            if (that.counter % 3 == 0) {
                var img0 = that.$children[0] // 中间
                var img1 = that.$children[1] // 右边
                var img2 = that.$children[2] // 左边
            } else if (that.counter % 3 == 1) {
                var img0 = that.$children[1] // 中间
                var img1 = that.$children[2] // 右边
                var img2 = that.$children[0] // 左边
            } else if (that.counter % 3 == 2) {
                var img0 = that.$children[2] // 中间
                var img1 = that.$children[0] // 右边
                var img2 = that.$children[1] // 左边
            }     
            that.$el.ontouchmove = function(move) {
                console.log('move')
                //console.log(move)

                // 获取滑动的距离
                that.length = start.changedTouches[0].pageX - move.changedTouches[0].pageX

                that.$options.methods.swiperBase(that, img0,img1,img2)
            }
            that.$el.ontouchend = function(end) {
                var length = that.length
                var imgWidth = that.imgWidth
                // // 左划
                // if (length >= imgWidth/2 && length > 0) {
                //     console.log('左划')

                //     // 设置超过幅度就自动滑动的持续时间
                //     img0.$el.style.transitionDuration = "0.5s"
                //     img1.$el.style.transitionDuration = "0.5s"
                //     img2.$el.style.transitionDuration = "0.5s"
                //     // 重置动画时间，避免干扰到后续操作
                //     setTimeout(function(){
                //         img0.$el.style.transitionDuration = "0s"
                //         img1.$el.style.transitionDuration = "0s"
                //         img2.$el.style.transitionDuration = "0s"
                //     }, 500) 

                //     img0.$el.style.left = -imgWidth + 'px'   
                //     //img1.$el.style.right = 0  + 'px'
                //     img1.$el.style.left = 0
                //     img2.$el.style.left = imgWidth + 'px'
                // }   
                // if (length <= -imgWidth/2 && length < 0) {
                //     console.log('右划')

                //     // 设置超过幅度就自动滑动的持续时间
                //     img0.$el.style.transitionDuration = "0.5s"
                //     img1.$el.style.transitionDuration = "0.5s"
                //     img2.$el.style.transitionDuration = "0.5s"
                //     // 重置动画时间，避免干扰到后续操作
                //     setTimeout(function(){
                //         img0.$el.style.transitionDuration = "0s"
                //         img1.$el.style.transitionDuration = "0s"
                //         img2.$el.style.transitionDuration = "0s"
                //     }, 500) 

                //     img0.$el.style.left = imgWidth + 'px'   
                //     img1.$el.style.left = -imgWidth + 'px'
                //     img2.$el.style.left = 0 + 'px'
                // }                          

                if (that.length < that.imgWidth/2 && that.length > 0) {
                    console.log('触发了左划！')
                    img0.$el.style.left = 0 + 'px'
                    //img1.$el.style.right = -that.imgWidth + 'px'  
                    img1.$el.style.left = that.imgWidth + 'px'    
                    img2.$el.style.left = -that.imgWidth + 'px'
                } 
                else if (-that.length < that.imgWidth/2 && that.length < 0) {
                    console.log('触发了右划！')
                    img0.$el.style.left = 0 + 'px'
                    //img1.$el.style.right = -that.imgWidth + 'px'  
                    img1.$el.style.left = that.imgWidth + 'px'    
                    img2.$el.style.left = -that.imgWidth + 'px'                    
                }
                else {
                    console.log('触发了counter++')
                    that.counter++
                }
                
                console.log('end: counter:', that.counter)
                console.log('end')
                console.log(end)
            }
        }
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
</style>