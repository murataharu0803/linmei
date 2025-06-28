import Archives from './pages/Archives'
import Arts from './pages/Arts'
import Credit from './pages/Credit'
import Fanfic from './pages/Fanfic'
import Fans from './pages/Fans'
import Home from './pages/Home'
import Meet from './pages/Meet'
import Prize from './pages/Prize'
import Signatures from './pages/Signatures'
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
  { key: 'signatures', name: '簽名', path: '/signatures', component: <Signatures /> },
  { key: 'arts', name: '二創', path: '/arts', component: <Arts /> },
  { key: 'fanfic', name: '同人', path: '/fanfic', component: <Fanfic /> },
  { key: 'archives', name: '直播紀錄', path: '/archives', component: <Archives /> },
  { key: 'prize', name: '榮譽證書', path: '/prize', component: <Prize /> },
  { key: 'credit', name: '製作名單', path: '/credit', component: <Credit /> },
]
