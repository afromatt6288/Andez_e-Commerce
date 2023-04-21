import React from "react";

function Home({currentUser}) {
    if (currentUser) {
        return (
            <section id="home">
                <h1 className="header" >
                    Welcome, {currentUser.username}, to Andez E-Commerce</h1>

                <div className="home-list">
                    <h3>
                        Preston Hunter and Matthew Clark had a dream.  What dream you might ask?  Well, our dream was to be largest importer and seller of nuts in the world.
                        <br/>
                        From that dream, Andez E-Commerce was born!
                        <br/>
                        Since it's creation in 2023, we have grown by leaps and bounds.  And today, not only do we sell the most nuts, but we have also expanded to sell all sorts of items from vendors around the world.
                        <br/>
                        However, without you, or dear customers, we have nothing. 
                        <br/> 
                        So, thank you for your support, and your care.  We are lucky to have you. 
                        <br/> 
                        Something to know is that our site opperates on it's own special coins, called nuts. 
                        <br/> 
                        New users are automatically granted 5 nuts as our way of saying welcome and thank you. 
                        <br/> 
                        You can always increase your nut balance in your User profile.
                        <br/> 
                        But you can never go below 1 nut
                        <br/>
                        In any case, thank you again for being here, and welcome!
                    </h3>
                </div>
            </section>
        );
    } else {
        return <h1>Please Login or Sign Up</h1>;
    }
}

export default Home;