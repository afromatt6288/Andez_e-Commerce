import ItemList from "../matt_components/ItemList";
import App from "../_app"

export default function Home({items, setItems}) {

    // if(!items){
    //     return <div>Loading</div>
    // }
    return <ItemList items = {items} setItems={setItems}>g</ItemList>
}