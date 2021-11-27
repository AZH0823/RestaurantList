const express = require('express')
const app = express()

const port = 3000

const exhbs = require('express-handlebars')
app.engine('handlebars', exhbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

// import jason data 
const myResList = require('./restaurant.json')

//index 主畫面的取得
app.get('/', (req, res) => {

  // 練習 單獨或 拿多筆資料
  // const resList = [
  //   {
  //     "id": 1,
  //     "name": "Sababa 沙巴巴中東美食",
  //     "name_en": "Sababa Pita Bar",
  //     "category": "中東料理",
  //     "image": "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
  //     "location": "台北市羅斯福路三段 283 巷 17 號",
  //     "phone": "02 2363 8009",
  //     "google_map": "https://goo.gl/maps/BJdmLuVdDbw",
  //     "rating": 4.1,
  //     "description": "沙巴巴批塔是台灣第一家純手工批塔專賣店,只選用最新鮮的頂級原料,以及道地的中東家傳配方。"
  //   },
  //   {
  //     "id": 2,
  //     "name": "梅子鰻蒲燒專賣店",
  //     "name_en": "Umeko Japanese Unagi House",
  //     "category": "日本料理",
  //     "image": "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5628/02.jpg",
  //     "location": "台北市中山區林森北路 107 巷 8 號",
  //     "phone": " 02 2521 2813",
  //     "google_map": "https://goo.gl/maps/cUJEmFSRKyH2",
  //     "rating": 4.3,
  //     "description": "鰻魚、鰻魚飯、真空鰻魚"
  //   }
  // ]

  // 使用Json 資料來拿餐廳資料
  res.render('index', { resList: myResList.results, searchKeyWord: "" })


})

//Show 餐廳的詳細資料
app.get('/restaurants/:id', (req, res) => {
  // console.log("this id : ", req.params.id)
  const getID = req.params.id //取得餐廳 Req 來的 ID 編號

  //一筆資料 只會有相對應一筆 ID
  const resInfo = myResList.results.find(resInfo => resInfo.id === Number(getID))
  // 顯示showDetails 頁面資訊
  res.render('showDetails', { showID: resInfo })

  // 檢查點進餐廳後是否有切換相對應Router 及 內容
  // res.send(`hello from Show restaurant info : ${getID}`)
})

//Show 您所輸入的關鍵字 
app.get('/search', (req, res) => {
  // 與 index.handlebars name="keyword"
  // console.log(req.query)
  let keyWord = req.query.keyword.trim() // 存所查詢的關鍵字
  if (!keyWord) {
    console.log('沒有輸入值')
    // keyWord = `沒有輸入值`
    res.render('index', { resList: myResList.results, searchKeyWord: "" }) //清空關鍵字，跳出 get 指令
    return
  }

  // 存放符合關鍵字的餐廳清單。清單並不會只有1間; 所以使用filter
  const searchResLInfo = myResList.results.filter(resInfo =>
    resInfo.name.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
  )

  // console.log(searchResLInfo)

  res.render('index', { resList: searchResLInfo, searchKeyWord: keyWord })


  // 按下Search 進餐廳後是否有切換相對應Router 及 內容
  // res.send(`hello from Show restaurant Search keyword : ${keyWord}`)
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})