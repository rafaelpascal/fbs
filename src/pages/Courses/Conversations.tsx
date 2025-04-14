import { DashboardArea } from "~/layouts/DashboardArea";

const Conversations = () => {
  return (
    <DashboardArea>
      <div>
        <h2 className="font-DMSans mb-4 text-lg font-bold text-left">
          Tips on getting good answers quickly
        </h2>
        <div role="alert" className="alert alert-info alert-dash">
          <span>12 unread messages. Tap to see.</span>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Conversations;
