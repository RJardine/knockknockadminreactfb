import React from "react";

import Sidebar from "./Sidebar";
import Services from "../services/Services";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-10">
        <hr />
        <Services />
        <hr />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
}
