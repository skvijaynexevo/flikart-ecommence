import React from 'react' 
import Header from './Header' 
import './Cart.css';
import { Link, useParams } from 'react-router-dom';
import { teamList } from './shirts';
import Product from './Product'; 
import ModalCart from './ModalCart';
 
    export default class Cart extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              teamList: teamList,
              cart: []
            }
            this.increaseQuantity = this.increaseQuantity.bind(this);
            this.decreaseQuantity = this.decreaseQuantity.bind(this);
            this.addToCart = this.addToCart.bind(this);
            this.onRemove = this.onRemove.bind(this);
            this.checkOut = this.checkOut.bind(this);
          }

          componentDidMount() {
            console.log(this.props.match.params.teamPic); 
        }
        
          increaseQuantity(quantity, indexToChange) {
            this.setState(
              {
                teamList: this.state.teamList.map((team, index) => {
                  if (index === indexToChange) {
                    return {
                      ...team,
                      quantity: team.quantity + 1
                    }
                  };
                  return team;
                })
              });
          }
        
          decreaseQuantity(quantity, indexToChange) {
            this.setState(
              {
                teamList: this.state.teamList.map((team, index) => {
                  console.log(indexToChange);
                  if (index === indexToChange) {
                    return {
                      ...team,
                      quantity: team.quantity - 1
                    }
                  };
                  return team;
                })
              });
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
                cart: cartItems
              })
            } else {
              cartItems.push(selectedTeam);
              this.setState({
                cart: cartItems
              })
            }
          }
        
          onRemove(indexToRemove) {
            let cart = this.state.cart;
            let index = cart.findIndex((x => x.id === indexToRemove));
            this.state.cart.splice(index, 1);
            this.setState({
              cart: this.state.cart
            })
          }
        
          checkProduct(productID) {
            let cart = this.state.cart;
            return cart.some(function (item) {
              return item.id === productID;
            });
          }
        
          checkOut() {
            this.setState({
              cart: [],
              teamList: teamList
            }
            )
          }
    
        render() { 
            
    return (   
        <div> 
              <Header />
              <div class = "card-wrapper Cart">
                    <div class = "card"> 
                        <div class = "product-imgs">
                        <div class = "img-display">
                            <div class = "img-showcase"> 
                            <img src={`http://demo-nexevo.in/vijay/abctestdfetest/flikart-ecommence/img/${this.props.match.params.teamPic}`}></img>
                            </div>
                        </div> 
                        </div> 
                        <div class = "product-content">
                            <h2 class = "product-title">{this.props.match.params.teamName}</h2>
                        <a href = "#" class = "product-link">{this.props.match.params.category}</a>
                        <div class = "product-rating">
                            <i class = "fas fa-star"></i>
                            <i class = "fas fa-star"></i>
                            <i class = "fas fa-star"></i>
                            <i class = "fas fa-star"></i>
                            <i class = "fas fa-star-half-alt"></i>
                            <span>4.7(21)</span>
                        </div>

                        <div class = "product-price"> 
                            <p class = "new-price">New Price: <span>${this.props.match.params.teamPrice}</span></p>
                        </div>

                        <div class = "product-detail">
                            <h2>about this item: </h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                       
                        </div>

                        <div class = "purchase-info"> 
                            <Link to='/' class = "btn">
                                Continue Shopping
                            </Link>
                        </div>
                    
                        </div>
                    </div>
                    </div>
                    <div>
               
      </div>
      </div> 
    )
}
}
