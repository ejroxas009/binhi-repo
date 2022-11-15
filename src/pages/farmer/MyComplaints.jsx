import React, { useEffect, useState } from "react";

//components
import ComplaintsTable from "../../component/farmer/ComplaintsTable";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

//services
import * as complaintService from "../../service/admin/complaintService"

const MyComplaints = () => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);

  const [complaints, setComplaints] = useState();
  const [complaintsToggle, setComplaintsToggle] = useState(false);  

  const getAllComplaints = async () => {
    const res = await complaintService.viewComplaints();

    if(account){
      const complaintList = res.data.filter(
        (complaints) => complaints.account.accountId == account.accountId 
      );
      setComplaints(complaintList);
      setComplaintsToggle(!complaintsToggle);
    }
  }

  useEffect(() => {
    getAllComplaints();
  }, []);

  useEffect(() => {
    console.log(complaints);
  }, [complaintsToggle]);

  return (
    <>
      <Appbar />
      <FarmerSidebar />
      {complaints &&<ComplaintsTable complaints={complaints} />}
    </>
    );
};

export default MyComplaints;
