import React, {Component} from 'react';
import {post} from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
// post방식으로 서버로 데이터를 보낼 수 있도록 도와주는 library


const styles = theme => ({
    hidden: {
        display: 'none'
    }
})



class ProductMenu extends Component {

   constructor(props) {
        super(props);

        this.state = {
            id: '',
            password: '',
            open: false, // dialog가 열려있는 지의 여부
        }
    }

    handleClickOpen = () => {
        //바인딩 처리를 하는 함수의 형태???
        this.setState({
          id: '',
          password: '',
          open: true
        });
    }

    handleClickClose = () => {
        this.setState({
            id: '',
            password: '',
            open: false, // dialog가 열려있는 지의 여부
        })

    } 

    sendProperty = () => {
        const url = '/login';
        const formData = new FormData();
        formData.append('id', this.state.id)
        formData.append('password', this.state.password)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }   //데이터에 헤더를 달며 정보
        return post(url, formData, config);
    } //데이터 전송 코드


    handleFormSubmit = (e) => {
        e.preventDefault() //오류없게 전달되도록 부르는 함수 
        this.sendProperty()
            .then((response) => {
                window.location.reload();
                //props로 전달받은 stateRefresh 사용
            })
        
            this.setState({
                id: '',
                password: '',
            })
            
    }

    handleValueChange = (e) => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    render() {
        
        const {classes} = this.props;

        return (
            <div>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon 
                    onClick={this.handleClickOpen}>
                    </MenuIcon>
                </IconButton>
                
                {/* <Dialog > 비로그인 상태일 시 로그인이 필요합니다. 로그인 상태일 시 회원정보를 띄운다.*/}
                {/*  open={classes.isNotLogin}  */}
                    <Dialog open={this.state.open} onClose={this.handleClickClose}>
                        <DialogTitle>로그인이 필요합니다.</DialogTitle>
                        <DialogContent>
                            <TextField
                            label="ID" type="text" name="id" 
                            value={this.state.id}
                            onChange={this.handleValueChange}
                            ></TextField><br/>
                            <TextField
                            label="Password" type="password" name="password" 
                            value={this.state.password}
                            onChange={this.handleValueChange}
                            ></TextField><br/>

                        </DialogContent>

                        <DialogActions>
                            <Button 
                                variant="contained" color="primary"
                                onClick={this.handleFormSubmit}
                            >
                            로그인
                            </Button>
                            <Button 
                                variant="outlined" color="primary"
                                onClick={this.handleClickClose}
                            >
                            닫기
                            </Button>
                        </DialogActions>
                    </Dialog>
                {/* </Dialog> */}
            </div>
        )
    }
}

export default withStyles(styles)(ProductMenu);