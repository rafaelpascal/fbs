import SingleEventsContents from "~/components/dashboard/SingleEventsContents";
import EventFooter from "~/components/footer/EventFooter";
import Header from "~/components/students/Header";

const SingleEvent = () => {
  return (
    <div className="w-full">
      <Header />
      <SingleEventsContents />
      <EventFooter />
    </div>
  );
};

export default SingleEvent;
