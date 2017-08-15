<template>
  <transition name="slider">
    <music-list :bg-image="bgImage" :songs="song" :title="title"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list.vue'
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
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getSingerDetail(this.singer.id)
    },
    components: {
      MusicList
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
        console.log(ret)
        return ret
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .slider-enter-active,.slider-leave-active
    transition: all 0.3s
  .slider-enter,.slider-leave-to
    transform:translate3d(100%,0,0)
</style>
