import React, { Component } from 'react';
import './App.css';
import { teamList } from './shirts';
import Product from './Product';
import ShoppingCart from './ShoppingCart';
import Header from './Header';
import ModalCart from './ModalCart';
import $ from 'jquery'


$(document).ready(function(){
  $('select#sort-recruiters').change(function() {
      var filter = $(this).val();
      filterList(filter);
  });
  $('select#sort-vendor').change(function() {
      var filters = $(this).val();
      filterLists(filters);
  });

  });
  
  function filterList(value) {
      var list = $(".recruiter .recruiter-info");
      $(list).hide();
      if (value == "All") {
          $(".recruiter").find("article").each(function (i) {
              $(this).show();
          });
      } else {
   
          $(".recruiter").find("article[data-custom-type*=" + value + "]").each(function (i) {
              $(this).show();
          });
      }
  }

  function filterLists(value) {
      var list = $(".recruiter .recruiter-info");
      $(list).hide();
      if (value == "All") {
          $(".recruiter").find("article").each(function (i) {
              $(this).show();
          });
      } else {
   
          $(".recruiter").find("article[data-custom-id*=" + value + "]").each(function (i) {
              $(this).show();
          });
      }
  }

class Home extends Component {
  constructor() {
    super();
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
      console.log(selectedTeam)
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
     
        <Header
          noItems={this.state.cart.length}
          total={this.state.cart.reduce((acc, item) => {
            return acc += item.quantity * item.price
          }, 0)}
          />

        <br />

        <ModalCart
          thecart={this.state.cart}
          onRemove={this.onRemove}
          checkOut={this.checkOut}
          total={this.state.cart.reduce((acc, item) => {
            return acc += item.quantity * item.price
          }, 0)}
          />

<div>
<div class="filter">
                                        <span  class={`${this.props.category}`}>Categories Filter</span>
                                            <select id="sort-recruiters" class={`${this.props.id}-${this.props.category} ${this.props.category}`}>
                                                <option value="All">All</option>
                                                <option value="Vegtables">Vegtables</option>
                                                <option value="Vegetables"> Vegetables</option> 
                                                <option value="Fruits">Fruits</option> 
                                            </select>   

                                        <span  class={`${this.props.category}`}>vendor Filter</span>
                                        <select id="sort-vendor" class={`${this.props.id}-${this.props.category} ${this.props.category}`}>
                                            <option value="All">All</option>
                                            <option value="Himachal-Pvt-Ltd">Himachal-Pvt-Ltd</option>
                                            <option value="Organic-farms">Organic-farms</option> 
                                            <option value="Mallikarjuna-farms">Mallikarjuna-farms</option> 
                                            <option value="Nagpur-farms">Nagpur-farms</option> 
                                        </select>   
                                        </div>
        <div className="container">
          <div className="row"> 
            {
              this.state.teamList.map((team, index) =>
                <Product
                  key={team.id}
                  teamPic={team.image}
                  teamName={team.name}
                  available={team.available}
                  teamPrice={team.price}
                  vendor={team.vendor}
                  category={team.category} 
                  id={team.id} 
                  teamQuantity={team.quantity}
                  increaseQuantity={text => this.increaseQuantity(text, index)}
                  decreaseQuantity={text => this.decreaseQuantity(text, index)}
                  addToCart={() => this.addToCart(team)}
                  />
              )
            }
          </div>
        </div>         
      </div> 
</div>
    );
  }
}

export default Home;
