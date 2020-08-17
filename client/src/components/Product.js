import React, {Component} from 'react';
import ProductDelete from './ProductDelete';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Product extends Component{
    constructor(props){
        super(props);
    }

    render(){
      return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell> 
                <TableCell><a href="https://www.instagram.com/?hl=ko"><img src ={this.props.image}/></a></TableCell>
                <TableCell><a href="https://www.instagram.com/?hl=ko">{this.props.context}</a></TableCell> 
                <TableCell>{this.props.price}</TableCell> 
                <TableCell>{this.props.productName}</TableCell> 
                <TableCell>
                    <ProductDelete 
                    stateRefresh={this.props.stateRefresh}
                    id={this.props.id}
                    isLogin={this.props.isLogin}
                /></TableCell>
            </TableRow>
        );
    }
}
export default Product;