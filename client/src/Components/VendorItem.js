import React from "react";
import { Link } from "react-router-dom";

function VendorItem({ vendor }) {
    const { id, vendor_name, vendor_address, vendor_email} = vendor

    return (
        <section id="vendors">
            <div className="vendor-item">
                <Link to={`/vendors/${id}`}>
                    <p>{vendor_name} | #{id}</p>
                </Link>
                <p>{vendor_email}</p>
                <p>{vendor_address}</p>
            </div>
        </section>
    );
}

export default VendorItem;