import ItemsDisplay from "./ItemsDisplay"
import Search from "./Search"

function StorePage({setSearchTerm, searchTerm}) {


return (
    <div>
        <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm}></Search>
        <ItemsDisplay setSearchTerm={setSearchTerm} searchTerm={searchTerm}></ItemsDisplay>
    </div>
)

}


export default StorePage
