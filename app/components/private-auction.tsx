import { privateCompanies } from "app/sample-data";
import PrivateCompany from "./private-company";

const PrivateAuction = () => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {privateCompanies.map((company, index) => (
        <PrivateCompany key={index} privateCompany={company} />
      ))}
    </div>
  );
};

export default PrivateAuction;
