/**
 *  中古車の概要
 */
export interface Detail extends DetailBase {
  userName: string
  nickName: string
  userImageUrl: string
  socialType: Social
  socialId: string
  referenceUrls: string[]
}
