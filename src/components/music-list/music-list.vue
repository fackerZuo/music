<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="setImage" ref="tops">
      <div class="filter" ref="filter"></div>
      <div class="play-wrapper" v-show="songs.length > 0" ref="play">
        <div class="play">
          <i class="icon-play"></i>
          <h3 class="text">随机播放全部</h3>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="bglayer"></div>
    <scroll :data="songs" class="list" ref="scroll" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import {prefixStyle} from 'common/js/dom'
  import Loading from 'base/loading/loading'
  import {mapActions} from 'vuex'
  const NAV_HEIGHT = 40
  const backdrop = prefixStyle('backdrop-filter')
  const transform = prefixStyle('transform')
  export default {
    data() {
      return {
        probeType: 3,
        listenScroll: true,
        scrollY: 0
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      bgImage: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.bgImageHeight = this.$refs.tops.clientHeight
      this.scrollHeight = -this.bgImageHeight + NAV_HEIGHT
      this.$refs.scroll.$el.style.top = `${this.$refs.tops.clientHeight}px`
    },
    methods: {
      scroll(res) {
        this.scrollY = res.y
      },
      back() {
        this.$router.back()
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      scrollY(newY) {
        let height = Math.max(this.scrollHeight, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0
        this.$refs.bglayer.style[transform] = `translate3d(0,${height}px,0)`
        const percent = Math.abs(newY / this.bgImageHeight)
        if (newY > 0) {
          zIndex = 10
          scale = scale + percent
          this.$refs.tops.style[transform] = `scale(${scale})`
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (newY < this.scrollHeight) {
          zIndex = 10
          this.$refs.tops.style.paddingTop = 0
          this.$refs.tops.style.height = `${NAV_HEIGHT}px`
          this.$refs.play.style['display'] = 'none'
        } else {
          this.$refs.tops.style.paddingTop = '70%'
          this.$refs.tops.style.height = 0
          this.$refs.play.style['display'] = 'block'
        }
        this.$refs.tops.style.zIndex = zIndex
      }
    },
    computed: {
      setImage() {
        return `background-image:url(${this.bgImage})`
      }
    },
    components: {
      SongList,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
