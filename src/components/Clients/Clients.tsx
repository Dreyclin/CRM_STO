import React from "react";
import ClientsHeader from "./ClientsHeader";
import ClientsContent from "./ClientsContent";
import ClientsFooter from "./ClientsFooter";

const Clients: React.FC = () => {
    return (
        <div className="w-100">
            <ClientsHeader />
            <ClientsContent />
            <ClientsFooter />
        </div>
    )
}

export default Clients;