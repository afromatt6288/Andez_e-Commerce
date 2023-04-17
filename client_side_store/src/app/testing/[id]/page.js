
export default function Page({params}) {
    console.log("hi", params.id)
    return <h1>Hello, Next.js! {params.id}</h1>;
}
