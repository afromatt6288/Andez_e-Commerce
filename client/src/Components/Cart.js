import ItemItem from "./ItemItem";
import { Card } from "semantic-ui-react"

function Cart({currentUser, cart, onClearCart, onCheckOut}) {

    function handleCheckOut(){
        onCheckOut()
    }

    function handleClearCart(){
        onClearCart([])
    }

    return (
        <section id="cart-items" className="cart-items">
            <h2 className="header">{currentUser.username}'s Cart</h2>
            <div className="cart-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {cart.map((item)=> (
                        <ItemItem key={item.id} item={item} />
                        ))}
                </Card.Group>
            </div>
            <button className="cart-clear" type="submit" onClick={handleClearCart}>Clear Cart</button>
            <div className="cart-items2">
                <button className="cart-checkout"type="submit" onClick={handleCheckOut}>Check Out</button>
            </div>
        </section>
    );
}

export default Cart;