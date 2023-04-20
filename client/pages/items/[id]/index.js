import ItemItem from "@/pages/matt_components/ItemItem";
import { useRouter } from 'next/router'

export default function Home({items, setItems}) {
    const router = useRouter()
    const {id}  = router.query
    console.log(items)
    const filtered = items.filter((item)=>{
        if(item.id ==id){
        return true;
    }
        return false;
    })
    let item = items
    if (filtered.length === 1){
        item = filtered[0]
    }
    else{
        item = null
    }
    console.log(item)

    // if(!items){
    //     return <div>Loading</div>
    // }
    return <ItemItem item = {item}></ItemItem>
}