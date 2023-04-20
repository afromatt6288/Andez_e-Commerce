import React from "react";
import Link from 'next/link';

function VendorItem({ vendor }) {
    const { id, vendor_name, vendor_address, vendor_email} = vendor
    return (
        <div className="vendor-item">
            <Link href={`/vendors/${id}`}>
                <p>{vendor_name}</p>
            </Link>
            <p>{vendor_email}</p>
            <p>{vendor_address}</p>
        </div>
    );
}

export default VendorItem;