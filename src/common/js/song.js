export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function createrSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.albummid,
    singer: Songers(musicData.singer),
    name: musicData.songname,
    ablum: musicData.albumname,
    image: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://thirdparty.gtimg.com/${musicData.songid}.m4a?fromtag=38`
  })
}
function Songers(songer) {
  let ret = []
  if (!songer.name) {
    return ''
  }
  songer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
