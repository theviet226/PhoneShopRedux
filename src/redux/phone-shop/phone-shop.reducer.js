import { PHONE_SHOP_TYPE } from "./phone-shop.constant";

const STATE_DEFAULT = {
  isLogin: false,
  count: 52,
  spChiTiet: {
    maSP: 1,
    tenSP: "VinSmart Live",
    manHinh: "AMOLED, 6.2, Full HD+",
    heDieuHanh: "Android 9.0 (Pie)",
    cameraTruoc: "20 MP",
    cameraSau: "Chính 48 MP & Phụ 8 MP, 5 MP",
    ram: "4 GB",
    rom: "64 GB",
    giaBan: 5700000,
    hinhAnh: "/images/phones/vsphone.jpg",
  },

  gioHang: [],
  modal: null,
  // {
  //   status:'',
  //   content: 'Bạn có chắc muốn xoá sản phẩm không ?',
  //   title: 'Xoá sản phẩm'
  //   onOK: ()=>{},
  //   onCancle:() => {}
  // }
};
export const phoneShopReducer = (state = STATE_DEFAULT, action) => {
  switch (action.type) {
    case PHONE_SHOP_TYPE.ChangeSanPhamChiTiet:
      state.spChiTiet = action.payload;
      return { ...state };
    case PHONE_SHOP_TYPE.ThemSanPham: {
      const sp = action.payload;
      const indexSp = state.gioHang.findIndex((item) => sp.maSP === item.maSP);
      let newGioHang = [];

      // -1: chưa có trong giỏ hàng
      if (indexSp === -1) {
        sp.soLuong = 1;
        newGioHang = [...state.gioHang, sp];
      } else {
        sp.soLuong += 1;
        state.gioHang.splice(indexSp, 1, sp); // splice thay đổi mảng gốc

        newGioHang = [...state.gioHang];
      }
      state.gioHang = newGioHang;
      return { ...state };
    }
    case PHONE_SHOP_TYPE.XoaSanPham: {
      // if (window.confirm("Bạn có chắc chắn muốn xóa hay không")) {
      //   const newGioHang = state.gioHang.filter(
      //     (item) => item.maSP !== action.payload
      //   );
      //   state.gioHang = newGioHang;
      // }
      const newGioHang = state.gioHang.filter(
        (item) => item.maSP !== action.payload
      );
      state.gioHang = newGioHang;
      return { ...state };
    }
    case PHONE_SHOP_TYPE.ThayDoiSoLuongSP: {
      const { quantity, maSP } = action.payload;

      const sanPham = state.gioHang.find((item) => item.maSP === maSP);

      if (!sanPham) return state;
      //Giảm số lượng và số lượng đang = 1
      if (sanPham.soLuong === 1 && quantity === -1) {
        const newGioHang = state.gioHang.filter((i) => i.maSP !== maSP);
        state.gioHang = newGioHang;
        return { ...state };
      }
      //Tăng sản phẩm
      sanPham.soLuong += quantity;
      state.gioHang = [...state.gioHang];

      return { ...state };
    }
    case PHONE_SHOP_TYPE.ConfirmXoaSP:{
      state.modal = action.payload;
      return {...state}
    }
    case PHONE_SHOP_TYPE.ResetModal:{
      state.modal = null;
      return {...state};
    }
    default:
      return state;
  }
};
