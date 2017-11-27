<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress" @click = "btnMove"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="touchStart"
           @touchmove.prevent="touchMove"
           @touchend="touchEnd"
       >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom.js'
  const btnWidth = 16
  const transform = prefixStyle('transform')
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          let progressWidth = this.$refs.progressBar.clientWidth - btnWidth
          let removeWidth = newPercent * progressWidth
          this.btnRemove(removeWidth)
        }
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      touchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        console.log(e.touches[0])
        this.touch.left = this.$refs.progress.clientWidth
      },
      touchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        let move = e.touches[0].pageX - this.touch.startX
        let moveWidth = Math.min(this.$refs.progressBar.clientWidth - btnWidth, Math.max(0, move + this.touch.left))
        this.btnRemove(moveWidth)
      },
      touchEnd() {
        this._triggerPercent()
        this.touch.initiated = false
      },
      btnMove(e) {
        let clickWidth = e.touches[0].pageX - this.$refs.progress.clientWidth
      },
      _triggerPercent() {
        let progressWidth = this.$refs.progressBar.clientWidth - btnWidth
        let newPercent = this.$refs.progress.clientWidth / progressWidth
        this.$emit('changePercent', newPercent)
      },
      btnRemove(removeWidth) {
        this.$refs.progress.style.width = `${removeWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${removeWidth}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
