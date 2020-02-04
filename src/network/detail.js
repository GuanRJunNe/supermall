import { request } from './request';
// 请求详情页数据
export function getDetailsData(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}
// 请求商品推荐的数据
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}
// 商品信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 商铺信息
export class Shop {
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
// 商品数值
export class GoodParam {
  constructor(info,rules){
    // images有些商品是有值·有些商品没有值
    this.image = info.image ? 'info.image[0]' :'';
    this.info = info.set;
    this.sizes = rules.tables
  }
}