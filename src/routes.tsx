import Fans from './pages/Fans'
import Home from './pages/Home'
import Meet from './pages/Meet'
import Song from './pages/Song'
import Video from './pages/Video'
import Wishes from './pages/Wishes'

export default [
  { key: 'home', name: '首頁', path: '/', component: <Home /> },
  { key: 'video', name: '影片', path: '/video', component: <Video /> },
  { key: 'song', name: '原創曲', path: '/song', component: <Song /> },
  { key: 'wishes', name: '祝福', path: '/wishes', component: <Wishes /> },
  { key: 'meet', name: '聚會', path: '/meet', component: <Meet /> },
  { key: 'fans', name: '烏梅', path: '/fans', component: <Fans /> },
]
