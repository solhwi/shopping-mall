import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class ProductDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClickOpen = () => {
    //바인딩 처리를 하는 함수의 형태???
    this.setState({
      open: true,
    });
  };

  handleClickClose = () => {
    this.setState({
      open: false, // dialog가 열려있는 지의 여부
    });
  };

  deleteProduct(id) {
    const url = "/api/main/" + id;
    fetch(url, {
      method: "DELETE",
    });
    this.props.stateRefresh();
  }

  render() {
    return (
      <div>
      
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            상품 삭제
        </Button>
        
        <Dialog open={this.state.open && this.props.isLogin}>
          <DialogTitle onClick={this.handleClickClose}>! Warning</DialogTitle>
          <DialogContent>
            <Typography>상품 및 관련 정보가 모두 삭제됩니다.</Typography>
            <br />
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  this.deleteProduct(this.props.id);
                }}
              >삭제</Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClickClose}
              >닫기</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default ProductDelete;
