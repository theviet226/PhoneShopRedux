import React, { Component } from "react";
import XemChiTietRedux from "./xem-chi-tiet-redux";
import PhoneItemRedux from "./phone-item-redux";
import GioHangRedux from "./gio-hang-redux";
import { connect } from "react-redux";
import {
  changeSanPhamChiTietCreator,
  themSanPhamCreator,
} from "../../../redux/phone-shop/phone-shop.action";
import Modal from "./component/modal";
// import { Connect } from "react-redux";
// import default
// import mock_data from "./mock-data.json";

// import { data } from "./mock-data";
// console.log(data);
// console.log(mock_data);

class Product {}
const obj1 = new Product();
const obj2 = {};

const listProduct = [
  {
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
  {
    maSP: 2,
    tenSP: "Meizu 16Xs",
    manHinh: "AMOLED, FHD+ 2232 x 1080 pixels",
    heDieuHanh: "Android 9.0 (Pie); Flyme",
    cameraTruoc: "20 MP",
    cameraSau: "Chính 48 MP & Phụ 8 MP, 5 MP",
    ram: "4 GB",
    rom: "64 GB",
    giaBan: 7600000,
    hinhAnh: "/images/phones/sp_blackberry.png",
  },
  {
    maSP: 3,
    tenSP: "Iphone XS Max",
    manHinh: "OLED, 6.5, 1242 x 2688 Pixels",
    heDieuHanh: "iOS 12",
    cameraSau: "Chính 12 MP & Phụ 12 MP",
    cameraTruoc: "7 MP",
    ram: "4 GB",
    rom: "64 GB",
    giaBan: 27000000,
    hinhAnh: "/images/phones/sp_iphoneX.png",
  },
];

// component: logic + UI ( X )

// component chỉ để show UI.
// redux thì xử lý logic.

class PhoneShopRedux extends Component {
  state = {
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
  };
  // state muốn xét lại được đặt ở đâu thì gọi method this.setState ở tại component đó.

  // binding lên giao diện, và xử lý xét lại state.

  handleChange = () => {
    this.setState({ isLogin: true }); // 1.
    this.setState({ isLogin: true }); // 2.
  };

  handleChangeCount = (value) => {
    this.setState({
      count: this.state.count + value,
    });
  };

  // handleChangeSanPhamChiTiet = (sp) => {
  //   this.setState({
  //     spChiTiet: sp,
  //   });
  // };

  handleAddSanPham = (sp) => {
    const indexSp = this.state.gioHang.findIndex(
      (item) => sp.maSP === item.maSP
    );
    let newGioHang = [];

    // -1: chưa có trong giỏ hàng
    if (indexSp === -1) {
      sp.soLuong = 1;
      newGioHang = [...this.state.gioHang, sp];
    } else {
      sp.soLuong += 1;
      // 2 | 1 |3
      // xóa đi '1' phần tử có 'indexSp', và thêm 'sp' vào tại vị trí đó
      this.state.gioHang.splice(indexSp, 1, sp); // splice thay đổi mảng gốc
      // toSplice

      newGioHang = this.state.gioHang;

      // firefox: chưa support
      // newGioHang = this.state.gioHang.toSpliced(indexSp, 1, sp);
    }

    this.setState({
      gioHang: newGioHang,
    });
  };

  handleDeleteSp = (maSP) => {
    // lọc lấy ra những phần tử mà chúng không muốn xóa
    // xóa đi phần tử có maSP === maSP

    // window.confirm() => return về true | false

    if (window.confirm("Bạn có chắc chắn muốn xóa hay không")) {
      const newGioHang = this.state.gioHang.filter(
        (item) => item.maSP !== maSP
      );

      this.setState({
        gioHang: newGioHang,
      });
    }
  };

  // nếu như function có từ 2->3 tham số trở lên thì nên truyền dưới dạng object.
  handleChangeQuantity = (params) => {
    const { quantity, maSP } = params;

    const sanPham = this.state.gioHang.find((item) => item.maSP === maSP);

    if (!sanPham) return;

    if (sanPham.soLuong === 1 && quantity === -1) {
      this.handleDeleteSp(maSP); // thuc hien xong.
      // thoát khỏi function không thực hiện những dòng lệnh phía dưới nữa.
      return;
    }

    sanPham.soLuong += quantity;

    console.log("Gio Hang Sau Khi Thay Doi", this.state.gioHang);

    this.setState({
      gioHang: this.state.gioHang,
    });
  };

  render() {
    console.log(this.props);
    // this.props => type object
    return (
      <div className="container">
        {this.props.modal ? <Modal modal={this.props.modal} /> : null}

        <GioHangRedux />
        <div className="mt-2">
          <div className="row">
            {listProduct.map((item) => {
              return (
                <div key={item.maSP} className="col-4">
                  <PhoneItemRedux
                    onAddSanPham={this.props.handleAddSanPham}
                    onChangeSanPham={this.props.handleChangeSanPhamChiTiet}
                    phone={item}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-2">
          <XemChiTietRedux sanPham={this.props.sanPhamChiTiet} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    sanPhamChiTiet: rootReducer.phoneShopReducer.spChiTiet,
    gioHang: rootReducer.phoneShopReducer.gioHang,
    modal: rootReducer.phoneShopReducer.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeSanPhamChiTiet: (sanPham) => {
      dispatch(changeSanPhamChiTietCreator(sanPham));
    },
    handleAddSanPham: (sanPham) => {
      dispatch(themSanPhamCreator(sanPham));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneShopRedux);
