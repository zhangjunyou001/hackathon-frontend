<template>
  <div>
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" >
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>
<script>
import vod from '@/api/vod'

export default {
    asyncData({ params, error }) {
       return vod.getPlayAuth(params.vid)
        .then(response => {
            return {
                playAuth: response.data.data.playAuth,
                vid: params.vid
            }
        })
    },
    mounted() {
        new Aliplayer({
            id: 'J_prismPlayer',
            vid: this.vid,
            playauth: this.playAuth,
            encryptType: '1',
            width: '100%',
            height: '500px',
            cover: 'http://guli.shop/photo/banner/1525939573202.jpg',
            qualitySort: 'asc',

            mediaType: 'video',
            autoplay: false,
            isLive: false,
            rePlay: false,
            preload: true,
            controlBarVisibility: 'hover',
            useH5Prism: true,
        }, function(player) {
            console.log('Create success')
        })
    }
}
</script>
