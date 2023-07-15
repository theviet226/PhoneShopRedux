import { PHONE_SHOP_TYPE } from "./phone-shop.constant";

//action creator
export const changeSanPhamChiTietCreator = (payload) => {
  return {
    type: PHONE_SHOP_TYPE.ChangeSanPhamChiTiet,
    payload,
  };
};
export const themSanPhamCreator = (payload) => {
  return {
    type: PHONE_SHOP_TYPE.ThemSanPham,
    payload,
  };
};
export const xoaSanPhamCreator = (payload) => {
  return {
    type: PHONE_SHOP_TYPE.XoaSanPham,
    payload,
  };
};
export const ThayDoiSoLuongSPCreator = (payload) => {
  return {
    type: PHONE_SHOP_TYPE.ThayDoiSoLuongSP,
    payload,
  };
};
export const ConfirmXoaSPCreator = (payload) =>{
    return{
        type :PHONE_SHOP_TYPE.ConfirmXoaSP,
        payload,
    }
}
export const ResetModalCreator = (payload) => {
    return {
        type : PHONE_SHOP_TYPE.ResetModal,
        payload,
    }
}