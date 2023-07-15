import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ConfirmXoaSPCreator,
  ResetModalCreator,
  xoaSanPhamCreator,
} from "../../../redux/phone-shop/phone-shop.action";
import { ThayDoiSoLuongSPCreator } from "../../../redux/phone-shop/phone-shop.action";

class GioHangRedux extends Component {
  render() {
    const { gioHang, onDeleteSp, onChangeQuantity } = this.props;
    return (
      <div>
        <h1>Giỏ hàng</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Giá</th>
              <th>Hình Ảnh</th>
              <th>Số lượng</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gioHang.map((sp) => {
              return (
                <tr key={sp.maSP}>
                  <td>{sp.maSP}</td>
                  <td>{sp.giaBan}</td>
                  <td>
                    <img
                      style={{
                        width: 100,
                      }}
                      src={sp.hinhAnh}
                      alt=".."
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.props.dispatch(
                          ThayDoiSoLuongSPCreator({
                            quantity: 1,
                            maSP: sp.maSP,
                          })
                        );
                      }}
                      className="btn btn-success"
                    >
                      +
                    </button>
                    <span
                      style={{
                        fontSize: 30,
                      }}
                    >
                      {sp.soLuong}
                    </span>
                    <button
                      onClick={() => {
                        this.props.dispatch(
                          ThayDoiSoLuongSPCreator({
                            quantity: -1,
                            maSP: sp.maSP,
                          })
                        );
                      }}
                      className="btn btn-success"
                    >
                      -
                    </button>
                  </td>
                  <td>{sp.soLuong * sp.giaBan}</td>
                  <td>
                    <button
                      onClick={() => {
                        //dispatch trực tiếp
                        // this.props.dispatch(xoaSanPhamCreator(sp.maSP));
                        this.props.dispatch(
                          ConfirmXoaSPCreator({
                            status: "",
                            content: "Bạn có chắc muốn xoá sản phẩm không ?",
                            title: "Xoá sản phẩm",
                            onOK: () => {
                              this.props.dispatch(xoaSanPhamCreator(sp.maSP));
                              this.props.dispatch(ResetModalCreator());
                            },
                            onCancle: () => {
                              this.props.dispatch(ResetModalCreator());
                            },
                          })
                        );
                      }}
                      className="btn btn-danger"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    gioHang: rootReducer.phoneShopReducer.gioHang,
  };
};

export default connect(mapStateToProps)(GioHangRedux);
