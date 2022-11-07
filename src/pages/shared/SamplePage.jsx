import React, { useEffect } from "react";
import { getAllAccount } from "../../service/shared/accountService";

const SamplePage = () => {
  useEffect(() => {
    getAllAccount().then((res) => {
      console.log(res);
    });
  });

  return <div>SamplePage</div>;
};

export default SamplePage;
