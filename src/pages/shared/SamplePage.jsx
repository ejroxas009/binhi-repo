import React, { useState, useEffect } from "react";
import { getAllAccount } from "../../service/shared/accountService";

const SamplePage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllAccount().then((res) => console.log(res.data));
  }, []);

  // useEffect(() => {
  //   let tempList;
  //   const getAllAccountFunction = async () => {
  //     const res = await getAllAccount();
  //     setList(res.data);
  //     tempList = list.filter((account) => {
  //       if (account.accoundId == 3) {
  //         return account;
  //       }
  //     });
  //   };
  //   console.log(tempList);
  // }, []);

  return <div>SamplePage</div>;
};

export default SamplePage;
