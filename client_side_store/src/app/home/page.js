import Home from "../components/Home.js"
export default function Page({params}) {
    console.log(params)
    return <Home user = {params.user}/>;
}
