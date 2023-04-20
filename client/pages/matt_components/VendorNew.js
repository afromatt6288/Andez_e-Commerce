import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'


function VendorNew({handleVendorAdd}) {
    const [vendorName, setVendorName] = useState("")
    const [vendorEmail, setVendorEmail] = useState("");
    const [vendorAddress, setVendorAddress] = useState("");
    const [vendorAccountBalance, setAccountBalance] = useState("");
    
    const router = useRouter();
    
    function handleSubmit(e) {
        e.preventDefault()        
        const formData = {
                vendor_name: vendorName,
                vendor_email: vendorEmail,
                vendor_address: vendorAddress,
                vendor_account_balance: vendorAccountBalance,
                // items: {},
            }
        fetch("http://localhost:5555/vendors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                handleVendorAdd(data)
                router.push(`/vendors/${data.id}`)
            })
    }
    

    return (
        <section >
            <h3 className="header">Add New Vendor</h3>
            <form className="new-vendor-form" onSubmit={handleSubmit}>
                <input type="text" id="vendorName" placeholder="Vendor Name" value={vendorName} onChange={e => setVendorName(e.target.value)} />
                <input type="text" id="vendorEmail" placeholder="Vendor Email" value={vendorEmail} onChange={e => setVendorEmail(e.target.value)} />
                <input type="text" id="vendorAddress" placeholder="Vendor Address" value={vendorAddress} onChange={e => setVendorAddress(e.target.value)} />
                <input type="number" id="vendorAccountBalance" placeholder="Vendor Account Balance" value={vendorAccountBalance} onChange={e => setAccountBalance(e.target.value)} />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default VendorNew






