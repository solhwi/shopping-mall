import React, {Component} from 'react';
import ProductDelete from './ProductDelete';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Product extends Component{
    render(){
      return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell> 
                <TableCell><img src ={this.props.image}/></TableCell> 
                <TableCell>{this.props.productName}</TableCell> 
                <TableCell>{this.props.price}</TableCell> 
                <TableCell>{this.props.context}</TableCell> 
                <TableCell>
                <ProductDelete 
                    stateRefresh={this.props.stateRefresh}
                    id={this.props.id}
                />
                </TableCell>
            </TableRow>
        );
    }
}
export default Product;