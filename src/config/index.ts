/* eslint-disable max-lines */
/**
 * 1ページに表示する最大件数
 */
const LIMIT = 30

/**
 * X（旧Twitter）の画像なしURL
 */
const NOT_FOUND_TWITTER_IMAGE =
  'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'

/**
 * 報告ダイアログの識別子
 */
const REPORT = {
  UNPOST: '販売終了申請',
  STOP: '公開停止申請',
  DIFF: '公開された情報が異なる',
}
/**
 * ソートタイプ
 */
const SORT_TYPE = {
  /**
   * 値段
   */
  PRICE: 'price',

  /**
   * 走行距離
   */
  MILEAGE: 'mileage',
}

/**
 * 並び順
 */
const ORDER = {
  /**
   * 昇順
   */
  ASC: 'asc',

  /**
   * 降順
   */
  DESC: 'desc',
}

const SOCIAL_TYPE = {
  /**
   * X（旧Twitter）
   */
  TWITTER: 1,

  /**
   * ジモティー
   */
  JMTY: 2,

  /**
   * ヤフオク
   */
  YAHOO: 3,

  /**
   * ラクマ
   */
  RAKUMA: 4,

  /**
   * メルカリ
   */
  MERCARI: 5,

  /**
   * 問い合わせユーザー
   */
  Contact: 9,
}

/**
 * 価格一覧
 */
const PRICES: KeyLabel[] = [
  { key: undefined, label: '指定なし' },
  { key: 50000, label: '5万円' },
  { key: 100000, label: '10万円' },
  { key: 150000, label: '15万円' },
  { key: 200000, label: '20万円' },
  { key: 250000, label: '25万円' },
  { key: 300000, label: '30万円' },
  { key: 350000, label: '35万円' },
  { key: 400000, label: '40万円' },
  { key: 450000, label: '45万円' },
  { key: 500000, label: '50万円' },
  { key: 550000, label: '55万円' },
  { key: 600000, label: '60万円' },
  { key: 650000, label: '65万円' },
  { key: 700000, label: '70万円' },
  { key: 750000, label: '75万円' },
  { key: 800000, label: '80万円' },
  { key: 850000, label: '85万円' },
  { key: 900000, label: '90万円' },
  { key: 950000, label: '95万円' },
  { key: 1000000, label: '100万円' },
  { key: 1050000, label: '105万円' },
  { key: 1100000, label: '110万円' },
  { key: 1150000, label: '115万円' },
  { key: 1200000, label: '120万円' },
  { key: 1250000, label: '125万円' },
  { key: 1300000, label: '130万円' },
  { key: 1350000, label: '135万円' },
  { key: 1400000, label: '140万円' },
  { key: 1450000, label: '145万円' },
  { key: 1500000, label: '150万円' },
  { key: 1600000, label: '160万円' },
  { key: 1700000, label: '170万円' },
  { key: 1800000, label: '180万円' },
  { key: 1900000, label: '190万円' },
  { key: 2000000, label: '200万円' },
  { key: 2500000, label: '250万円' },
  { key: 3000000, label: '300万円' },
  { key: 3500000, label: '350万円' },
  { key: 4000000, label: '400万円' },
  { key: 4500000, label: '450万円' },
  { key: 5000000, label: '500万円' },
  { key: 6000000, label: '600万円' },
  { key: 7000000, label: '700万円' },
  { key: 8000000, label: '800万円' },
  { key: 9000000, label: '900万円' },
  { key: 10000000, label: '1000万円' },
]

/**
 * 走行距離一覧
 */
const MILEAGES: KeyLabel[] = [
  { key: undefined, label: '指定なし' },
  { key: 50000, label: '5万km' },
  { key: 100000, label: '10万km' },
  { key: 150000, label: '15万km' },
  { key: 200000, label: '20万km' },
  { key: 250000, label: '25万km' },
  { key: 300000, label: '30万km' },
  { key: 350000, label: '35万km' },
  { key: 400000, label: '40万km' },
  { key: 450000, label: '45万km' },
  { key: 500000, label: '50万km' },
]

/**
 * 年号
 */
const YEAR: KeyLabel[] = [
  { label: '指定なし' },
  { key: 2024, label: '令和6年（2024年）' },
  { key: 2025, label: '令和7年（2025年）' },
  { key: 2026, label: '令和8年（2026年）' },
  { key: 2027, label: '令和9年（2027年）' },
  { key: 2028, label: '令和10年（2028年）' },
  { key: 2029, label: '令和11年（2029年）' },
  { key: 2030, label: '令和12年（2030年）' },
]

/**
 * 月
 */
const MONTH: KeyLabel[] = [
  { label: '指定なし' },
  { key: 1, label: '1月' },
  { key: 2, label: '2月' },
  { key: 3, label: '3月' },
  { key: 4, label: '4月' },
  { key: 5, label: '5月' },
  { key: 6, label: '6月' },
  { key: 7, label: '7月' },
  { key: 8, label: '8月' },
  { key: 9, label: '9月' },
  { key: 10, label: '10月' },
  { key: 11, label: '11月' },
  { key: 12, label: '12月' },
]

/**
 * メーカー一覧
 */
const MAKERS = [
  { key: 1, value: 'トヨタ' },
  { key: 2, value: 'ホンダ' },
  { key: 3, value: '日産' },
  { key: 4, value: 'マツダ' },
  { key: 5, value: 'スバル' },
  { key: 6, value: 'スズキ' },
  { key: 7, value: 'レクサス' },
  { key: 8, value: '三菱' },
  { key: 9, value: 'ダイハツ' },
  { key: 10, value: 'いすゞ' },
  { key: 11, value: '光岡自動車' },
  { key: 12, value: '日野自動車' },
  { key: 13, value: 'Audi' },
  { key: 14, value: 'BMW' },
  { key: 15, value: 'Mercedes-Benz' },
  { key: 16, value: 'MINI' },
  { key: 17, value: 'PEUGEOT' },
  { key: 18, value: 'RENAULT' },
  { key: 19, value: 'Volkswagen' },
  { key: 20, value: 'VOLVO' },
  { key: 21, value: 'Alfa Romeo' },
  { key: 22, value: 'Porsche' },
  { key: 23, value: 'Chevrolet' },
  { key: 24, value: 'Cadillac' },
  { key: 25, value: 'Jeep' },
  { key: 26, value: 'Ford' },
  { key: 27, value: 'Range Rover' },
  { key: 28, value: 'FIAT' },
  { key: 29, value: 'Maserati' },
  { key: 30, value: 'Ferrari' },
  { key: 31, value: 'Lamborghini' },
  { key: 32, value: 'Citroen' },
  { key: 33, value: 'Smart' },
  { key: 34, value: 'Dodge' },
  { key: 35, value: 'GMC' },
  { key: 36, value: 'Tesla' },
  { key: 37, value: 'CHRYSLER' },
  { key: 38, value: 'LINCOLN' },
  { key: 39, value: 'Jaguar' },
]

/**
 * IndexedDB関連の定数
 */
const INDEXED_DB = {
  /**
   * DB名
   */
  NAME: 'olcar',

  /**
   * バージョン
   */
  VERSION: 3,

  /**
   * 閲覧履歴の保存件数
   */
  HISTORY_LENGTH: 5,
}

/**
 * ISO8601のフォーマット
 */
const ISO8601_FORMAT = 'YYYY-MM-DDTHH:mm:ss'

/**
 * ローカルストレージのキー
 */
const LOCALSTORAGE = {
  /**
   * お気に入り
   */
  FAVORITE: 'favorite',

  /**
   * 履歴
   */
  HISTORY: 'history',
}

const PREFECTURES: Map<string, string> = new Map([
  ['北海道', 'ほっかいどう'],
  ['青森県', 'あおもり'],
  ['岩手県', 'いわて'],
  ['宮城県', 'みやぎ'],
  ['秋田県', 'あきた'],
  ['山形県', 'やまがた'],
  ['福島県', 'ふくしま'],
  ['茨城県', 'いばらき'],
  ['栃木県', 'とちぎ'],
  ['群馬県', 'ぐんま'],
  ['埼玉県', 'さいたま'],
  ['千葉県', 'ちば'],
  ['東京都', 'とうきょう'],
  ['神奈川県', 'かながわ'],
  ['新潟県', 'にいがた'],
  ['富山県', 'とやま'],
  ['石川県', 'いしかわ'],
  ['福井県', 'ふくい'],
  ['山梨県', 'やまなし'],
  ['長野県', 'ながの'],
  ['岐阜県', 'ぎふ'],
  ['静岡県', 'しずおか'],
  ['愛知県', 'あいち'],
  ['三重県', 'みえ'],
  ['滋賀県', 'しが'],
  ['京都府', 'きょうと'],
  ['大阪府', 'おおさか'],
  ['兵庫県', 'ひょうご'],
  ['奈良県', 'なら'],
  ['和歌山県', 'わかやま'],
  ['鳥取県', 'とっとり'],
  ['島根県', 'しまね'],
  ['岡山県', 'おかやま'],
  ['広島県', 'ひろしま'],
  ['山口県', 'やまぐち'],
  ['徳島県', 'とくしま'],
  ['香川県', 'かがわ'],
  ['愛媛県', 'えひめ'],
  ['高知県', 'こうち'],
  ['福岡県', 'ふくおか'],
  ['佐賀県', 'さが'],
  ['長崎県', 'ながさき'],
  ['熊本県', 'くまもと'],
  ['大分県', 'おおいた'],
  ['宮崎県', 'みやざき'],
  ['鹿児島県', 'かごしま'],
  ['沖縄県', 'おきなわ'],
])

export const Constants = {
  PRICES,
  MILEAGES,
  SORT_TYPE,
  ORDER,
  REPORT,
  NOT_FOUND_TWITTER_IMAGE,
  LIMIT,
  MAKERS,
  SOCIAL_TYPE,
  INDEXED_DB,
  ISO8601_FORMAT,
  YEAR,
  MONTH,
  LOCALSTORAGE,
  PREFECTURES,
}
