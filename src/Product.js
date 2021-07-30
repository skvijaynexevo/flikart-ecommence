import React, { Component } from 'react';
import { teamList } from './shirts';
import { Link } from 'react-router-dom'; 
 
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // teamList: teamList,
            // cart: [],
            // selectedTeam:[],
            buttonText: "ADD TO CART", 
        }
    this.addToCart = this.addToCart.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    }

    handleClick(event) { 
        this.setState({
            buttonText: "✔ ADDED"
        }, function () {
            setTimeout(() => {
                this.setState({
                    buttonText: "ADD TO CART"
                });
            }, 2000);
        })
        this.props.addToCart();
    }

    addToCart(selectedTeam) {
        let cartItems = this.state.cart;
        let productID = selectedTeam.id;
        let productQty = selectedTeam.quantity;
        if (this.checkProduct(productID)) {
          console.log('hi');
          let index = cartItems.findIndex((x => x.id === productID));
          cartItems[index].quantity = Number(cartItems[index].quantity) + Number(productQty);
          this.setState({
            cart: cartItems,
            selectedTeam: selectedTeam
          }) 
        } else {
          cartItems.push(selectedTeam);
          this.setState({
            cart: cartItems
          })
        }
      }

      handleChangeFilter(event) {
        this.setState({
          houseFilter: event.target.value
        });
      }
      
     
      getFilteredStudents() {
        const { students, houseFilter } = this.state;
        if (!houseFilter) {
          return students;
        }
        return students.filter(
          singleStudent => singleStudent.house === houseFilter
        );
     }


      clickMe(el) {
        this.setState({
          redirect: true
        })
      }
    

    render() {
    const students = this.getFilteredStudents();
        return (
            <div>     
            <div className="col-sm recruiter"> 
                <div className="card text-center">
                <article class="recruiter-info" data-custom-type={this.props.category} data-custom-id={this.props.vendor}>
                    <div className="card-body"> 
                        <Link to={{ pathname: `Cart/${this.props.teamName}/${this.props.teamPic}/${this.props.teamPrice}/${this.props.vendor}/${this.props.category}`, state: { data: this.state.selectedTeam }}}  onClick={this.clickMe.bind(this, teamList)}>
                        <div>
                        <img src={this.props.teamPic} className="shirt" alt={this.props.teamName} />
                        <h5 className="card-title">{this.props.teamName}</h5>
                        <h4 className="card-text price">Upto ${this.props.teamPrice}</h4>
                        </div>
                        </Link>
                        <div className="stepper-input">
                            <span className="decrement" onClick={this.props.decreaseQuantity}>-</span>
                            <input className="quantity" value={this.props.teamQuantity} />
                            <span className="increment" onClick={this.props.increaseQuantity}>+</span>
                        </div>
                        {this.props.available === 1 ?  
                        <span className="btn btn-primary add" onClick={this.handleClick}>{this.state.buttonText}</span>  : 
                        <span className="btn btn-danger add">out of stock</span>
                    }
                    </div>
                    </article>
                </div>  
            </div>  
            </div>
        );
    }
}

export default Product;

