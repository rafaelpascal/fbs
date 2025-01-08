import { FaCheckCircle } from "react-icons/fa";

interface TransactionCard {
  title: string;
  price: string;
  installment: string;
  issueDate: string;
  amount: string;
  paid: boolean;
  datePaid: string;
}

interface TransactionCardProp {
  cards: TransactionCard;
}

const TransactionCard = ({ cards }: TransactionCardProp) => {
  return (
    <div className="py-4 flex flex-row justify-between items-center px-2 border-b-[0.5px] border-[#ddd]">
      <div className="flex justify-start items-center">
        {cards.paid ? (
          <FaCheckCircle className="text-[#47C839]" />
        ) : (
          <FaCheckCircle />
        )}
        <div className="border-l-2 ml-2 border-[#D7DBDE] px-2">
          <div className="flex justify-start items-center">
            <p className="text-[16px] font-DMSans font-semibold">
              {cards.title}
            </p>
            <span className="text-[16px] font-DMSans font-normal">
              {" "}
              ({cards.price})
            </span>
          </div>
          <p className="text-[16px] font-DMSans font-normal">
            {cards.installment} installment
          </p>
          <p className="text-[16px] font-DMSans font-normal">
            <span className="font-semibold">Issued:</span> {cards.issueDate}
          </p>
        </div>
      </div>
      <div>
        <p className="text-[16px] font-DMSans font-semibold text-right">
          {cards.amount}
        </p>
        {cards.paid ? (
          <p className="text-[16px] font-DMSans font-semibold text-right text-[#47C839]">
            Paid
          </p>
        ) : (
          <p className="text-[16px] capitalize font-DMSans font-semibold text-right text-[#FF1515]">
            Unpaid
          </p>
        )}
        {cards.paid ? (
          <p className="text-[16px] font-DMSans font-semibold text-right text-[#47C839]">
            Paid. {cards.datePaid}
          </p>
        ) : (
          <button className="text-[16px] font-DMSans font-semibold text-right text-[#6440FB]">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
