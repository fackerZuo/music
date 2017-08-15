<template>
  <transition name="slider">
    <div class="singer-detail"></div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer.js'
  import {ERR_OK} from 'api/config.js'
  import {createSong} from 'common/js/song.js'
  export default {
    data() {
      return {
        song: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getSingerDetail(this.singer.id)
    },
    components: {

    },
    methods: {
      _getSingerDetail(singerId) {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(singerId).then((res) => {
          if (res.code === ERR_OK) {
            this.song = this._normalLizeSongs(res.data.list)
            console.log(this.song)
          }
        })
      },
      _normalLizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
  .slider-enter-active,.slider-leave-active
    transition: all 0.3s
  .slider-enter,.slider-leave-to
    transform:translate3d(100%,0,0)
</style>
