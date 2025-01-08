import TransactionCard from "~/components/cards/TransactionCard";
import { DashboardArea } from "~/layouts/DashboardArea";

const TransactionsArray = [
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: true,
    datePaid: "Nov 5th 2024",
  },
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: false,
    datePaid: "Nov 5th 2024",
  },
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: true,
    datePaid: "Nov 5th 2024",
  },
  {
    title: "Diploma in Business Admi...",
    price: "105,000",
    installment: "3 Months",
    issueDate: "October 5th 2024",
    amount: "N55,000",
    paid: false,
    datePaid: "Nov 5th 2024",
  },
];

const Transactions = () => {
  return (
    <DashboardArea>
      <div>
        <h2 className="font-DMSans font-semibold text-[25px]">Transactions</h2>
        <div className="w-full lg:w-[50%] rounded-md border-[0.5px] p-4 border-[#ddd] overflow-y-auto min-h-[600px]">
          <h2 className="font-DMSans font-semibold py-6 capitalize text-[18px]">
            INVOICES
          </h2>
          {TransactionsArray.map((card, index) => (
            <TransactionCard key={index} cards={card} />
          ))}
        </div>
      </div>
    </DashboardArea>
  );
};

export default Transactions;
