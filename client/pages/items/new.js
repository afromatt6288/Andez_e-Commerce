                    {/* <ItemNew onFilmAdd={handleFilmAdd}/> */}
import ItemList from "../matt_components/ItemList";
import App from "../_app"
import ItemNew from "../matt_components/ItemNew";

export default function Home({items, setItems, handleFilmAdd }) {

    // if(!items){
    //     return <div>Loading</div>
    // }
    return <ItemNew onItemAdd={handleFilmAdd}></ItemNew>
}